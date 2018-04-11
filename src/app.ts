import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as proxy from 'koa-better-http-proxy'
import * as assets from 'koa-static'

import routes from './server/routes'
// import { config } from './config/config'
import { logger } from './utils/logger'
import { cg, cy, resolve } from './utils/util'
import DEV_ENV from './utils/env'

import * as config from 'config'

console.log(config.get('host'), DEV_ENV)

const app = new Koa()
const port = cg(`${config.get('port')}`)
import * as mongoose from 'mongoose'

mongoose.set('debug', true)
const db = mongoose.createConnection(config.get('dbUrl'), {
    // config: { autoIndex: false },
})

db ? console.log(`Mongoose default connection open to ${cy(config.get('dbUrl'))}`) : void 0

app.use(assets('.'))
app.use(assets(resolve('assets/')))
/** logger */
app.use(logger)
/** use template */
app.use(views(resolve(__dirname, 'client/views'), { extension: 'pug' }))
app.use(bodyParser())
/** router */
app.use(routes())
/** dev proxy */
app.use(proxy(config.get('host'), {
    port: config.get('port'),
}))

app.listen(config.get('port'), () => console.log(`\n${config.get('host')}:${port}`))

// console.log('---------')
// console.log(ipAddress)
// console.log('---------')
// console.log(o)

// console.log(os.networkInterfaces().en0[0].address)
// console.log(os.hostname())
// console.log(os.())
