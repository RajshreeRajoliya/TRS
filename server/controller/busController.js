import mongoose from "mongoose";
import Bus from "../model/Bus.js";

export const getAllbus = async (req, res, next) => {
  let buses;
  try {
    buses = await Bus.find();
  } catch (err) {
    return console.error(err);
  }
  if (!buses) {
    return res.status(404).json({ message: "No Buses found" });
  }
  return res.status(200).json({ buses });
};
export const addBus= async (req, res, next) => {
  const { number, source, destination, ac, date, duration, price, image } =
    req.body;
  const bus = new Bus({
    number,
    source,
    destination,
    ac,
    date,
    duration,
    price,
    image,
  });
  try {
    await bus.save();
     return res.status(200).json({ bus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
 
};