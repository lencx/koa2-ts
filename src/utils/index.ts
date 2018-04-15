import * as path from 'path'

const resolve = (...dir: string[]) => path.resolve(__dirname, '../..', ...dir)

export function sleep(ms: number) {
    return new Promise((res, rej) => setTimeout(res, ms))
}

export {
    resolve,
}
