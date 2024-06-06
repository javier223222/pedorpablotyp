import bodyParser from "body-parser"
import express,{Request,Response,Router} from "express"
import UserController from "../controllers/UserController"
import { getDecodedToken, getToekndata, verifyToken } from "../middlewares"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


let jsonParser = bodyParser.json()
let authuser:Router=express.Router()

authuser.post("/signup",jsonParser,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userController=new UserController()
        const result=await userController.create(req.body.email,req.body.password,req.body.name,req.body.username)
       return res.json(result)
    }catch(e:any){
       return res.status(500).json({message:e.message})
    }
})

authuser.post("/login",jsonParser,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userController=new UserController()
        const result=await userController.login(req.body.email,req.body.password)
       return res.status(200).json({token:result})
    }catch(e:any){
       return res.status(500).json({message:"Login Failed"})
    }
})

authuser.patch("/",jsonParser,verifyToken,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userController=new UserController()
        const token=req.header("x-access-token")||"s"
        let decodedData=await getToekndata(token)
        const result=await userController.update(decodedData.id,"","",req.body.name,"")
       return  res.json(result)
 
        
        
    }catch(e:any){
       return res.status(500).json({message:e.message})
    }
})

authuser.get("/",verifyToken,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const userController=new UserController()
        const token=req.header("x-access-token")||"s"
        let decodedData=await getToekndata(token)
        const result=await userController.get(decodedData.id)
      return  res.json({
            name:result
        })
    }catch(e:any){
       return res.status(500).json({message:e.message})
    }
})








export default authuser