import bodyParser from "body-parser"
import express,{Request,Response,Router} from "express"
import dotenv from "dotenv"
import TodoController from "../controllers/TodoController"
import { getToekndata } from "../middlewares"
import ITodo from "../controllers/interfaces/ITodo"
import ILongPoling from "../controllers/interfaces/ILongPoling"
dotenv.config()

let jsonParser = bodyParser.json()
let todoroute:Router=express.Router()
let peticiones:ILongPoling[]=[]
const answerPeticions=async(id:number,result:ITodo)=>{
    
    peticiones.forEach(peticion=>{
        peticion.res.status(200).json({
            success:true,
            message:"Todo Created",
            data:result
        })
    })
    peticiones=peticiones.filter(peticion=>peticion.id!=id)
}
todoroute.post("/",jsonParser,async (req:Request,res:Response):Promise<Response>=>{
    try{
        const todoController:TodoController=new TodoController()
        const {title,content}=req.body
        const {id}=await getToekndata(req.header("x-access-token")||"s")
       
        const result:ITodo=await todoController.create({
            idtodo:0,
            tittle:title,
            content:content,
            userId:id
        })
        await answerPeticions(id,result)

       return res.status(201).json({
              success:true,
              message:"Todo Created",
              data:result
       })

    }catch(e:any){
       console.log(e)
       return res.status(500).json({success:false,message:"Error Creating Todo"})
    }
})
todoroute.get("/",async (req:Request,res:Response):Promise<Response>=>{
    try{
        const todoController:TodoController=new TodoController()
        const {id}=await getToekndata(req.header("x-access-token")||"s")
        const {page,limit}=req.query
        const result=await todoController.get(id,Number(page),Number(limit))
        
       return res.status(200).json({
              success:true,
              message:"Todo Created",
              data:result
       })
    }catch(e:any){
       console.log(e)
       return res.status(500).json({success:false,message:"Error GETTING Todo"})
    }
}
)

todoroute.post("/longpoling",jsonParser,async (req:Request,res:Response)=>{
    try{
        const {id}=await getToekndata(req.header("x-access-token")||"s")
        peticiones.push({res:res,id:id})
         req.on("close",()=>{
            peticiones.filter(peticion=>peticion.id!=id)
         })
        
    }catch(e:any){
        console.log(e)
        return res.status(500).json({success:false,message:"Error GETTING Todo"})
    }
})

export default todoroute