import { RequestMethods } from "../enums/RequestMethods"


export class Router {
    routes = {}
    constructor(){
        this.routes = {}
    }

    #_call(method = "GET", path: string, handler: (req, res) => void) {
        if(!this.routes[path]) this.routes[path] = {}
        const route = this.routes[path]
        if(route[method]) throw new Error("There is handler on this path with this method")
        route[method] = handler

    }

    get(path, handler) {
        this.#_call(RequestMethods.Get, path, handler)
    }
    post(path, handler) {
        this.#_call(RequestMethods.Post, path, handler)
    }
    put(path, handler) {
        this.#_call(RequestMethods.Put, path, handler)
    }
    delete(path, handler) {
        this.#_call(RequestMethods.Delete, path, handler)
    }

}