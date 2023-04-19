export function LoginView() {
    return {
        $template: '#login-page',
        count: 0,
        mounted() {
            console.log('Test')
        },
        inc() {
            this.count++
        }
    }
}

export const LoginViewtemplate = `
    <template id="login-page">
        <div>Counter {{ count }} <button @click="inc()">Inc</button></div>
    </template>`