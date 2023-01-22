import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import { captureScreen } from "@app/services/capture"
import { setCurrentStream } from "@app/stores/streamStore"
import config from "@app/config"

@customElement('display-media-selector')
export class DisplayMediaSelector extends LitElement {

    private _errorMsg: string | null = null

    static styles = css`
        :host {
            background: var(--av-secondary-background);
            border-radius: 4px;
		    display: flex;
            flex-direction: column;
            gap: 0.3rem;
	    }
	    
        .errormsg {
            border-radius: 3px;
            color: var(--mdc-theme-error);
            padding: 0.5rem;
        }
        mwc-button {
            --mdc-theme-primary: var(--av-pink);
        }
    `
    
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
    
    render() {
        
        if (config.features.getDisplayMedia) {
            return html`
                <mwc-button raised icon="desktop_windows" label="Capture screen or tab" @click=${this.captureScreen}></mwc-button>
                <small>only select option where audio sharing is possible</small>
            `
        }

        return html`
            <span class="no-support"></span>
        `
    }
}
