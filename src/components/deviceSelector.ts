import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import { captureDevice, captureScreen } from "@app/services/capture"
import { audioDevices, setSelectedDevice, selectedDevice } from "@app/stores/deviceStore"
import { setCurrentStream } from "@app/stores/streamStore"
import { Subscription } from "rxjs"
import config from "@app/config"
@customElement('device-selector')
export class MainAppComponent extends LitElement {
    private subs: Subscription[] = []
    private devices: MediaDeviceInfo[] = []
    private selectedDevice: MediaDeviceInfo | null = null
    private _errorMsg: string | null = null

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
            padding: 0.5rem;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
        }
        .errormsg {
            border-radius: 3px;
            color: var(--mdc-theme-error);
            padding: 0.5rem;
        }
        mwc-button {
            --mdc-theme-primary: var(--av-pink);
        }
        mwc-select {
            width: 19rem;
            --mdc-list-side-padding: 5px;
            --mdc-list-item-graphic-margin: 5px;
            /* --mdc-ripple-color: transparent; */
        }
    `
    

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
            const stream = await captureDevice(this.selectedDevice)
            setCurrentStream(stream)
        }
        catch (error) {
            this.errorHandler(error)
        }
    }
    async captureScreen() {
        try {
            const stream = await captureScreen()
            setCurrentStream(stream)
        }
        catch (error) {
            this.errorHandler(error)
        }
    }
    errorHandler(error:any) {
        console.log(error)
        // @ts-ignore
        if (error.message) this._errorMsg = error.message
        // @ts-ignore
        if (error.name) this._errorMsg = `${this._errorMsg} ${error.name}`
        this.requestUpdate()
    }
    setSelectedDev(e: any) {
        const index = e.detail.index
        const dev = this.devices[index]
        setSelectedDevice(dev)
    }
    render() {
        if (config.noCaptureSupport) {
            return html`
                <div>
                    <header>
                        <h3>Capturing audio not supported</h3>
                    </header>
                </div>
                <div class="controls">
                    <p>No capture supported on this browser/device</p>
                </div>
            `
        }
        return html`
            <div>
                <header>
                    <h3>Select source</h3>
                </header>
                
                <div class="controls">
                    
                    <mwc-select @selected=${(e:any) => this.setSelectedDev(e)}>
                        ${this.devices.map(d => {
                            return html`
                                <mwc-list-item graphic="icon"
                                    value=${d.deviceId}
                                    .selected=${d.deviceId == this.selectedDevice?.deviceId}>
                                        <span>${d.label}</span>
                                        <mwc-icon slot="graphic">mic</mwc-icon>
                                    
                                </mwc-list-item>
                            `
                        })}
                    </mwc-select>
                    <mwc-button raised icon="mic" label="Capture audio input device" @click=${this.captureDevice}></mwc-button>
                </div>

                ${config.features.getDisplayMedia ? html`
                        <div class="controls">
                            <mwc-button raised icon="desktop_windows" label="Capture screen or tab" @click=${this.captureScreen}></mwc-button>
                        </div>
                    ` : html `<span class="no-support"></span>`}
                
                <div class="errormsg">${this._errorMsg}</div>
            </div>
            
        `
    }
}
