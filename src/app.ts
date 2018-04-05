import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as proxy from 'koa-better-http-proxy'

import { routes } from './server/routes'
import { config } from './config/config'
import { logger } from './utils/logger'
import { cg, cy, resolve } from './utils/util'

const app = new Koa()
const port = cg(`${config.port}`)
import * as mongoose from 'mongoose'

mongoose.set('debug', true)
const db = mongoose.createConnection(config.dataBase, {
    // config: {
    //     autoIndex: false,
    // },
})

// global: NodeJS.Global

if (db) {
    console.log(`Mongoose default connection open to ${cy(config.dataBase)}`)
    // global.db = db
} else {
    console.log('mongodb connected failed')
}

/** logger */
app.use(logger)
/** use template */
app.use(views(resolve(__dirname, 'client/views'), { extension: 'pug' }))
app.use(bodyParser())
/** router */
app.use(routes)
/** dev proxy */
app.use(proxy(config.host, {
    port: config.port,
}))

app.listen(config.port, () => console.log(`\n${config.host}:${port}`))

// mongoose.connection.on('error', err => console.log(`Mongoose default connection open to ${err}`))

// mongoose.connection.on('connected', () => console.log(`Mongoose default connection open to ${cy(config.dataBase)}`))

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection closed through app twemination')
        process.exit(0)
    })
})
