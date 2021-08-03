import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
//import {query} from "lit/decorators/query.js"
import { captureAudio } from "./captureAudio"

@customElement('stream-viz-poc')
export class StreamVizPoc extends LitElement {
    
    _capturing = false
    
    // @query("#canvas-viz")
    _canvas: HTMLCanvasElement | null

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
    }
    disconnectedCallback() {
        window.removeEventListener("resize", () => this.resizeCanvas())
        super.disconnectedCallback()
    }
    capture() {
        this._capturing = !this._capturing
        captureAudio(this._canvas as HTMLCanvasElement)
        this.requestUpdate()
    }

    render() {
        return html`
            <div class="controls">
                <button @click=${this.capture} ?disabled="${this._capturing}">Capture</button>
            </div>
            <div class="canvas-wrapper">
                <canvas id="canvas-viz" width="100" height="100">
                    browser support?
                </canvas>
            </div>
        `
    }
}
