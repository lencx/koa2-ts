export interface IConfig {
    port: number
    prettyLog: boolean
}

export const config = {
    port: process.env.NODE_PORT || 3000,
    prettyLog: process.env.NODE_ENV === 'development',
}
