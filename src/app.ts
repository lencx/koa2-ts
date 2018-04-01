import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'

import { logger } from './utils/logger'
import { AppRoutes } from './route'
import { config } from './config/config'

// console.log(AppRoutes)
const app = new Koa()
const router = new Router()
const port = config.port

AppRoutes.forEach(route => router[route.method](route.path, route.action))

app.use(logger)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(config.port)
console.log(`The server is starting at port ${config.port}`)