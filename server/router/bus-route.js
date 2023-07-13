import express from "express";
import { addBus, getAllbus } from "../controller/busController.js";

const busRouter = express.Router();

busRouter.get("/", getAllbus);
busRouter.post("/add",addBus);

export default busRouter;