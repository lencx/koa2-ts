
import * as fse from 'fs-extra'
import * as moment from 'moment'
import { Context } from 'koa'

import { resolve } from './../utils'

const logFile = (ctx: Context) => {
    const dirname: string = resolve('log', `${moment().format('YYYY/MM')}`)
    fse.ensureDir(dirname)
        .then(() => {
            const uri = decodeURIComponent(ctx.url)
            const data = `📌 ${moment().format('YYYY-MM-DD HH:mm:ss')} ${ctx.method}-${uri} [${ctx.status}]
[INFO] userAgent:'${ctx.header['user-agent']}' | remoteAddress: ${ctx.request.ip}\n`

            const filename = `${moment().format('DD-ddd')}.log`
            fse.pathExists(resolve(dirname, filename))
                .then(exist => {
                    exist
                        ? fse.appendFile(resolve(dirname, filename), data)
                            .catch(err => console.error(err))
                        : fse.writeFile(resolve(dirname, filename), data)
                            .catch(err => console.error(err))
                })
        })
        .catch(err => console.log(err))
}

export default async function outuptLogger(ctx: Context, next: () => Promise<any>) {
    try { await next() } catch (e) { console.error(e) }
    logFile(ctx)
}
