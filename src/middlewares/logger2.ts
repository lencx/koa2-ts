import * as fs from 'fs'
import * as moment from 'moment'
import { Context } from 'koa'

import { mkdirs } from './../utils/mkdirs'
import { resolve } from './../utils'

function logFile(ctx: Context, ...filename: string[]) {
    fs.exists(resolve('log', ...filename), exist => {
        // console.log(exist ? 'exist' : 'does not exist')
        const uri = decodeURIComponent(ctx.url)
        const data = `📌 ${moment().format('YYYY-MM-DD HH:mm:ss')} ${ctx.method}-${uri} [${ctx.status}]
[INFO] userAgent:'${ctx.header['user-agent']}' | remoteAddress: ${ctx.request.ip}\n`
        if (exist) {
            fs.appendFile(resolve('log', ...filename), data, err => err
                ? console.log(err) : void 0)
        } else {
            fs.writeFile(resolve('log', ...filename), data, err => err
                ? console.log(err) : void 0)
        }
    })
}

const writeLog = (ctx: Context) => {
    // console.log(moment().format('YYYY-MM-DD'))
    const dirname: string = `${moment().format('YYYY/MM')}`
    const filename = `${moment().format('DD-ddd')}.log`
    mkdirs.sync(resolve('log', dirname))
    logFile(ctx, dirname, filename)
}

export default async function outuptLogger2(ctx: Context, next: () => Promise<any>) {
    try {
        await next()
    } catch (e) {
        console.error(e)
    }
    writeLog(ctx)
}
