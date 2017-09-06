// CommonJS
// Emitter？
// JS事件机制 events 事件队列
// 事件触发与事件监听功能的封装
const Emitter = require('events')
const http = require('http')
const debug = require('debug')
module.exports = class Application extends Emitter{
    constructor () {
        super()
        this.middleware = []
    }
    // 启用中间件
    use (fn) {
        console.log(fn)
        this.middleware.push(fn)
        // chain
        return this
    }
    // reset运算符
    listen (...args) {
        debug('listen')
        // 将http的server封装一下
        // const server = http.createServer((request, response) => {
            // 将中间件执行一遍
            // fn(ctx).then()
        // })
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }
    callback () {
        const handleRequest = (req, res) => {
            res.end('hello world')
        }
        return handleRequest
    }
}