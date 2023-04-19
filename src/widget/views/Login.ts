import {Api} from '../../Api'

export function LoginView() {
    return {
        $template: '#login-page',
        error: '',
        username: 'romain@360medics.com',
        password: 'frenchfrog',
        inc() {
            this.count++
        },
        async auth() {
            try {
                await Api.auth(this.username, this.password)
                this.store.nav('search')
            } catch (e) {
                this.error = e.toString()
            }
        }
    }
}

export const LoginViewtemplate = `
    <template id="login-page">
        <form @submit.prevent="auth">
            <div class="control"><input v-model="username" type="text" placeholder="Email..."></div>
            <div class="control"><input v-model="password" type="password" placeholder="Password..."></div>
            <div class="control"><button type="submit">Login</button></div>
        </form>
        <div v-if="error" class="error">{{error}}</div>
    </template>`