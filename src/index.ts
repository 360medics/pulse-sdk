import {Api as api} from './Api'
import {ready} from './dom/ready'
import {createLoginComponent} from './dom/loginComponent'
import {createSearchComponent, initSearchComponent} from './dom/searchComponent'
import './sass/common.scss'

function init(selector: string, options: { clientKey: string }): void {
    ready(() => {
        // create base elements
        const element = document.getElementById(selector)
        element.setAttribute('class', 'pulse-sdk')

        const loginComponent = createLoginComponent()
        const searchComponent = createSearchComponent()
        
        element.appendChild(searchComponent)

        // init all js bindings
        initSearchComponent()
    })
}

const dom = {
    doStuff: (e: MouseEvent) => {
        if (e) { e.preventDefault() }
        console.log('doStuff', e)
    }
}

export { api, init, dom }