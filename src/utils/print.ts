/** Logger */
const logger = () => async (ctx: any, next: any) => {
    console.log(`${ctx.method} ${ctx.header.host} ${ctx.url}`)
    await next()
}

/**
 * Server Port
 * @param {Number} - port
 * @return {String}
 */
const printListePort = (port: number) => console.log(`The server is starting at port ${port}`)

export {
    logger,
    printListePort
}