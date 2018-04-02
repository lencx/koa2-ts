import { routeObj as _ } from './utils/util'

import { User } from './controller/user'

export const AppRoutes: any[] = [
    _('/user', 'get', User),
]
