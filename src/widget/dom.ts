import {createApp, reactive} from 'petite-vue'
import {Api} from '../Api'
import {LoginView} from './views/Login'
import {SearchView} from './views/Search'
import LoginTemplate from './views/Login.html'
import SearchTemplate from './views/Search.html'
import '../sass/main.scss'

/**
 * This is the main render function
 * It inserts the petite-vue app into the dom and imports all the views (see widget/views folder)
 */
export const dom = (selector: string) => {
    document.addEventListener('DOMContentLoaded', function() {
        // make sur the selector div exists
        const container =  document.getElementById(selector)

        if (!container) {
            console.error(`Selector "${container}" is not a valid element or was not found in the DOM.`)
            return
        }

        container.innerHTML = `<div class="pulse-sdk">
                <div v-scope="LoginView()" :class="{ hidden: store.page !== 'login' }">${LoginTemplate}</div>
                <div v-scope="SearchView()" :class="{ hidden: store.page !== 'search' }">${SearchTemplate}</div>
            </div>`

        const store = reactive({
            page: Api.isAuthenticated() ? 'search' : 'login',
            nav(page: string) {
                this.page = page
            }
        })

        const app = createApp({
            store,
            LoginView, SearchView,
        }).mount(container)
    })
}

