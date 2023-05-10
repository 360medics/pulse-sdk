import axios, { AxiosResponse, AxiosError } from 'axios'

type AutocompleteResponse = {
    suggestions: []
    total: number
}

class ApiService {
    clientKey: string
    userApiKey: string
    otpToken: string
    otpState: string
    userPayload: any = {}

    constructor() {
        this.clientKey = localStorage.getItem('_client_key') as string
        this.userApiKey = localStorage.getItem('_api_key') as string
        this.otpToken = localStorage.getItem('_otp_token') as string
        this.otpState = localStorage.getItem('_otp_state') as string
        this.userPayload = localStorage.getItem('_usr_data') !== null ? JSON.parse(localStorage.getItem('_usr_data')) : {} as string
    }

    isAuthenticated(): boolean {
        return this.userApiKey && this.userApiKey !== ''
    }
    
    setUserApiKey(apiKey: string): void {
        this.userApiKey = apiKey
        localStorage.setItem('_api_key', apiKey)
    }

    setOtpToken(otpToken: string): void {
        this.otpToken = otpToken
        localStorage.setItem('_otp_token', otpToken)
    }

    setOtpState(otpState: string): void {
        this.otpState = otpState
        localStorage.setItem('_otp_state', otpState)
    }

    getOtpState(): string {
        return this.otpState
    }

    getOtpToken(): string {
        //localStorage.getItem('_otp_token')
        return this.otpToken
    }

    setClientKey(clientKey: string): void {
        this.clientKey = clientKey
        localStorage.setItem('_client_key', clientKey)
    }

    setUserPayload(payload: any) {
        this.userPayload = payload
        localStorage.setItem('_usr_data', JSON.stringify(payload))
    }
    
    async autocomplete(term: string): Promise<AutocompleteResponse> {
        const url = `${process.env.PULSE_SEARCH_API_URL}/v3/autocompletevb/all?q=${term}&lang=fr&country=FR&medics_area=ansm`
        
        const headers = {
            'Authorization': `Token ${this.clientKey}`,
            'x-user-api-key': this.userApiKey,
        }

        return new Promise((resolve, reject) => {
            axios.post(url, this.userPayload, { headers })
                .then((response: AxiosResponse) => {
                    resolve(response.data as AutocompleteResponse)
                }).catch ((e: AxiosError) => {
                    reject(e)
                })
        })
    }

    async auth(username: string, password: string) {
        const headers = {
            'Authorization': `Token ${this.clientKey}`
        }

        return new Promise((resolve, reject) => {
            axios.post(`${process.env.PULSE_REST_API_URL}/rest/login`, { username, password }, { headers })
                .then((response: any) => {
                    this.setUserApiKey(response.data.api_key)
                    this.setOtpToken(response.data.otp_token)
                    this.setOtpState('new')
                    this.setUserPayload({
                        id: response.data.id,
                        title: response.data.title,
                        profession_id: response.data.profession?.id || null,
                        specialty_id: (response.data?.specialty) ? response.data.specialty?.id : null,
                        roles: response.data.roles,
                        workspaces: [],
                    })
                    resolve(response.data)
                }).catch((e: any) => {
                    reject(e)
                })
        })
    }
}

export const Api = new ApiService()