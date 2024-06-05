import express,{Express} from "express"
import authuser from "./AuthRoute"

let root=express()
root.use("/auth",authuser)

export default root