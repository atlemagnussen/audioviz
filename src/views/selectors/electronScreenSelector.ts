import {LitElement, html, css} from "lit"
import {customElement, state} from "lit/decorators.js"
import config from "@app/config"

import { getSourcesElectron, captureSoureElectron } from "@app/services/captureElectron"
import { DesktopCapturerSource } from "electron"

@customElement('electron-screen-selector')
export class ElectronScreenSelector extends LitElement {

    @state()
    private sources: DesktopCapturerSource[]

    @state()
    private _errorMsg = ""

    private selectedSource: DesktopCapturerSource | undefined

    static styles = css`
        :host {
            background: var(--av-secondary-background);
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
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

    constructor() {
        super()
        this.sources = getSourcesElectron()
    }

    getSources() {
        this.sources = getSourcesElectron()
        console.log("sources", this.sources)
    }
    setSelectedDev(source: DesktopCapturerSource) {
        this.selectedSource = source
    }
    async captureSource() {
        if (!this.selectedSource)
            this._errorMsg = "select source first!"
        
        try {
            const stream = await captureSoureElectron(this.selectedSource!)
            console.log("stream", stream)
        }
        catch (err: any) {
            console.error(err)
            this._errorMsg = err.message
        }
    }

    render() {
            
        if (config.isElectron) {
            return html`
                <p>Hello Electron sources</p>
                <p>
                    <mwc-button @click=${this.getSources}>Get sources</mwc-button>
                </p>
                
                <mwc-select @selected=${(e:any) => this.setSelectedDev(e)}>
                ${this.sources.map(d => {
                    return html`
                        <mwc-list-item graphic="icon"
                            value=${d.id}
                            .selected=${d.id == this.selectedSource?.id}>
                                <span>${d.name}</span>
                                <mwc-icon slot="graphic">mic</mwc-icon>
                            
                        </mwc-list-item>
                    `
                })}
            </mwc-select>
            <mwc-button raised icon="mic" label="Capture audio input device" @click=${this.captureSource}></mwc-button>

            <div class="errormsg">${this._errorMsg}</div>
            `
        }

        return html`
            <span class="no-support"></span>
        `
    }
}