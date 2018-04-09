import * as Router from 'koa-router'
import user, { IUser } from './../../models/user'

export default (router: Router) => {
    router
        .get('users', async ctx => {
            ctx.body = await user.find({})
        })
}
