import mongoose from "mongoose";

const Schema = mongoose.Schema;

const busSchema = new Schema({
  number: { type: String, required: true },

  source: { type: String, required: true },

  destination: { type: String, required: true },

  ac: { type: String, required: true },

  date: { type: String, required: true },

  duration: { type: String, required: true },

  price: { type: String, required: true },

  image: { type: String, required: true },

});
const Bus = mongoose.model("Bus", busSchema);
export default Bus;