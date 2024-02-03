import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        naziv: String,
        mesto: String,
        organizator: String,
        datum: String,
        dolazi: Array
    },
    {
        versionKey: false
    }
)

export default mongoose.model("EventModel", eventSchema, "proslave")