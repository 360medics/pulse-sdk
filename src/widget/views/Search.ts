import {Api} from '../../Api'

/**
 * Template location: ./Search.html
 * $template "#search-page" must correpond in html template (<template id="search-page">)
 * @returns void
 */
export function SearchView() {
    return {
        $template: '#search-page',
        term: '',
        results: [] as any[],
        dropdownvisible: false,
        mounted() {
            document.body.addEventListener('click', (e: PointerEvent) => {
                this.dropdownvisible = false
            }, { once: true })
        },
        async submit() {
            window.open(this.otpRedirectUrl(this.term))
        },
        async search() {
            try {
                const response = await Api.autocomplete(this.term) as any
                
                this.results = (response.suggestions) ? response.suggestions : []
                this.dropdownvisible = true
            } catch (e) {
                console.log(e)
                this.error = e.toString()
            }
        },
        otpRedirectClick() {
            Api.setOtpState('used')
        },
        otpRedirectUrl(term: string) {
            const otpState = Api.getOtpState()
            const otpToken = Api.getOtpToken()

            let url: string

            if (otpState === 'used') {
                url = `${process.env.PULSE_FRONT_URL}/results?query=${term}#all`
            } else {
                url = `${process.env.PULSE_FRONT_URL}/otp/login?otpToken=${otpToken}&redirect=${encodeURIComponent('https://app.pulselife.dev.360medics.tech/results?query='+term+'#all')}`
            }

            return url
        }
    }
}