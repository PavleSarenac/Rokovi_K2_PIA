import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        ime: String,
        prezime: String,
        kor_ime: String,
        lozinka: String,
        mejl: String,
        opstina: String,
        tip: String
    },
    {
        versionKey: false
    }
);

export default mongoose.model("UserModel", userSchema, "korisnici");