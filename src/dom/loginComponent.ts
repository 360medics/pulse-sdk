export function createLoginComponent(): HTMLElement {
    const node = document.createElement('div')
    node.setAttribute('class', 'login-component')

    node.innerHTML = `<form action="">
        <div class="control"><input type="text" name="username" placeholder="Email..."></div>
        <div class="control"><input type="password" name="username" placeholder="Mot de passe..."></div>
        <div class="control"><button type="submit">Login</button></div>
    </form>`

    return node
}