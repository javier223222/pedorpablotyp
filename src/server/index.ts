import express,{Express,json,Request,Response} from "express"
import cors from "cors"
import dotenv from "dotenv"

import http from "http"
import root from "../routes"
dotenv.config()
const app:Express=express()
const server=http.createServer(app)
const PORT=process.env.PORT||3000
app.use(express.json())
app.use(cors())
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello World")
})
app.use("/api",root)

export default server