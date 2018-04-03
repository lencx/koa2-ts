import * as Router from 'koa-router'
const _ = new Router()

import { User } from './controller/user'

/************* Router Start *************/

_.get('/user', User)
_.get('/user2', async function(ctx) {ctx.body = ctx.request.body})

/************** Router End **************/
_.allowedMethods()
export const routes = _.routes()
