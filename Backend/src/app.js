import express from "express";
import { createServer } from "node:http";   // connects the servers of socket.io and express
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import cors  from "cors";

import { connectToSocket }  from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended:true}));

app.get("/home", (req, res)=>{
    return res.json({hello:"world"});       // sends a header with content-type as application/json and stringify or converst the jso to json
})

const start = async () => {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);     // return a mongoose conection object
    //This object has a key of connection which is also a object and has a host,port as its object's property
    console.log(`Mongo Connected DB Host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log(`Listening on port : ${app.get("port")}`);
    });
};
start();
