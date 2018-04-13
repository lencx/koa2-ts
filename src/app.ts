import * as Koa from 'koa'
import * as proxy from 'koa-better-http-proxy'

import middleware from './middlewares'
import routes from './server/routes'
import * as mongoose from 'mongoose'

import { cg, cy, resolve } from './utils'
import { DEV_ENV } from './utils/env'
import * as config from 'config'

// console.log(config.get('host'), DEV_ENV)
const app = new Koa()
const writeIP = DEV_ENV && config.get('autoGetIP')
const host = writeIP ? `http://${config.get('hostIP')}` : `http://${config.get('host')}`
const port = cg(`${config.get('port')}`)

mongoose.set('debug', true)
const db = mongoose.createConnection(config.get('dbUrl'), {
    // config: { autoIndex: false },
})
db ? console.log(`Mongoose default connection open to ${cy(config.get('dbUrl'))}`) : void 0

/**
 * middleware
 * logger, cors, HandleErrors, static,
 * views, bodyParser, delay etc.
 */
app.use(middleware())
/** router */
app.use(routes())
/** dev proxy */
if (writeIP) {
    app.use(proxy(host, {
        port: config.get('port'),
    }))
}

/** url & port */
app.listen(config.get('port'), () => console.log(`\n${host}:${port}`))
