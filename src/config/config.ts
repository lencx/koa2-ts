const DEV_ENV = process.env.NODE_ENV === 'development'
export interface IConfig {
    host: string
    port: number | string
    dataBase: string
    prettyLog: boolean
    DEV_ENV: boolean
}

let envPort: any = process.env.NODE_PORT
envPort = envPort === undefined ? 3000 : envPort

export const config = {
    host: 'http://localhost',
    dataBase: 'mongodb://127.0.0.1:27017',
    port: envPort,
    prettyLog: DEV_ENV,
    DEVENV: DEV_ENV,
}
