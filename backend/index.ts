import { Router, AppInstance, bodyParser, chunkParser, urlParser } from "./src/framework";
import mongoose from 'mongoose'
import { getUsers } from "./src/controllers";
const io = require("socket.io")


const app = new AppInstance()
 


const PORT = 3005;
const WSPORT = 9000;
const router = new Router();
app.use(bodyParser)
app.use(chunkParser)
app.use(urlParser(`https://localhost:${PORT}`))

router.get('/users', getUsers)
app.addRouter(router)


app.wsserver.on('connection', (socket) => {
    console.log('hello')

    socket.on('canvas-data', (data) => {
        console.log('data', data)
        // socket.broadcast.emit('canvas-data', data)
    } )
})


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.e2nal.mongodb.net/?retryWrites=true&w=majority")
        app.observe(PORT, ()=> "server started at: " + PORT + " port");
        app.listen(WSPORT, () => "wssocket port is listening")
    } catch (e) {
        console.log(e)
    }
}


start()