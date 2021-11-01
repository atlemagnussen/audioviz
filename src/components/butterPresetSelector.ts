import { presets, butterPreset, setButterPreset } from "@app/stores/settingsStore"

import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"
import { observe } from "@app/directives/ObservableDirective"

@customElement('butter-preset-selector')
export class ButterPresetSelector extends LitElement {
    
    static styles = css`
        :host {
		    display: inline-block
	    }
	    .small {
            font-size: x-small;
        }
    `

    setSelectedPreset(e: CustomEvent) {
        const index: number = e.detail.index
        const presetsArray = Object.keys(presets)
        const preset = presetsArray[index]
        setButterPreset(preset)
    }
    render() {
        
        return html`
            ${observe(butterPreset, (pr: string) => this.reallyRender(pr))}
        `
    }
    reallyRender(currentPreset: string) {
        const listItems = []
        for (const name in presets) {
            const templ = html`
                <mwc-list-item 
                    value=${name}
                    .selected=${name == currentPreset}>
                        <span>${name}</span>
                    
                </mwc-list-item>
            `
            listItems.push(templ)
        }
        return html`
            <mwc-select @selected=${(e:any) => this.setSelectedPreset(e)}>
                ${listItems}
            </mwc-select>
        `
    }
}
