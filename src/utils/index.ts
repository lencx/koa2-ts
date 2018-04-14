import * as path from 'path'

const resolve = (...dir: string[]) => path.resolve(__dirname, '../..', ...dir)

const clr = (color: number, str: string) => `\x1b[${color}m${str}\x1b[0m`

export function sleep(ms: number) {
    return new Promise((res, rej) => setTimeout(res, ms))
}

export {
    clr,
    resolve,
}
