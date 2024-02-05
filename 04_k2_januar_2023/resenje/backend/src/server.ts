import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/darivanja')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()

router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/getWishList").get(
    (request, response) => new Controller().getWishList(request, response)
)

router.route("/addProduct").post(
    (request, response) => new Controller().addProduct(request, response)
)

router.route("/getAllOtherUsers").get(
    (request, response) => new Controller().getAllOtherUsers(request, response)
)

router.route("/getAllUsers").get(
    (request, response) => new Controller().getAllUsers(request, response)
)

router.route("/adminPay").get(
    (request, response) => new Controller().adminPay(request, response)
)

router.route("/subtractMoney").get(
    (request, response) => new Controller().subtractMoney(request, response)
)

router.route("/buyPresent").post(
    (request, response) => new Controller().buyPresent(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));