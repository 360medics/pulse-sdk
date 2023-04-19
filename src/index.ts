import {dom} from './widget/dom'
import {extendObject} from './utils/extendObject'

const supportedApi = ['init']

type GlobalSDKObject = {
    q: string[][]
}

type DefaultConfiguration = {
    apiKey?: string
    [x: string]: string
}

// function init(selector: string, options: { clientKey: string }): void {
function bootstrap(window: Window): void|any {
    let configuration: DefaultConfiguration = {
        apiKey: null
    }

    // get configuration options
    let globalObject: GlobalSDKObject|any = window[window['Pulse']] as unknown as GlobalSDKObject
    const queue: string[][] = globalObject.q

    // read (loop through) arguments passed to the queue in index.html with pusle('arg1', 'arg2', ...)
    if (queue) {
        for (let i in queue) {
            if (queue[i][0].toLowerCase() === 'init') {
                // note: converts all arguments values to strings
                configuration = extendObject(configuration, { apiKey: `${queue[i][1]}` })
            } else {
                apiHandler(queue[i][0], queue[i][1])
            }
        }
    }

    globalObject = apiHandler
    globalObject.configuration = configuration
    console.log('Configuration:', globalObject.configuration)
}

function apiHandler(method: any, param: string) {
    switch (method) {
        // add API implementation here
        case 'render':
            dom(param)
            break
        default:
            console.warn(`No handler defined for ${method}`)
    }
}

bootstrap(window)