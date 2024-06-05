import { db } from "../repositories/mysql.repo"

export default class TodoOrm{
   
    public async create(tittle:string,content:string,userId:number): Promise<any> {
        try{
            const result=await db.todo.create({
                data:{
                    title:tittle,
                    content:content,
                    userId:userId,
                    isDone:false
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
    
    public async get(iduser:number): Promise<any> {
        try{
            const result=await db.todo.findMany({
                where:{
                    userId:iduser
                }
            })
            return result
        }catch(e: any){
            throw new Error(e)
        }
    }
}