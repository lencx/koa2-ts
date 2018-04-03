const DEV_ENV = process.env.NODE_ENV === 'development'
export interface IConfig {
    host: string
    port: number | string
    prettyLog: boolean
    DEV_ENV: boolean
}

let envPort: any = process.env.NODE_PORT
envPort = envPort === undefined ? 3000 : envPort

export const config = {
    host: 'http://172.16.0.45',
    port: envPort,
    prettyLog: DEV_ENV,
    DEVENV: DEV_ENV,
}
