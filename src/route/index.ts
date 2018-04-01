import { routeObj as _ } from './../utils/util'
// import * as Router from 'koa-router'
// const _ = new Router()

import {User} from './user'

export const AppRoutes: any[] = [
    _('/user', 'get', User),
    // _('/xx', 'get', ctx => ctx.body = 'hello')
]
