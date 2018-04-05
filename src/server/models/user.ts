import * as mongoose from 'mongoose'

const Sechma = mongoose.Schema

const UserSechma = new Sechma({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
})

export const UserModel = mongoose.model('User', UserSechma)
