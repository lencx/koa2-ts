import connectionBase from './connection'
import * as config from 'config'

export default async function() {
    const logColor = config.get('logColor')
    try {
        const dbUrl = config.get<string>('dbUrl')
        const info = await connectionBase(dbUrl)
        console.info(logColor ? 'Connected to \x1b[33m%s\x1b[0m' : '%s', `${dbUrl}`)
    } catch (error) {
        console.error(logColor ? '\x1b[31m%s\x1b[0m' : '%s', error.toString())
    }
}
