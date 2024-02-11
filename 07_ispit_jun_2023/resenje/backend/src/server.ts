import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/zadaci2023')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()

router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/getTeamMembers").get(
    (request, response) => new Controller().getTeamMembers(request, response)
)

router.route("/assign").post(
    (request, response) => new Controller().assign(request, response)
)

router.route("/getMyAssignments").get(
    (request, response) => new Controller().getMyAssignments(request, response)
)

router.route("/deleteAssignment").post(
    (request, response) => new Controller().deleteAssignment(request, response)
)

router.route("/done").post(
    (request, response) => new Controller().done(request, response)
)

router.route("/returnToUndone").post(
    (request, response) => new Controller().returnToUndone(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));