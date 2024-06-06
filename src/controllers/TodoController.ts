import TodoOrm from "../domain/orm/TodoOrm";
import ITodo from "./interfaces/ITodo";
import { ITodoController } from "./interfaces/ITodoController";
import ITodoPagination from "../domain/interfaces/ITodoPagination";
export default class TodoController implements ITodoController{
    public async create(ITodo: ITodo): Promise<ITodo> {
        try{
            const todoorm:TodoOrm=new TodoOrm()
            const result=await todoorm.create(ITodo)
            return result


        }
        catch(e: any){
            throw new Error(e)
        }
    }
    
    public async get(id: number, page?: number | undefined, limit?: number | undefined): Promise<ITodo[]|ITodoPagination> {
        try{
            if(page===undefined||limit===undefined){
                const todoorm:TodoOrm=new TodoOrm()
                const result=await todoorm.get(id)
                return result
            }
            const todoorm:TodoOrm=new TodoOrm()
            const result=await todoorm.get(id,page,limit)
            return result
        }
        catch(e: any){
            throw new Error(e)
        }
    }
   public async update(ITodo: ITodo): Promise<ITodo> {
        try{
         
            const todoorm:TodoOrm=new TodoOrm()
            const result=await todoorm.update(ITodo.idtodo,ITodo.tittle,ITodo.content)
            return result
        }catch(e: any){
            throw new Error(e)
        }
    }
    public async delete(id: number): Promise<ITodo> {
        try{
            const todoorm:TodoOrm=new TodoOrm()
            const result=await todoorm.delete(id)
            return result

        }catch(e: any){
            throw new Error(e)
        }

    }
    public async changedone(id: number, isdone: boolean): Promise<ITodo> {
        try{
            const todoorm:TodoOrm=new TodoOrm()
            const result=await todoorm.changedone(id,isdone)
            return result
        }
        catch(e: any){
            throw new Error(e)
        }
    }
}