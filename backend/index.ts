import { Router, AppInstance, bodyParser, chunkParser, urlParser } from "./src/framework";
import mongoose from 'mongoose'
import { getUsers as getDBUsers} from "./src/controllers";
import {addUser, deleteUser, getUsers, updateUserByName, getUserByName} from "./src/roomUsers"
const io = require("socket.io")


const app = new AppInstance()
 


const PORT = 3005;
const WSPORT = 3003;
const router = new Router();
app.use(bodyParser)
app.use(chunkParser)
app.use(urlParser(`https://localhost:${PORT}`))

router.get('/users', getDBUsers)
app.addRouter(router)


app.wsserver.on('connection', (socket) => {

    
    socket.on('login', ({ name, room, password }, callback) => {
        const { user, error } = addUser(socket.id, name, room, password)
        if (error) return callback({error})
        socket.join(room)
        socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
        socket.broadcast.to(room).emit('users', getUsers(room))
        callback({user})
    })

    socket.on('canvas-data', ({data, room}) => {
        socket.broadcast.to(room).emit('canvas-data', data);
    } )

    socket.on("disconnect", () => {
        const user = deleteUser(socket.id)
        // socket.leave(user.room)
        if (user) {
            app.wsserver.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
            app.wsserver.in(user.room).emit('users', getUsers(user.room))
        }
    })

    socket.on("toggle", ({name}) => {
        const updated = updateUserByName(name, {isAbleToDraw: !getUserByName(name).isAbleToDraw})
        socket.broadcast.to(updated.id).emit('toggle', {user: updated});
        app.wsserver.in(updated.room).emit('users', getUsers(updated.room))
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