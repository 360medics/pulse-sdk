import { createApp, reactive } from 'petite-vue'
import { Home } from './components/Home'
import { Login } from './components/Login'
// docs: https://mithril.js.org/index.html
// tip: https://arthurclemens.github.io/mithril-template-converter/index.html

export const render = (selector: string) => {
            // // window.onload = () => {
            //     const container =  document.getElementById(selector)
            //     if (!container) {
            //         console.log(`Selector "${container}" is not a valid element or was not found in the DOM.`)
            //         return
            //     }

            //     console.log(container)
            //     const iframe = document.getElementById('iframe') as HTMLIFrameElement
            //     container.appendChild(iframe)

            //     iframe.onload((e: any) => {
            //         iframe.setAttribute('src', 'https://wikipedia.fr')
            //     })
                
                
            // }
    // console.log(`Widget rendering in #${selector}`)
    // const app = createApp({
    //     $template: "<div>Hi</div>",
    // })
    const container =  document.getElementById(selector)
    if (!container) {
        console.log(`Selector "${container}" is not a valid element or was not found in the DOM.`)
        return
    }

    container.innerHTML = `{{store.page}}
        <div v-scope="Page1()">
            <template id="page-1">
                <div>Counter {{ count }} <button @click="inc()">Inc</button></div>
            </template>
        </div>
        <template id="page-2">
            <div>Other page</div>
        </template>
    `

    const store = reactive({
        page: 'login',
        nav(pageId: string) {
            this.page = pageId
        }
    })

    function Page1() {
        return {
            $template: '#page-1',
            count: 0,
            mounted() {
                console.log('Test')
            },
            inc() {
                this.count++
            }
        }
    }

    const app = createApp({
        store,
        Page1,
        mounted() {
            console.log('Mouted')
        }
    }).mount(container)
    
    // m.route(root, '/', {
    //     '/': Home,
    //     '/login': Login,
    // })

    // m.mount(root, {

    //     view: (vnode: m.Vnode) => {
    //         return m('div', { 'class': 'searchbar' }, 
    //             m('input', { 'type': 'text', 'name': 's', 'placeholder': 'Search...' })
    //         )
    //     }
    // })
}

