import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Proizvod = new Schema({
  id: {
    type: Number,
  },
  naziv: {
    type: String,
  },
  opis: {
    type: String,
  },
  cena: {
    type: Number,
  },
  lajkovi: {
    type: Number,
  },
  kreator: {
    type: String,
  },
  status: {
    type: String,
  },
});

export default mongoose.model("Proizvod", Proizvod, "proizvodi");
