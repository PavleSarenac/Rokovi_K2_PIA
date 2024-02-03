import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        ime: String,
        prezime: String,
        kor_ime: String,
        lozinka: String,
        mejl: String,
        prijatelji: Array
    },
    {
        versionKey: false
    }
)

export default mongoose.model("UserModel", userSchema, "korisnici")