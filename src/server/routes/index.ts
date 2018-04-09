import { Context } from 'koa'
import * as Router from 'koa-router'
import * as compose from 'koa-compose'
import user from './api/user'

const children = [
    {routes: user, prefix: '/api'},
]

export default function routes() {
    const router = new Router()

    router
        .get('/', (ctx: Context) => {
            ctx.body = {echo: 'Hello, Koa'}
        })

    // Nested routes
    children.forEach(child => {
        const nestedRouter = new Router()
        child.routes(nestedRouter)
        router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
    })

    return compose([router.routes(), router.allowedMethods()])
}
