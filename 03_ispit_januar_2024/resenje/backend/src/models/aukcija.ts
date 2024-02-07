import mongoose from 'mongoose'

const aukcijaSchema = new mongoose.Schema(
    {
        naziv: String,
        pocetak: String,
        kraj: String,
        umetnine: Array
    },
    {
        versionKey: false
    }
);

export default mongoose.model('AukcijaModel', aukcijaSchema, 'aukcije');