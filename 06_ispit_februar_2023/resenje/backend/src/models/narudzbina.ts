import mongoose from 'mongoose'

const narudzbinaSchema = new mongoose.Schema(
    {
        idN: Number,
        kupac: String,
        proizvodi: Array,
        racun: Number
    },
    {
        versionKey: false
    }
);

export default mongoose.model('NarudzbinaModel', narudzbinaSchema, 'narudzbine');