import * as path from 'path'

const resolve = (...dir: string[]) => path.resolve(__dirname, '../..', ...dir)

const routeObj = (path: string, method?: string, action?: Function) => {
    let o = {}
    o = Object.assign({path}, o)
    method !== undefined ? o = Object.assign({method}, o) : ''
    action !== undefined ? o = Object.assign({action}, o) : ''
    return o
}

export {
    routeObj,
    resolve
}