// import { Context } from 'koa'
// import { UserModel } from './../models/user'

// // UserModel.findById({name: 'len'}, res => {
// //     console.log(res)
// // })
// // const my = new UserModel({
// //     name: 'lencxcxd',
// //     age: 22,
// //     email: 'sas@gmail.com',
// // })
// // // my.save()
// // console.log(my.name)

// export async function User(ctx: Context) {
//     // return ctx.body = ctx.request.body

//     const user = await UserModel.findOne({name: 'len'})
//     console.log(user)
//     await ctx.render('user', {
//         title: 'user',
//         list: [{
//             name: 'Len',
//             age: 24,
//         }, {
//             name: 'Tom',
//             age: 18,
//         }],
//     })
// }
