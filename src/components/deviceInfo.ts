import {LitElement, html, css} from "lit"
import {customElement, property} from "lit/decorators.js"


@customElement('device-info')
export class MainAppComponent extends LitElement {
    
    static styles = css`
        :host {
		    display: flex;
            flex-direction: row;
            gap: 1rem;
	    }
	    .small {
            font-size: x-small;
        }
    `
    
    @property({attribute: false})
    info: MediaDeviceInfo = {
        kind: "audiooutput",
        groupId: "",
        deviceId: "",
        label: "",
        toJSON: () => {}
    }

    render() {
        return html`
            <div>
                ${this.info.kind}
            </div>
            <div>
                ${this.info.label}
            </div>
            <!-- <div class="small">
                ${this.info.deviceId}
            </div>
            <div class="small">
                ${this.info.groupId}
            </div> -->
        `;
    }
}
