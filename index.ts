import { Router, AppInstance, bodyParser } from "./src/framework";

const app = new AppInstance()

const PORT =  3000;
const router = new Router();
app.use(bodyParser)

router.get('/users', (req, res) => {res.send({alex: 3})})
app.addRouter(router)


app.observe(PORT, ()=> "server started at: " + PORT + " port");