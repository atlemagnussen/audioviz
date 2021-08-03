import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import "./streamVisualizerPoc"


@customElement('main-app')
export class MainAppComponent extends LitElement {
    
    static styles = css`
        :host {
		    padding: 0;
		    margin: 0 auto;
		    display: grid;
		    grid-template-rows: auto 1fr auto;
		    box-sizing: border-box;
            height: 100%;
            width: 100%;
		    min-height: 100%;
	    }
	    header {
		    background: var(--mdc-theme-background);
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
		    width: 100%;
	    }
        main {
            background: green;
        }
	    footer {
		    display: flex;
		    justify-content: center;
		    z-index: 500;
	    }
        stream-viz-poc {
            height: 100%;
        }
    `
    //protected createRenderRoot() {
    //    return this
    //}

    
    render() {
        return html`
            <header>
                <h1>Audio Viz</h1>
            </header>
            <main>
                <stream-viz-poc></stream-viz-poc>
            </main>
            <footer>
                fot
            </footer>
        `;
    }
}
