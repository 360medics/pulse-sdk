import * as m from 'mithril'
import {Api} from '../../Api'
import {Login} from './Login'
import {Search} from './Search'
// binding tip: https://vegibit.com/mithril-javascript-tutorial/

const Model = {
    state: 'login'
}

export const Home = {
    // controller: function (vnode: m.Vnode) {
    //     this.data.test = 'Hello world'
    // },
    view: function (controller: m.Vnode) {
        return m('.app', [
            Model.state === 'login' ? m(Login) : null,
            Model.state === 'ok' ? m(Search) : null,
        ])
    },
} 