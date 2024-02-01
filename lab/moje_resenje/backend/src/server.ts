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

router.route("/getAllProducts").get(
    (request, response) => new Controller().getAllProducts(request, response)
)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));