import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        korisnickoIme: String,
        lozinka: String,
        ime: String,
        prezime: String,
        tip: String,
        potroseno: Number,
        naStanju: Number,
        lista: Array
    },
    {
        versionKey: false
    }
);

export default mongoose.model('UserModel', userSchema, 'korisnici');