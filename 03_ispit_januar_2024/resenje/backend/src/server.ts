import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { Controller } from './controllers/controller';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/aukcije2024')
const conn = mongoose.connection
conn.once('open', () => {
    console.log("DB ok")
})

const router = express.Router()

router.route("/login").get(
    (request, response) => new Controller().login(request, response)
)

router.route("/getAllCurrentAuctions").get(
    (request, response) => new Controller().getAllCurrentAuctions(request, response)
)

router.route("/getArtworks").get(
    (request, response) => new Controller().getArtworks(request, response)
)

router.route("/bid").post(
    (request, response) => new Controller().bid(request, response)
)

router.route("/getAllBoughtArtworks").get(
    (request, response) => new Controller().getAllBoughtArtworks(request, response)
)

router.route("/getAllAuctions").get(
    (request, response) => new Controller().getAllAuctions(request, response)
)

app.use("/", router)
app.listen(4000, () => console.log(`Express server running on port 4000`));