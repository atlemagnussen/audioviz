import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"

@customElement('device-selector')
export class DeviceSelector extends LitElement {
    
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
        
        .controls {
            margin-top: 1rem;
            padding: 0.5rem;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
		    justify-content: space-between;
		    align-items: center;
            color: var(--av-secondary-foreground);
            gap: 2rem;
        }
        
        a {
            color: var(--av-secondary-foreground);
            text-decoration: none;
        }
        .errormsg {
            border-radius: 3px;
            color: var(--mdc-theme-error);
            padding: 0.5rem;
        }
        
    `

    errorHandler(error:any) {
        console.log(error)
        // @ts-ignore
        if (error.message) this._errorMsg = error.message
        // @ts-ignore
        if (error.name) this._errorMsg = `${this._errorMsg} ${error.name}`
        this.requestUpdate()
    }
    
    render() {
        
        return html`
            <div>
                <header>
                    <h3>Select source</h3>
                </header>
                
                <div class="controls">
                    
                    <audio-input-selector></audio-input-selector>
                    <display-media-selector></display-media-selector>
                    <!-- <electron-screen-selector></electron-screen-selector> -->
                </div>

                
                <div class="errormsg">${this._errorMsg}</div>
                
            </div>
            
        `
    }
}
