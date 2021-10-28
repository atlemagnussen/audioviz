import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"

import { audioDevices, setSelectedDevice } from "@app/stores/deviceStore"
import { Subscription } from "rxjs"

@customElement('device-selector')
export class MainAppComponent extends LitElement {
    private sub: Subscription | null = null
    private devices: MediaDeviceInfo[] = []
    static styles = css`
        :host {
		    display: flex;
	    }
	    header {
		    background: var(--mdc-theme-background);
		    display: flex;
		    flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
		    width: 100%;
	    }
        .list {
            display: flex;
            flex-direction: column;
        }
        device-info {
            cursor: pointer;
        }
        device-info:hover {
            background: lightblue;
        }
    `
    //protected createRenderRoot() {
    //    return this
    //}

    connectedCallback() {
        super.connectedCallback()
        this.sub = audioDevices.subscribe(devices => {
            this.devices = devices
            this.requestUpdate()
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        this.sub?.unsubscribe()
    }

    render() {
        return html`
            <div>
                <header>
                    <h3>Select source</h3>
                </header>
                <div class="list">
                    ${this.devices.map(d => {
                        return html`
                            <device-info .info=${d} @click=${() => setSelectedDevice(d)}></device-info>
                        `
                    })}
                </div>
            </div>
            
        `;
    }
}
