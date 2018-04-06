import * as mongoose from 'mongoose'

const Sechma = mongoose.Schema

const UserSechma = new Sechma({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
    },
    email: {
        type: String,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
})

export const UserModel = mongoose.model('User', UserSechma)
