import { Context } from 'koa'
import { UserModel } from './../models/user'

// console.log(UserModel)

// const my = mongoose.model

// const myInfo = new UserModel({
//     username: {
//         type: 'Len',
//         unique: true,
//         required: true,
//     },
//     password: {
//         type: '123abc',
//         required: true,
//     },
//     email: {
//         type: 'cxin1314@gmail.com',
//     },
// })

// myInfo.save(err => {
//     console.log(err)
// })

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
