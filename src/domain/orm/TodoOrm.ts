import ITodo from "../../controllers/interfaces/ITodo"
import ITodoPagination from "../interfaces/ITodoPagination"
import { db } from "../repositories/mysql.repo"

export default class TodoOrm{
   
    public async create(todo:ITodo): Promise<ITodo> {
        try{
            const result=await db.todo.create({
                data:{
                    title:todo.tittle,
                    content:todo.content,
                    userId:todo.userId,
                    isDone:false
                }
            })
            return {
                idtodo:result.idtodo,
                tittle:result.title,
                content:result.content,
                userId:result.userId,
                estatus:result.isDone
                
            }
    
        }catch(e: any){
            throw new Error(e)
        }
    }

    public async update(idtodo:number,title:string,content:string): Promise<any> {
        try{
            const result=await db.todo.update({
                where:{
                    idtodo:idtodo
                },
                data:{
                    title:title,
                    content:content
                }
            })
            return {
                id:result.idtodo,
                title:result.title,
                content:result.content,
                userId:result.userId,
                isDone:result.isDone,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            }
        }catch(e: any){
            throw new Error(e)
        }
    }

    public async delete(idtodo:number): Promise<any> {
        try{
            const result=await db.todo.delete({
                where:{
                    idtodo:idtodo
                }
            })
            return {
                id:result.idtodo,
                title:result.title,
                content:result.content,
                userId:result.userId,
                isDone:result.isDone,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            }
        }catch(e: any){
            throw new Error(e)
        }
    }
    public async changedone(idtodo:number,isdone:boolean): Promise<any> {
        try{
            const result=await db.todo.update({
                where:{
                    idtodo:idtodo
                },
                data:{
                    isDone:isdone
                }
            })
            return {
                id:result.idtodo,
                title:result.title,
                content:result.content,
                userId:result.userId,
                isDone:result.isDone,
                createdAt:result.createdAt,
                updatedAt:result.updatedAt
            }
        }catch(e: any){
            throw new Error(e)
        }
    }
    
    public async get(iduser:number,page?:number,limit?:number): Promise<ITodo[]|ITodoPagination> {
        try{
            if(page && limit){
                const result=await db.todo.findMany({
                    where:{
                        userId:iduser
                    },
                    orderBy:{
                        createdAt:"desc"
                    },
                    skip:(page-1)*limit,
                    take:limit
                })
                const count=await db.todo.count({
                    where:{
                        userId:iduser
                    }
                })
                return {
                    page:page,
                    limit:limit,
                    total:result.length,
                    total_pages:Math.ceil(count/limit),
                    data:result.map((todo)=>{
                        return {
                            idtodo:todo.idtodo,
                            tittle:todo.title,
                            content:todo.content,
                            userId:todo.userId
                        }
                    })
                }

            }

            const result=await db.todo.findMany({
                where:{
                    userId:iduser
                },
                orderBy:{
                    createdAt:"desc"
                }
            })
            return result.map((todo)=>{
                return {
                    idtodo:todo.idtodo,
                    tittle:todo.title,
                    content:todo.content,
                    userId:todo.userId
                }
            })
        }catch(e: any){
            throw new Error(e)
        }
    }
}