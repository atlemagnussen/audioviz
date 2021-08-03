import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import "./streamVisualizerPoc"


@customElement('main-app')
export class MainAppComponent extends LitElement {
    
    static styles = css`
        :host {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        header {
            flex-basis: 6rem;
            flex-grow: 0;
            flex-shrink: 0;
        }
        stream-viz-poc {
            flex-basis: auto;
            flex-grow: 1;
            flex-shrink: 1;
        }
    `;
    
    render() {
        return html`
            <header>
                <h1>Audio Viz</h1>
            </header>
            <stream-viz-poc></stream-viz-poc>
        `;
    }
}