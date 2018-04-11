/**
 * Returns IPv4 & IPv6 Address for this machine
 * @author lencx
 */
import * as os from 'os'
import { filter, flatten, map } from 'lodash'

export interface IipAddress2 {
    IPv4: object | any
    IPv6: object | any
    [index: string]: object
}

/**
 * @method ipAddress2
 * @return {Object} - ipv4[Object] & ipv6[Object]
 */
const ipAddress2: IipAddress2 = {
    IPv4: new Object(),
    IPv6: new Object(),
}

/**
 * @method ipAddress
 * @return {Array} - ipv4[]
 */
const ifnames = os.networkInterfaces()
const ipAddress: string[] = flatten(map(Object.keys(ifnames), ifname => {
    const interfacesIPv4 = filter(ifnames[ifname], {
        family: 'IPv4',
        internal: false,
    })

    const interfacesIPv6 = filter(ifnames[ifname], {
        family: 'IPv6',
        internal: false,
    })

    const address = map(interfacesIPv4, 'address')[0]
    address ? ipAddress2['IPv4'][ifname] = address : void 0
    const address2 = map(interfacesIPv6, 'address')[0]
    address2 ? ipAddress2['IPv6'][ifname] = address2 : void 0

    return map(interfacesIPv4, 'address')
}))

export {
    ipAddress,
    ipAddress2,
}
