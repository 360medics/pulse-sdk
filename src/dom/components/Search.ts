import * as m from 'mithril'
import {Api} from '../../Api'
import {debounce} from '../../utils/debounce'

const Model: { items: string[] } = {
    items: ['test'],
}

export const Search = {
    view: function (controller: m.Vnode) {
        return m('.search',
            m('input', { type: 'text', onkeyup: this.search }),
            m('ul.dropdown', 
                Model.items.map( (item: string) => m('li.item', item) )
            )
        )
    },
    search: async function (e: any) {
        // @todo Remove API keys 
        // @todo Add a debounce function
        Api.setClientKey('4SJxKlCP9ucc6pzVXVv9zurURQ96Um7d')
        Api.setUserApiKey('1ade9001222a075902bc1ea12e0dc643')
        const results = await Api.autocomplete(e.target.value)
        Model.items = [...results.suggestions]
    }
    // search: debounce((e: any) => {
    //     const term = e.target.value
    //     console.log(term)
    //     const results = await Api.autocomplete(term)
    // })
} 