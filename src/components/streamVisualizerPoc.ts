import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
//import {query} from "lit/decorators/query.js"
import { visualize } from "@app/services/visualizerPoc"
import { captureStreamFromDevice } from "@app/services/capture"
import { selectedDevice } from "@app/stores/deviceStore"
import { Subscription } from "rxjs"

@customElement('stream-viz-poc')
export class StreamVizPoc extends LitElement {
    sub: Subscription | null = null
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
            color: white
        }
        .controls {
            flex-basis: 2rem;
            flex-grow: 0;
            flex-shrink: 0;
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
        return true
    }
    
    updated() {
        this.resizeCanvas()
    }

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener("resize", () => this.resizeCanvas())
        this.sub = selectedDevice.subscribe(device => {
            this.device = device
            this.requestUpdate()
        })
    }
    disconnectedCallback() {
        window.removeEventListener("resize", () => this.resizeCanvas())
        super.disconnectedCallback()
        this.sub?.unsubscribe()
    }
    async capture() {
        this._errorMsg = ""
        try {
            const stream = await captureStreamFromDevice(this.device!)
            await visualize(stream, this._canvas as HTMLCanvasElement)
            this._capturing = !this._capturing
        } catch(error) {
            // @ts-ignore
            this._errorMsg = error.message
        }
        
        this.requestUpdate()
    }

    render() {
        return html`
            ${
                this.device ? 
                html`
                    <div class="controls">
                        <device-info .info=${this.device}></device-info>
                        <button @click=${this.capture} ?disabled="${this._capturing}">Capture</button>
                        <span class="errormsg">${this._errorMsg}</span>
                    </div>
                ` : 
                html`<p>Source not selected?</p>`
            }
            
            <div class="canvas-wrapper">
                <canvas id="canvas-viz" width="100" height="100">
                    browser support?
                </canvas>
            </div>
        `
    }
}
