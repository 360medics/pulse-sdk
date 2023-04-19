export function SearchView() {
    return {
        $template: '#search-page',
        count: 0,
        inc() {
            this.count++
        }
    }
}

export const SearchViewtemplate = `
    <template id="search-page">
        <form>
            <input type="text" placeholder="Search...">
        </form>
    </template>`