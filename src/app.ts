import * as Koa from 'koa'
import * as config from 'config'

import middleware from './middlewares'
import connect from './connect'
import routes from './server/routes'
import { clr, resolve } from './utils'
import { DEV_ENV } from './utils/env'

const app = new Koa()
const writeIP = DEV_ENV && config.get('autoGetIP')
const host = `http://${writeIP ? config.get('hostIP') : config.get('host')}`
const port = clr(35, config.get('port'))

/**
 * middleware
 * logger, cors, HandleErrors, static,
 * views, bodyParser, delay etc.
 */
app.use(middleware())
/** router */
app.use(routes())
/** connect database */
connect()
/** url & port */
app.listen(config.get('port'), () => console.log(`\n${host}:${port}`))
