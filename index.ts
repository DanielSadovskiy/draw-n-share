import { Router, AppInstance, bodyParser, chunkParser, urlParser } from "./src/framework";

const app = new AppInstance()

const PORT =  3000;
const router = new Router();
app.use(bodyParser)
app.use(chunkParser)
app.use(urlParser('https://localhost:3000'))

router.get('/users', (req, res) => {res.send({alex: 3})})
app.addRouter(router)


app.observe(PORT, ()=> "server started at: " + PORT + " port");