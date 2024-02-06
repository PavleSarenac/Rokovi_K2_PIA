import mongoose from 'mongoose'

const travelerSchema = new mongoose.Schema(
    {
        korisnickoIme: String,
        lozinka: String,
        ime: String,
        prezime: String,
        tip: String,
        imejl: String,
        lokacijatrenutna: String,
        novac: Number,
        lista: Array
    },
    {
        versionKey: false
    }
);

export default mongoose.model('TravelerModel', travelerSchema, 'putnici');