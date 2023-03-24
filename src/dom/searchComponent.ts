import {Api} from '../Api'

export function createSearchComponent(): HTMLElement {
    const node = document.createElement('div')
    node.setAttribute('class', 'pulse-sdk-search-component')
    node.innerHTML = `<div>
        <div><input id="pulse-sdk-search-input" type="text" name="search" placeholder="Rechercher..."></div>
        <div>
            <ul id="pulse-sdk-autocomplete-dropdown" class="pulse-sdk-autocomplete-dropdown"></ul>
        </div>
    </div>`

    return node
}

export function initSearchComponent() {
    const input: HTMLInputElement = document.getElementById('pulse-sdk-search-input') as HTMLInputElement
    
    input.addEventListener('keyup', async (e) => {
        const dropdown: HTMLElement = document.getElementById('pulse-sdk-autocomplete-dropdown') as HTMLElement
        dropdown.innerHTML = ''
        
        try {
            const results = await Api.autocomplete(input.value as string)

            for (let i in results.suggestions) {
                const text = results.suggestions[i]
                dropdown.innerHTML += `<li><a href="" onclick="Pulse.dom.doStuff(event)">${text}</a></li>`
            }
        } catch (e) {
            console.log('ERROR', e)
        }
    })
}