import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import {classMap} from "lit/directives/class-map.js"

import { visualize, stopViz, canvasResized } from "@app/services/visualizerButterchurn"
import { getAudioTrackLabel } from "@app/services/visualizerCommon" 
import { currentStream, setCurrentStream } from "@app/stores/streamStore"
import { debounceTime, fromEvent, merge, Observable, Subscription } from "rxjs"

@customElement('stream-viz-canvas')
export class StreamVizCanvas extends LitElement {

    events = ["click", "mousemove", "wheel", "scroll", "touchmove", "keydown"]
    eventObs: Observable<Event>[] = []

    combo: Observable<Event> | null = null
    result: Observable<Event> | null = null

    subs: Subscription[] = []
    
    @state()
    showControls = false
    
    stream: MediaStream | null = null
    device: MediaDeviceInfo | null = null
    _capturing = false
    _errorMsg = ""

    // @query("#canvas-viz")
    _canvas: HTMLCanvasElement | null = null

    static styles = css`
        :host {
            height: 100%;
            display: flex;
            flex-direction: column;
            background: black;
            color: white;
            box-sizing: border-box;
        }
        .controls {
            position: absolute;
            z-index: -10;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
		    justify-content: center;
		    align-items: center;
            animation: fadeout 2s; 
            animation-fill-mode: forwards; 
            /* animation-delay: 0; */
        }
        .controls.show {
            animation: fadein 1s;
            animation-fill-mode: forwards;
            animation-delay: 0;
        }
        .canvas-wrapper {
            margin: 0;
            padding: 0;
            flex: 1 1 auto;
            box-sizing: border-box;
        }
        canvas {
            display:block;
            height: 100%;
            width: 100%;
            background-color: grey;
        }
        .errormsg {
            color: red;
        }
        @keyframes fadeout {
            from {
                z-index: 1;
                opacity: 1;
            }
            to {
                z-index: -1;
                opacity: 0;
            }
        }
        @keyframes fadein {
            from {
                z-index: -1;
                opacity: 0;
            }
            to {
                z-index: 1;
                opacity: 1;
            }
        }
    `
    
    @property({attribute: true})
    label: string = ""
    
    resizeCanvas() {
        this._canvas = this.renderRoot.querySelector("#canvas-viz")
        if (!this._canvas) {
            console.log("no canvas")
            return false
        }
        
        const canvas = this._canvas as HTMLCanvasElement
        const w = window.innerWidth
        const h = window.innerHeight
        console.log(`Resize event width=${w}, height=${h}`)
        canvas.width = w
        canvas.height = h
        canvasResized(w, h)
        return true
    }
    
    updated() {
        this.resizeCanvas()
        this.startViz()
    }
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }
    connectedCallback() {
        super.connectedCallback()
        window.addEventListener("resize", () => this.resizeCanvas())
        const sub = currentStream.subscribe(str => this.stream = str )
        this.subs.push(sub)

        this.eventObs = this.events.map(e => {
            const obs = fromEvent(this, e)
            return obs
        })

        // movement events to show controls
        this.combo = merge(...this.eventObs)
        const subCombo = this.combo.subscribe(x => {
            this.showControls = true
            console.log("start of debouce", x)
        })
        this.subs.push(subCombo)

        this.result = this.combo.pipe(debounceTime(1000))
        const subRes = this.result.subscribe(x => {
            this.showControls = false
            console.log("end of debouce", x)
        })
        this.subs.push(subRes)
    }
    disconnectedCallback() {
        window.removeEventListener("resize", () => this.resizeCanvas())
        super.disconnectedCallback()
        this.subs.map(s => s.unsubscribe())
    }
    async startViz() {
        if (!this.stream)
            return
        if (this._capturing)
            return
        this._errorMsg = ""
        try {
            this._capturing = true
            await visualize(this.stream!, this._canvas as HTMLCanvasElement)
            this.label = getAudioTrackLabel(this.stream!)
        } catch(error) {
            console.error(error)
            // @ts-ignore
            this._errorMsg = error.message
        }
    }
    stop() {
        stopViz()
        setCurrentStream(null)
    }
    
    render() {
        const classControls = {
            controls: true,
            show: this.showControls
        }

        return html`
            <div class=${classMap(classControls)}>
                <mwc-button raised icon="cancel" title="stop visualization" label="Stop" @click=${this.stop}></mwc-button>
                <mwc-button raised icon="fullscreen" title="toggle fullscreen" @click=${this.toggleFullscreen}></mwc-button>
                <small>${this.label}</small>
                <butter-preset-selector></butter-preset-selector>
            </div>
            <div class="canvas-wrapper">
                <canvas id="canvas-viz">
                    browser support?
                </canvas>
            </div>
        `
    }
    
}
