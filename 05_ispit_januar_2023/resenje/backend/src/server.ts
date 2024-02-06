import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/turizam23')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()

router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/addNewOffer").post(
    (request, response) => new Controller().addNewOffer(request, response)
)

router.route("/updateLocation").get(
    (request, response) => new Controller().updateLocation(request, response)
)

router.route("/getTripsInfo").post(
    (request, response) => new Controller().getTripsInfo(request, response)
)

router.route("/search").post(
    (request, response) => new Controller().search(request, response)
)

router.route("/addNewTrip").post(
    (request, response) => new Controller().addNewTrip(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));