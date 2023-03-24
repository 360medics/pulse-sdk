export function ready (fn: Function) {
    if (document.readyState != 'loading') {
        fn()
    } else if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', () => fn())
    } else {
        console.log('Unsupported ts')
        // window.attachEvent('onreadystatechange', function() {
        //     if (document.readyState != 'loading')
        //         fn();
        //     });
    }
}