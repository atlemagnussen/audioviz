import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import "@app/components/streamVisualizerPoc"
import "@app/components/deviceSelector"
import "@app/components/deviceInfo"

import { selectedDevice } from "@app/stores/deviceStore"

@customElement('main-app')
export class MainAppComponent extends LitElement {
    private device: MediaDeviceInfo | null = null
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

    constructor() {
        super()
        selectedDevice.subscribe(dev => {
            this.device = dev
            this.requestUpdate()
        })
    }
    
    render() {
        return html`
            <header>
                <h1>Audio Viz</h1>
            </header>
            <main>
                ${
                    this.device ? 
                    html`<stream-viz-poc></stream-viz-poc>` : 
                    html`<device-selector></device-selector>`
                }
                
            </main>
            <footer>
                fot
            </footer>
        `;
    }
}
