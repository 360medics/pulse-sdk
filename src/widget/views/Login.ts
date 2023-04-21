import {Api} from '../../Api'

/**
 * Template location: ./Login.html
 * $template "#login-page" must correpond in html template (<template id="login-page">)
 * @returns void
 */
export function LoginView() {
    return {
        $template: '#login-page',
        error: '',
        username: '',
        password: '',
        modalVisible: false,
        loading: false,
        mounted() {
            const modal = document.getElementById('pulse-sdk-login-popup')
            
            document.addEventListener('click', (event: any) => {
                if (modal && !modal.contains(event.target)) {
                    this.modalVisible = false
                }
            }, { once: true })
        },
        async auth() {
            this.loading = true

            try {
                await Api.auth(this.username, this.password)
                this.loading = false
                this.store.nav('search')
            } catch (e) {
                this.error = 'Identifiant invalides'
                this.loading = false
            }
        },
        openModal() {
            this.modalVisible = true
        },
        closeModal() {
            this.modalVisible = false
        },
    }
}