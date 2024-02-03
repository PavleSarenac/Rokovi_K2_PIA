import express from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/proslave2024")
const conn = mongoose.connection
conn.once("open", () => {
    console.log("Connection to the database was successful!")
})

const router = express.Router()

router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/updateUserInfo").post(
    (request, response) => new Controller().updateUserInfo(request, response)
)

router.route("/getAllFutureEvents").get(
    (request, response) => new Controller().getAllFutureEvents(request, response)
)

router.route("/registerForEvent").post(
    (request, response) => new Controller().registerForEvent(request, response)
)

router.route("/getAllUsersEvents").get(
    (request, response) => new Controller().getAllUsersEvents(request, response)
)

router.route("/cancelEvent").get(
    (request, response) => new Controller().cancelEvent(request, response)
)

router.route("/createNewEvent").post(
    (request, response) => new Controller().createNewEvent(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));