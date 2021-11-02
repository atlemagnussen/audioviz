import {LitElement, html, css} from "lit"
import {customElement} from "lit/decorators.js"

import "@material/mwc-icon"
import "@material/mwc-button"
import "@material/mwc-select"
import "@material/mwc-list"
import "@material/mwc-list/mwc-list-item"

import "@app/styles/vars.css"
import "@app/styles/theme.css"

import "@app/views/streamVisualizerCanvas"
import "@app/views/deviceSelector"

import "@app/components/deviceInfo"
import "@app/components/appInfo"
import "@app/components/featuresInfo"
import "@app/components/butterPresetSelector"

import { currentStream } from "@app/stores/streamStore"

@customElement('main-app')
export class MainAppComponent extends LitElement {
    
    private stream: MediaStream | null = null
    static styles = css`
        :host {
		    padding: 0;
		    margin: 0 auto;
		    display: grid;
		    grid-template-rows: auto 1fr auto;
		    box-sizing: border-box;
            height: 100%;
            width: 100%;
		    min-height: 100%;
	    }
	    header {
		    background: var(--av-main-background);
		    display: flex;
		    flex-direction: row;
		    justify-content: space-between;
		    align-items: center;
		    width: 100%;
	    }
        main {
            background: var(--av-main-background);
            padding: 0.2rem;
        }
	    footer {
		    display: flex;
		    justify-content: center;
		    z-index: 500;
	    }
        stream-viz-poc {
            height: 100%;
        }
        a {
            color: var(--av-main-foreground);
        }
    `

    constructor() {
        super()
        currentStream.subscribe(str => {
            this.stream = str
            this.requestUpdate()
        })
    }
    
    render() {
        return html`
            ${
                this.stream ? html`<header></header>` :
                html`
                    <header>
                        <features-info></features-info>
                        <a href="/">
                            <h1>Audio Viz</h1>
                        </a>
                        <app-info></app-info>
                    </header>
                `
            }
            
            <main>
                ${
                    this.stream ?
                    html`<stream-viz-canvas></stream-viz-canvas>` :
                    html`<device-selector></device-selector>`
                }
                
            </main>
            <footer>
            </footer>
        `;
    }
}
