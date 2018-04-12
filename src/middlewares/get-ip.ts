/**
 * Returns IPv4 & IPv6 Address for this machine
 * @author lencx
 */
import * as os from 'os'
import { filter, flatten, map } from 'lodash'

export interface IipAddress2 {
    IPv4: object | any
    IPv6: object | any
    [index: string]: object | any
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
    const interfacesType = (type: string) => filter(ifnames[ifname], {
        family: type,
        internal: false,
    })
    const addressType = (addr: string, type: string) => addr ? ipAddress2[type][ifname] = addr : void 0

    const ipv4 = interfacesType('IPv4')

    const address = map(ipv4, 'address')[0]
    const address2 = map(interfacesType('IPv6'), 'address')[0]
    addressType(address, 'IPv4')
    addressType(address2, 'IPv6')

    return map(ipv4, 'address')
}))

export {
    ipAddress,
    ipAddress2,
}
