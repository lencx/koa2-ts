import * as mongoose from 'mongoose'
import { Document, Schema } from 'mongoose'

export interface IUser {
    username: string
    email?: string
}

export interface IUserModel extends IUser, Document {
    createTime: Date
}

const userSchema = new Schema({
    username: String,
    _createTime: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false})

userSchema.virtual('createTime')
    .set(function(val: any) {
        this._createTime = val
    })
    .get(function() {
        return this._createTime.toLocaleString()
    })

export default mongoose.model<IUserModel>('User', userSchema)
