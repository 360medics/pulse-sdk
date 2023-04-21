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
    }
}