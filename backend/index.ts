import { Router, AppInstance, bodyParser, chunkParser, urlParser } from "./src/framework";
import mongoose from 'mongoose'
import { getUsers as getDBUsers} from "./src/controllers";
import {addUser, deleteUser, getUsers} from "./src/roomUsers"
const io = require("socket.io")


const app = new AppInstance()
 


const PORT = 3005;
const WSPORT = 9000;
const router = new Router();
app.use(bodyParser)
app.use(chunkParser)
app.use(urlParser(`https://localhost:${PORT}`))

router.get('/users', getDBUsers)
app.addRouter(router)


app.wsserver.on('connection', (socket) => {

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data)
    } )
    socket.on('login', ({ name, room }, callback) => {
        const { user, error } = addUser(socket.id, name, room)
        if (error) return callback(error)
        socket.join(user.room)
        socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
        app.wsserver.in(room).emit('users', getUsers(room))
        console.log(name, room)
        callback()
    })
    socket.on("disconnect", () => {
        const user = deleteUser(socket.id)
        if (user) {
            app.wsserver.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
            app.wsserver.in(user.room).emit('users', getUsers(user.room))
        }
    })
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