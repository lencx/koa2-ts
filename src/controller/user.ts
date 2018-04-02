import { Context } from 'koa'

export async function User(ctx: Context) {
    return ctx.body = ctx.request.body
}
