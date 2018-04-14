import * as config from 'config'
import { connect, connection as db } from 'mongoose';
// import * as mongoose from 'mongoose';

export default function(uri: string) {
    // mongoose.set('debug', true)
    return new Promise((resolve, reject) => {
        db
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(db))

        connect(uri)
    })
}
