import { Context } from 'koa'

export async function User(ctx: Context) {
    // return ctx.body = ctx.request.body
    await ctx.render('user', {
        title: 'user',
        list: [{
            name: 'lencx',
            age: 24,
        }, {
            name: 'Tom',
            age: 18,
        }],
    })
}
