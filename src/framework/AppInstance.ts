const http = require('http');
const EEmitter = require('events')

export class AppInstance {
    emitter: any;
    server: any;
    middlewares: any;
    constructor(){
        this.emitter = new EEmitter()
        this.server = this.#_createServer()
        this.middlewares = []
    }

    #_createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res))
            console.log('req', req.url, req.method)
            const isEmitted = this.emitter.emit(this.#_getRouteMask(req), req, res)
            if(!isEmitted) res.end('Unknown request')
        })      
    }

    #_getRouteMask({pathname, method}) {
        return `[${pathname}]:[${method}]`
    }

    use(middleware){
        this.middlewares.push(middleware)
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

    
}