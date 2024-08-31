import express from "express"
const app = express();
import dbConnect from  "./dbConnect/dbConnection.js"
import routes from "./routes/routes.js"
import cors from "cors"
app.use(cors())
import {createServer} from "http"
const httpServer = createServer(app)
import {Server} from "socket.io"
const socketIO = new Server(httpServer , {
    cors : {
        origin : "http://localhost:8081"
    }
})

import dotenv from "dotenv"
dotenv.config()

app.use(express.json())

app.use("/" , routes)

const PORT = process.env.PORT || 5000
httpServer.listen(PORT , ()=> {
    console.log(`Listening on PORT ${PORT}`);
    dbConnect()
})