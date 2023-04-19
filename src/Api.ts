import axios, { AxiosResponse, AxiosError } from 'axios'

type AutocompleteResponse = {
    suggestions: []
    total: number
}

class ApiService {
    clientKey: string
    userApiKey: string

    constructor() {

    }
    
    setUserApiKey(apiKey: string) {
        this.userApiKey = apiKey
    }

    setClientKey(apiKey: string) {
        this.clientKey = apiKey
    }
    
    async autocomplete(term: string): Promise<AutocompleteResponse> {
        const url = `https://prod-api-rd360.360medics.com/v3/autocomplete/all?q=${term}&lang=fr&country=FR&medics_area=ansm`
        
        const body: any = {
            id: 5,
            title: 'DOCTOR',
            profession_id: 2,
            specialty_id: 26,
            roles: ['ROLE_EXPERT'],
            workspaces: [],
        }

        const headers = {
            'Authorization': `Token ${this.clientKey}`,
            'x-user-api-key': this.userApiKey,
        }

        return new Promise((resolve, reject) => {
            axios.post(url, body, { headers })
                .then((response: AxiosResponse) => {
                    resolve(response.data as AutocompleteResponse)
                }).catch ((e: AxiosError) => {
                    reject(e)
                })
        })
    }

    async tryAuth() {
        const username = 'romain'
        const password = 'secretstuff'
        const credentials = { username, password }
        
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:4003/auth', credentials)
                .then((response: any) => {
                    resolve(response.data)
                }).catch((e: any) => {
                    reject(e)
                })
        })
    }

    async auth(username: string, password: string) {
        const headers = {
            'Authorization': `Token ${this.clientKey}`
        }

        return new Promise((resolve, reject) => {
            axios.post('https://360medics.com/rest/login', { username, password }, { headers })
                .then((response: any) => {
                    this.setUserApiKey(response.data.api_key)
                    resolve(response.data)
                }).catch((e: any) => {
                    reject(e)
                })
        })
    }
}

export const Api = new ApiService()