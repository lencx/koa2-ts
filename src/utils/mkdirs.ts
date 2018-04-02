import * as fs from 'fs'
import * as path from 'path'

export const mkdirs = {
    async(dirname: string, callback: () => void) {
        fs.exists(dirname, function(exists) {
            if (exists) {
                callback()
            } else {
                mkdirs.async(path.dirname(dirname), function() {
                    fs.mkdir(dirname, callback)
                })
            }
        })
    },
    sync(dirname: string) {
        if (fs.existsSync(dirname)) {
            return true
        } else {
            if (mkdirs.sync(path.dirname(dirname))) {
                fs.mkdirSync(dirname)
                return true
            }
        }
    },
}
