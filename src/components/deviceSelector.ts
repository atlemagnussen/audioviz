import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import { captureStreamFromDevice, captureScreen } from "@app/services/capture"
import { audioDevices, setSelectedDevice, selectedDevice } from "@app/stores/deviceStore"
import { setCurrentStream } from "@app/stores/streamStore"
import { Subscription } from "rxjs"

@customElement('device-selector')
export class MainAppComponent extends LitElement {
    private subs: Subscription[] = []
    private devices: MediaDeviceInfo[] = []
    private selectedDevice: MediaDeviceInfo | null = null
    private _errorMsg: string | null = null

    static styles = css`
        :host {
		    display: flex;
            gap: 0.3rem;
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
        .controls {
            margin-top: 1rem;
            background: lightblue;
        }
        .errormsg {
            color: red;
        }
    `
    //protected createRenderRoot() {
    //    return this
    //}

    connectedCallback() {
        super.connectedCallback()
        this.subs.push(audioDevices.subscribe(devices => {
            this.devices = devices
            this.requestUpdate()
        }))
        this.subs.push(selectedDevice.subscribe(sel => {
            this.selectedDevice = sel
            this.requestUpdate()
        }))
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        this.subs.map(s => s.unsubscribe())
    }

    async captureDevice() {
        if (!this.selectedDevice)
            return
        this._errorMsg = ""
        try {
            const stream = await captureStreamFromDevice(this.selectedDevice)
            setCurrentStream(stream)
        }
        catch (error) {
            console.error(error)
            // @ts-ignore
            if (error.message) this._errorMsg = error.message
            // @ts-ignore
            if (error.name) this._errorMsg = error.name
        }
    }
    async captureScreen() {
        try {
            const stream = await captureScreen()
            setCurrentStream(stream)
        }
        catch (error) {
            console.error(error)
            // @ts-ignore
            this._errorMsg = error.message || error.name
        }
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
                <div class="controls">
                    ${
                        this.selectedDevice ? 
                        html`
                            
                            <device-info .info=${this.selectedDevice}></device-info>
                            <button @click=${this.captureDevice}>Capture device</button>
                            <span class="errormsg">${this._errorMsg}</span>
                        
                        ` : 
                        html`<p>Source not selected?</p>`
                        
                    }
                    <div class="controls">
                        <button @click=${this.captureScreen}>Capture screen</button>
                    </div>
                </div>
            </div>
            
        `;
    }
}
