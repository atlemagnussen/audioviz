import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"



@customElement('stream-viz-poc')
export class StreamVizPoc extends LitElement {
    
    capturing = false
    static styles = css`
        :host {
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
            background: yellow;
        }
        canvas {
            background-color: grey;
        }
        
    `;
    
    resizeCanvas() {
        const parent = canvas.parentNode
        const styles = getComputedStyle(parent)
        const w = parseInt(styles.getPropertyValue("width"), 10)
        const h = parseInt(styles.getPropertyValue("height"), 10)
        canvas.width = w
        canvas.height = h
    }

    connectedCallback() {

    }

    capture() {
        this.capturing = !this.capturing
    }

    render() {
        return html`
            <div class="controls">
                <button @click=${this.capture} ?disabled="${this.capturing}">Capture</button>
            </div>
            <div class="canvas-wrapper">
                <canvas id="canvas" width="100" height="100">
                    browser support?
                </canvas>
            </div>
        `;
    }
}
