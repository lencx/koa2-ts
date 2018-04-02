import { Context } from 'koa'
import * as moment from 'moment'
import * as fs from 'fs'

import { config } from './../config/config'
import { resolve } from './util'
import { mkdirs } from './mkdirs'

interface ILogData {
    data: any
    url: string
    host: string
    query: string
    method: string
    userAgent: string
    remoteAddress: string
    statusCode: number
    errorMessage: string
    errorStack: string
    responseTime: number
}

const outputLog = (log: Partial<ILogData>, thrownError: any) => {
    if (config.prettyLog) {
        console.log(`${log.statusCode} ${log.method} ${log.url} - ${log.responseTime}ms`)
        if (thrownError) {
            console.error(thrownError)
        }
    } else if (log.statusCode < 400) {
        process.stdout.write(JSON.stringify(log) + '\n')
    } else {
        process.stderr.write(JSON.stringify(log) + '\n')
    }
}

const writeLog = (ctx: Context) => {
    // console.log(moment().format('YYYY-MM-DD'))
    const dirname: string = `${moment().format('YYYY/MM')}`
    const filename = `${moment().format('DD-ddd')}.log`
    mkdirs.sync(resolve('log', dirname))
    logFile(ctx, dirname, filename)
}

function logFile(ctx: Context, ...filename: string[]) {
    fs.exists(resolve('log', ...filename), exist => {
        // console.log(exist ? 'exist' : 'does not exist')
        const data = `📌 ${moment().format('YYYY-MM-DD HH:mm:ss')} ${ctx.method}-${ctx.url} [${ctx.status}]
[INFO] userAgent:'${ctx.header['user-agent']}' | remoteAddress: ${ctx.request.ip}\n`
        if (exist) {
            fs.appendFile(resolve('log', ...filename), data, err => err
                ? console.log(err) : console.log('append successful!'))
        } else {
            fs.writeFile(resolve('log', ...filename), data, err => err
                ? console.log(err) : console.log('write successful!'))
        }
    })
}

export async function logger(ctx: Context, next: () => Promise<any>) {
    const start = new Date().getMilliseconds()

    const logData: Partial<ILogData> = {
        url: ctx.url,
        host: ctx.header['host'],
        query: ctx.query,
        method: ctx.method,
        remoteAddress: ctx.request.ip,
        userAgent: ctx.header['user-agent'],
    }
    let errorThrown: any = null

    try {
        await next()
        logData.statusCode = ctx.status
    } catch (e) {
        errorThrown = e
        logData.errorMessage = e.message
        logData.errorStack = e.stack
        logData.statusCode = e.status || 500
        if (e.data) {
            logData.data = e.data
        }
    }

    logData.responseTime = new Date().getMilliseconds() - start

    outputLog(logData, errorThrown)
    writeLog(ctx)
    if (errorThrown) {
        throw errorThrown
    }
}
