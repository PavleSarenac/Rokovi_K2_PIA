import mongoose from 'mongoose'

const korisnikSchema = new mongoose.Schema(
    {
        ime: String,
        prezime: String,
        kor_ime: String,
        lozinka: String,
        mejl: String,
        tip: String,
        narudzbine: Array
    },
    {
        versionKey: false
    }
);

export default mongoose.model('KorisnikModel', korisnikSchema, 'korisnici');