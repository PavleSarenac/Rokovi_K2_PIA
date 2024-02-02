import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/lego')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("Connection to the database was successful.")
})

const router = express.Router()

router.route("/login").post(
    (request, response) => new Controller().login(request, response)
)

router.route("/getAllSellingProducts").get(
    (request, response) => new Controller().getAllSellingProducts(request, response)
)

router.route("/getUserByUsername").get(
    (request, response) => new Controller().getUserByUsername(request, response)
)

router.route("/likeProduct").get(
    (request, response) => new Controller().likeProduct(request, response)
)

router.route("/addNewProduct").post(
    (request, response) => new Controller().addNewProduct(request, response)
)

router.route("/getAllWaitingProducts").get(
    (request, response) => new Controller().getAllWaitingProducts(request, response)
)

router.route("/updateProductStatus").post(
    (request, response) => new Controller().updateProductStatus(request, response)
)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));