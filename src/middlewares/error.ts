import { Middleware } from 'koa'

export default (opts?: any): Middleware => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (e) {
            console.log(e.status)
            switch  (e.status) {
                case 401:
                    ctx.body = 'Please Login!'
                    break
                default:
                    ctx.body = e.stack || e.message
            }
        }
    }
}
