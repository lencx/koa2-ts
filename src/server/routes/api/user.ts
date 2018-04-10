import * as Router from 'koa-router'
// import IUser from './../../models/user'

export default (router: Router) => {
    router
        .get('/users', async ctx => {
            ctx.body = 'User'
        })
}
