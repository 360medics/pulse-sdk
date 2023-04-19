import { createApp, reactive } from 'petite-vue'
import { LoginView, LoginViewtemplate } from './views/Login'
import { SearchView, SearchViewtemplate } from './views/Search'
import '../sass/common.scss'

/**
 * This is the main render function
 * It inserts the petite-vue app into the dom and imports all the views (see widget/views folder)
 */
export const dom = (selector: string) => {
    // make sur the selector div does exist
    const container =  document.getElementById(selector)
    if (!container) {
        console.log(`Selector "${container}" is not a valid element or was not found in the DOM.`)
        return
    }

    container.innerHTML = `<div class="pulse-sdk">
            <nav>
                <a @click.prevent="store.nav('login')" href="">login</a>
                <a @click.prevent="store.nav('search')" href="">search</a>
            </nav>
            <div v-scope="LoginView()" :class="{ hidden: store.page !== 'login' }">${LoginViewtemplate}</div>
            <div v-scope="SearchView()" :class="{ hidden: store.page !== 'search' }">${SearchViewtemplate}</div>
        </div>`

    const store = reactive({
        page: 'login',
        nav(pageId: string) {
            this.page = pageId
        }
    })

    const app = createApp({
        store,
        LoginView, SearchView,
    }).mount(container)
}

