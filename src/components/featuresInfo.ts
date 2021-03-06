import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import config from "@app/config"

@customElement('features-info')
export class FeaturesInfo extends LitElement {
    
    static styles = css`
        :host {
		    display: inline-flex;
            flex-direction: column;
            gap: 0.2rem;
	    }
        div {
            color: var(--av-secondary-foreground);
        }
	    .small {
            font-size: x-small;
        }
    `

    render() {
        
        return html`<span></span>
            <!-- <div class="small">
                platform: ${config.platform}
            </div>
            <div class="small">
                userMedia: ${config.features.getUserMedia}
            </div>
            <div class="small">
                displayMedia: ${config.features.getDisplayMedia}
            </div> -->
        `
    
    }
}
