import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as proxy from 'koa-better-http-proxy'
import chalk from 'chalk'

import { routes } from './server/routes'
import { config } from './config/config'
import { logger } from './utils/logger'
import * as path from 'path'

const app = new Koa()
const port = chalk.green(`${config.port}`)
import * as mongoose from 'mongoose'

mongoose.connect(config.dataBase)

app.use(logger)
app.use(views(path.resolve(__dirname, 'client/views'), { extension: 'pug' }))
app.use(bodyParser())
app.use(routes)
app.use(proxy(config.host, {
    port: config.port,
}))
app.listen(config.port)

console.log(`\n${config.host}:${port}\n`)
