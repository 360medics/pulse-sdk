import * as m from 'mithril'
import {Api} from '../../Api'
// binding tip: https://vegibit.com/mithril-javascript-tutorial/

const Model: { username: string, password: string, authenticated: boolean } = {
    username: '',
    password: '',
    authenticated: false,
}

export const Login = {
    view: function (controller: m.Vnode) {
        return m('.login-form', 
            // 
            // m('div', this.data.test ),
            // m(m.route.Link, { 'href': '/login' }, 'login')
            m('form', 
                m('input', { type: 'text', name: 'username', placeholder: 'Email...' }),
                m('input', { type: 'password', name: 'password', placeholder: 'Mot de passe...' }),
                m('button', { type: 'submit', onclick: this.authenticate.bind(this) }, 'Se connecter'),
            ),
        )
    },
    authenticate: async function (e: any) {
        e.preventDefault()

        try {
            const result = await Api.tryAuth()
            Model.authenticated = true
            m.redraw()
        } catch (e) {
            console.log(e)
        }
    }
} 