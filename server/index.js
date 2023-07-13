import express from "express";
import { Connection } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./router/userRoute.js";
import cors from "cors"
import busRouter from "./router/bus-route.js";

dotenv.config()
const app = express();

//Cors is used to avoid error in frontend and backend 

app.use(cors());


app.use(express.json());
app.use('/api/user',userRouter);
app.use("/api/bus", busRouter);



const PORT = process.env.PORT || 8080;

const username=process.env.DB_USERNAME;
const  password=process.env.DB_PASSWORD;

Connection(username, password)
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
})

