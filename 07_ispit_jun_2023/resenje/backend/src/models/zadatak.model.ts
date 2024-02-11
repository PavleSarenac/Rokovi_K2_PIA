import mongoose from 'mongoose'

const zadatakSchema = new mongoose.Schema(
    {
        sadrzaj: String,
        obavljen: Boolean,
        tip: String,
        dodeljen: String
    },
    {
        versionKey: false
    }
);

export default mongoose.model('ZadatakModel', zadatakSchema, 'zadaci');