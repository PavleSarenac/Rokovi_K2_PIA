import mongoose from 'mongoose'

const korisnikSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
        ime: String,
        prezime: String,
        tip: String,
        tim: Number
    },
    {
        versionKey: false
    }
);

export default mongoose.model('KorisnikModel', korisnikSchema, 'korisnici');