import * as path from 'path'
import chalk from 'chalk'

const resolve = (...dir: string[]) => path.resolve(__dirname, '../..', ...dir)

const cg = (str: string) => chalk.green(str)
const cy = (str: string) => chalk.yellow(str)

export {
    cg,
    cy,
    resolve,
}

export function sleep(ms: number) {
    return new Promise((res, rej) => setTimeout(res, ms))
}
