import {Api} from '../../Api'

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
                this.results = (await Api.autocomplete(this.term)).suggestions
                this.dropdownvisible = true
            } catch (e) {
                console.log(e)
                this.error = e.toString()
            }
        },
        hide() {

        }
    }
}

export const SearchViewtemplate = `
    <template id="search-page">
        <form @click="$event.stopPropagation()" id="pulse-sdk-search-form" class="search-form" @vue:mounted="mounted"  @vue:unmounted="unmounted">
            <div class="search-input">
                <input v-model="term" type="text" placeholder="Search..." @keyup="search">
            </div>
            <ul class="autocomplete" v-if="dropdownvisible">
                <li v-for="item in results">
                    <a target="_blank" :href="'https://app.pulselife.dev.360medics.tech/results?query='+item.label+'#all'">{{item.label}}</a>
                </li>
            </ul>
        </form>
    </template>`