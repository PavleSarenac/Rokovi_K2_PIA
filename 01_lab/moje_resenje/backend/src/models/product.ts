import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        id: Number,
        naziv: String,
        opis: String,
        cena: Number,
        lajkovi: Number,
        kreator: String,
        status: String
    },
    {
        versionKey: false
    }
);

export default mongoose.model("ProductModel", productSchema, "proizvodi");