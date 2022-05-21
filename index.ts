import { Router, AppInstance, bodyParser, chunkParser, urlParser } from "./src/framework";
import mongoose from 'mongoose'
import { getUsers } from "./src/controllers";



const app = new AppInstance()

const PORT =  3000;
const router = new Router();
app.use(bodyParser)
app.use(chunkParser)
app.use(urlParser('https://localhost:3000'))

router.get('/users', getUsers)
app.addRouter(router)


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.e2nal.mongodb.net/?retryWrites=true&w=majority")
        app.observe(PORT, ()=> "server started at: " + PORT + " port");
    } catch (e) {
        console.log(e)
    }
}


start()