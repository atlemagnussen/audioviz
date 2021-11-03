import {LitElement, html, css} from "lit"
import {customElement, property} from "lit/decorators.js"
//import {query} from "lit/decorators/query.js"
// import { visualize, stopViz } from "@app/services/visualizerPoc"
import { visualize, stopViz, canvasResized } from "@app/services/visualizerButterchurn"
import { getAudioTrackLabel } from "@app/services/visualizerCommon" 
import { currentStream, setCurrentStream } from "@app/stores/streamStore"
import { Subscription } from "rxjs"

@customElement('stream-viz-canvas')
export class StreamVizCanvas extends LitElement {
    sub: Subscription | null = null
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
        window.innerWidth
        const canvas = this._canvas as HTMLCanvasElement
        // const parent = canvas.parentNode
        // const styles = getComputedStyle(parent as Element)
        // const w = parseInt(styles.getPropertyValue("width"), 10)
        // const h = parseInt(styles.getPropertyValue("height"), 10)
        const w = window.innerWidth
        const h = window.innerHeight
        console.log(`Resize event width=${w}, height=${h}`)
        canvas.width = w-6
        canvas.height = h-10
        canvasResized()
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
        this.sub = currentStream.subscribe(str => {
            this.stream = str
        })
    }
    disconnectedCallback() {
        window.removeEventListener("resize", () => this.resizeCanvas())
        super.disconnectedCallback()
        this.sub?.unsubscribe()
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
    showControls() {
        const controls = this.shadowRoot?.querySelector(".controls")
        controls?.classList.add("show")
        setTimeout(() => {
            controls?.classList.remove("show")
        }, 5000)
    }
    render() {
        return html`
            <div class="controls">
                <mwc-button raised icon="cancel" title="stop visualization" label="Stop" @click=${this.stop}></mwc-button>
                <mwc-button raised icon="fullscreen" title="toggle fullscreen" @click=${this.toggleFullscreen}></mwc-button>
                <small>${this.label}</small>
                <butter-preset-selector></butter-preset-selector>
            </div>
            <div class="canvas-wrapper" @click=${() => this.showControls()}>
                <canvas id="canvas-viz" width="100" height="100">
                    browser support?
                </canvas>
            </div>
        `
    }
    
}
