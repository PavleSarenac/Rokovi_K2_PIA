import mongoose from 'mongoose'

const proizvodSchema = new mongoose.Schema(
    {
        naziv: String,
        kategorija: String,
        cena: String,
        stanje: Number
    },
    {
        versionKey: false
    }
);

export default mongoose.model('ProizvodModel', proizvodSchema, 'proizvodi');