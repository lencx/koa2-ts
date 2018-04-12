import * as compose from 'koa-compose'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as assets from 'koa-static'
import * as logger from 'koa-logger'
import * as cors from '@koa/cors'
import * as config from 'config'

import { cg, cy, resolve } from './../utils'
import { setHostIP } from './../utils/env'
import delay from './delay'
import HandleErrors from './error'

// import { ipAddress } from './../middlewares/get-ip'
// console.log(ipAddress)
setHostIP()

// console.log(resolve(__dirname, '../client/views'))
export default function middleware() {
    return compose([
        logger(),
        cors(),
        HandleErrors(),
        assets('.'),
        assets(resolve('assets/'), {defer: true}),
        assets(resolve('src/'), {defer: true}),
        views(resolve(__dirname, '../client/views'), { extension: 'pug' }),
        bodyParser(),
        delay({ms: 500}),
    ])
}
