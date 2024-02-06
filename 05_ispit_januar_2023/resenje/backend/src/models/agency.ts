import mongoose from 'mongoose'

const agencySchema = new mongoose.Schema(
    {
        korisnickoIme: String,
        lozinka: String,
        tip: String,
        naziv: String,
        PIB: Number,
        usluge: Array
    },
    {
        versionKey: false
    }
);

export default mongoose.model('AgencyModel', agencySchema, 'agencije');