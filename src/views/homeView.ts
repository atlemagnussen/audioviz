import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"

import config from "@app/config"

@customElement('home-view')
export class HomeView extends LitElement {
    

    static styles = css`
        :host {
            background: var(--av-secondary-background);
            border-radius: 4px;
		    display: flex;
            flex-direction: column;
            gap: 0.3rem;
	    }
	    header {
		    color: var(--av-secondary-foreground);
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
		    width: 100%;
	    }
        
        .controls {
            margin-top: 1rem;
            padding: 0.5rem;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
            color: var(--av-secondary-foreground);
        }
        a {
            color: var(--av-secondary-foreground);
            text-decoration: none;
        }
        
    `
    render() {
        // if (config.noCaptureSupport) {
        //     return html`
        //         <div>
        //             <header>
        //                 <h3>Capturing audio not supported</h3>
        //             </header>
        //         </div>
        //         <div class="controls">
        //             <p>No capture supported on this browser/device</p>
        //         </div>
        //     `
        // }
        return html`
            <div>
                
                <device-selector></device-selector>
                
                <div class="controls links">
                    <a href="https://github.com/atlemagnussen/audioviz">
                        <img src="https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg" width="20" height="20" class="d-block" loading="lazy" decoding="async" alt="GitHub mark">
                        <span>source code</span>
                    </a>
                </div>
            </div>
            
        `
    }
}
