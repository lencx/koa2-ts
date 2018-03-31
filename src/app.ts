import * as Koa from 'koa'
import * as Router from 'koa-router'
import { logger, printListePort } from './utils/print'

const port = 3000
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(logger())

app.use(async ctx => {
    ctx.body = 'Hello World'
})


app.listen(port)
printListePort(port)