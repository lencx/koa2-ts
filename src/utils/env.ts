import * as fs from 'fs'

import { resolve } from './index'
import { ipAddress } from './../middlewares/get-ip'

/**
 * Config file is written to the local IP Address.
 */
export function setHostIP() {
    fs.readFile(resolve('config/default.json'), {encoding: 'utf8'}, (_, data) => {
        const d = JSON.parse(data)
        if (d.hostIP !== ipAddress[0]) {
            d.hostIP = ipAddress[0] || 'localhost'
            fs.writeFile(resolve('config/default.json'), JSON.stringify(d, null, 4), () => {
                const confFile = '\x1b[31mconfig/default.json\x1b[0m'
                console.log(`IP address successfully written to ${confFile}`)
            })
        }
    })
}

export const DEV_ENV = process.env.NODE_ENV === 'development'
