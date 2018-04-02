import * as path from 'path'

const resolve = (...dir: string[]) => path.resolve(__dirname, '../..', ...dir)

const routeObj = (url: string, method?: string, action?: any) => {
    let o = {}
    o = Object.assign({path: url}, o)
    method !== undefined ? o = Object.assign({method}, o) : void 0
    action !== undefined ? o = Object.assign({action}, o) : void 0
    return o
}

export {
    routeObj,
    resolve,
}
