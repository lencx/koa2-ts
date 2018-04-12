import * as Koa from 'koa'
import * as proxy from 'koa-better-http-proxy'

import middleware from './middlewares'
import routes from './server/routes'
// import { config } from './config/config'

import { cg, cy, resolve } from './utils'
import DEV_ENV from './utils/env'
import * as config from 'config'

// console.log(config.get('host'), DEV_ENV)

const app = new Koa()
const port = cg(`${config.get('port')}`)
import * as mongoose from 'mongoose'

mongoose.set('debug', true)
const db = mongoose.createConnection(config.get('dbUrl'), {
    // config: { autoIndex: false },
})

db ? console.log(`Mongoose default connection open to ${cy(config.get('dbUrl'))}`) : void 0
app.use(middleware())
/** router */
app.use(routes())
/** dev proxy */
app.use(proxy(config.get('hostIP'), {
    port: config.get('port'),
}))

app.listen(config.get('port'), () => console.log(`\nhttp://${config.get('hostIP')}:${port}`))
