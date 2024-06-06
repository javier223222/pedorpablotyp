import bodyParser from "body-parser"
import express,{Request,Response,Router} from "express"
import dotenv from "dotenv"
import IUser from "../domain/interfaces/IUser"
import { getToekndata, verifyToken } from "../middlewares"
import UserController from "../controllers/UserController"

dotenv.config()

let jsonParser = bodyParser.json()
let userroot:Router=express.Router()

userroot.get("/",async(req:Request,res:Response):Promise<Response>=>{
    try{
        const usercontroller:UserController=new UserController()
        const {id}=await getToekndata(req.header("x-access-token")||"s")
        const result:string=await usercontroller.get(id)
        return res.json({
            name:result
        })
        
    }catch(e:any){
        return res.status(500).json({message:e.message})
    }
})
userroot.patch("/",jsonParser,verifyToken,async(req:Request,res:Response):Promise<Response>=>{
    try{
        const usercontroller:UserController=new UserController()
        const token=req.header("x-access-token")||"s"
        let {id}=await getToekndata(token)
        const result=await usercontroller.update(id,"","",req.body.name,"")
       return  res.json(result)
    }catch(e:any){
        return res.status(500).json({message:e.message})
    }
})


export default userroot
