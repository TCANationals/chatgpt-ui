import { createProxyMiddleware } from 'http-proxy-middleware'
export default defineEventHandler(async (event) => {
    await new Promise((resolve, reject) => {
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000/',
            pathFilter: '/api',
        })(event.node.req, event.node.res, (err) => {
            if (err)
                reject(err)
            else
                resolve(true)
        })
    })
})
