import * as compose from 'koa-compose'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as assets from 'koa-static'
import * as logger from 'koa-logger'
import * as cors from '@koa/cors'
import * as config from 'config'
import * as graphQL from 'apollo-server-koa'

import delay from './delay'
import HandleErrors from './error'
import outputLogger from './logger'
import { resolve } from './../utils'
import { DEV_ENV, setHostIP } from './../utils/env'

config.get('autoGetIP') && DEV_ENV
    ? setHostIP() : config.get('host')

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
        outputLogger,
    ])
}
