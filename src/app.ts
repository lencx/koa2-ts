import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'

import { config } from './config/config'
import { logger } from './utils/logger'
import { AppRoutes } from './routes'

const app = new Koa()
const router = new Router()

// console.log(process.env.NODE_ENV)

AppRoutes.forEach(route => router[route.method](route.path, route.action)) 

app.use(logger)
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(config.port)
console.log(`http://localhost:${config.port}`)
console.log(`The server is starting at port ${config.port}`)
