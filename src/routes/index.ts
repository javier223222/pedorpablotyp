import express,{Express} from "express"
import authuser from "./AuthRoute"
import todoroute from "./TodoRoute"
import { verifyToken } from "../middlewares"
import userroot from "./UserRoute"


let root:Express=express()
root.use("/auth",authuser)
root.use("/todo",verifyToken,todoroute)
root.use("/user",verifyToken,userroot)


export default root