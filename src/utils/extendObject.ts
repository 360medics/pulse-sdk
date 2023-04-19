export function extendObject(a: any, b: any) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key]
        }
    }
    
    return a
}