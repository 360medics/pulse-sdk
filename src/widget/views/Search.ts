import {Api} from '../../Api'
import logo from '../../images/logo'

export function SearchView() {
    return {
        $template: '#search-page',
        term: '',
        results: [] as any[],
        dropdownvisible: false,
        mounted() {
            document.body.addEventListener('click', (e: PointerEvent) => {
                this.dropdownvisible = false
            })
        },
        unmounted() {
            // document.body.removeEventListener('click', outsiteClick)
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

export const SearchViewtemplate = `
    <template id="search-page">
        <form @click="$event.stopPropagation()" id="pulse-sdk-search-form" class="search-form" @vue:mounted="mounted"  @vue:unmounted="unmounted">
            <div class="search-input">
                <img class="pulse-sdk-logo" src="${logo}" alt="such a pup!" width="100%">
                <input v-model="term" type="text" placeholder="Search..." @keyup="search">
            </div>
            <ul class="autocomplete" v-if="dropdownvisible">
                <li v-if="results.length === 0"><a @click.prevent="()=>{}" href="">Aucun résultat à suggérer</a></li>
                <li v-for="item in results">
                    <a target="_blank" :href="'https://app.pulselife.dev.360medics.tech/results?query='+item.label+'#all'">{{item.label}}</a>
                </li>
            </ul>
        </form>
    </template>`