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
        canvas {
            flex: 1;
            background: grey;
        }
        
    `;
    

    capture() {
        this.capturing = !this.capturing
    }

    render() {
        return html`
            <div class="controls">
                <button @click=${this.capture} ?disabled="${this.capturing}">Capture</button>
            </div>
            <canvas id="audioOutput">
                audio output here maybe
            </canvas>
        `;
    }
}