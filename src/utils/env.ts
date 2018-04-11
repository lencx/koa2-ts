import * as fs from 'fs'
import { cy, resolve } from './util'
import { ipAddress } from './get-ip'

/**
 * Config file is written to the local IP Address.
 */
fs.readFile(resolve('config/default.json'), {encoding: 'utf8'}, (_, data) => {
    const d = JSON.parse(data)
    if (d.hostIP !== ipAddress[0]) {
        d.hostIP = ipAddress[0] || 'localhost'
        fs.writeFile(resolve('config/default.json'), JSON.stringify(d, null, 4), () => {
            const confFile = `${cy('config/default.json')}`
            console.log(`IP address successfully written to ${confFile}`)
        })
    }
})

export default process.env.NODE_ENV === 'development'
