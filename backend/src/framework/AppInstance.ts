const http = require('http');
const EEmitter = require('events')
const io = require("socket.io")

export class AppInstance {
    emitter: any;
    server: any;
    middlewares: any;
    wsserver: any;
    constructor(){
        this.emitter = new EEmitter()
        this.server = this.#_createServer()
        this.wsserver = this.#_createWSServer()
        this.middlewares = []
    }

    use(middleware){
        this.middlewares.push(middleware)
    }

    #_createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res))
            const isEmitted = this.emitter.emit(this.#_getRouteMask(req), req, res)
            if(!isEmitted) res.end('Unknown request')
        })      
    }

    #_createWSServer() {
        return io(http.createServer(), {cors: {origin: "*"}})
    }

    #_getRouteMask({pathname, method}) {
        return `[${pathname}]:[${method}]`
    }

    addRouter(router) {
        Object.keys(router.routes).forEach(pathname => {
            const route = router.routes[pathname]
            Object.keys(route).forEach(method => {
                const handler = route[method]
                this.emitter.on(this.#_getRouteMask({pathname, method}),(req, res) => {
                    handler(req,res)  
                })
            })
        })      
    }

    observe(PORT, cb){
        this.server.listen(PORT, cb)
    }

    listen(WSPORT, cb) {
        this.wsserver.listen(WSPORT, cb)
    }

    
}