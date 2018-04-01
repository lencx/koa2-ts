import { Context } from 'koa'
import * as moment from 'moment'
import * as fs from 'fs'

import { config } from './../config/config'
import { resolve } from './util'

interface logData {
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

const outputLog = (log: Partial<logData>, thrownError: any) => {
    if(config.prettyLog) {
        console.log(`${log.statusCode} ${log.method} ${log.url} - ${log.responseTime}ms`)
        if(thrownError) {
            console.error(thrownError)
        }
    } else if(log.statusCode < 400) {
        process.stdout.write(JSON.stringify(log) + '\n')
    } else {
        process.stderr.write(JSON.stringify(log) + '\n')
        
    }
}

const writeLog = (ctx: Context) => {
    fs.exists(resolve('log', 'log.log'), exist => {
        // console.log(exist ? 'exist' : 'does not exist')
        let data = `[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${ctx.method} - ${ctx.url}
[INFO] userAgent:'${ctx.header['user-agent']}'\n`
        if(exist) {
            fs.appendFile(resolve('log', 'log.log'), data, err => {
                if(err) console.log(err)
                else console.log('append successful!')
            })
        } else {
            fs.writeFile(resolve('log', 'log.log'), data, err => {
                if(err) console.log(err)
                else console.log('write successful!')
            })
        }
    })
}

export async function logger(ctx: Context, next: () => Promise<any>) {
    const start = new Date().getMilliseconds()

    const _logData: Partial<logData> = {
        method: ctx.method,
        url: ctx.url,
        query: ctx.query,
        host: ctx.header['host'],
        remoteAddress: ctx.request.ip,
        userAgent: ctx.header['user-agent']
    }
    let errorThrown: any = null

    try {
        await next()
        _logData.statusCode = ctx.status
    } catch(e) {
        errorThrown = e
        _logData.errorMessage = e.message
        _logData.errorStack = e.stack
        _logData.statusCode = e.status || 500
        if(e.data) {
            _logData.data = e.data
        }
    }

    _logData.responseTime = new Date().getMilliseconds() - start

    outputLog(_logData, errorThrown)
    writeLog(ctx)
    
    if(errorThrown) {
        throw errorThrown
    }
}

/** Logger */
// const logger = () => async (ctx: Context, next: () => Promise<any>) => {
//     console.log(`${ctx.method} ${ctx.header.host} ${ctx.url}`)
//     await next()
// }