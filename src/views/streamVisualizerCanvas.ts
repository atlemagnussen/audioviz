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
        
        .canvas-wrapper {
            margin: 0;
            padding: 0;
            flex: 1 1 auto;
            background: yellow;
        }
        canvas {
            background-color: grey;
        }
        .errormsg {
            color: red;
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
        const parent = canvas.parentNode
        const styles = getComputedStyle(parent as Element)
        const w = parseInt(styles.getPropertyValue("width"), 10)
        const h = parseInt(styles.getPropertyValue("height"), 10)
        canvas.width = w
        canvas.height = h
        canvasResized()
        return true
    }
    
    updated() {
        this.resizeCanvas()
        this.startViz()
    }
    // firstUpdated() {
        
    // }
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
    render() {
        return html`
            <div class="controls">
                <mwc-button raised icon="cancel" label="Stop" @click=${this.stop}></mwc-button>
                <small>${this.label}</small>
                <butter-preset-selector></butter-preset-selector>
            </div>
            <div class="canvas-wrapper">
                <canvas id="canvas-viz" width="100" height="100">
                    browser support?
                </canvas>
            </div>
        `
    }
    
}
