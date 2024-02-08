import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/pijaca2023')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()


router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/getAllProducts").get(
    (request, response) => new Controller().getAllProducts(request, response)
)

router.route("/order").post(
    (request, response) => new Controller().order(request, response)
)

router.route("/getAllOrders").get(
    (request, response) => new Controller().getAllOrders(request, response)
)

router.route("/updateQuantity").post(
    (request, response) => new Controller().updateQuantity(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));