import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import config from "@app/config"

@customElement('app-info')
export class MainAppComponent extends LitElement {
    
    static styles = css`
        :host {
		    display: inline-flex;
            flex-direction: column;
            gap: 0.2rem;
	    }
	    .small {
            font-size: x-small;
        }
    `

    render() {
        if (config.isElectron)
            return html`
                <div class="small">
                    Electron: ${config.versions.electron}
                </div>
                <div class="small">
                    Node: ${config.versions.node}
                </div>
                <div class="small">
                    Chrome: ${config.versions.chrome}
                </div>
            `
        else
            return html`
                <div>Web</div>
            `
    }
}
