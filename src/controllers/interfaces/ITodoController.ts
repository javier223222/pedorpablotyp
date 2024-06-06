import ITodoPagination from "../../domain/interfaces/ITodoPagination";
import ITodo from "./ITodo";

export interface ITodoController {
    create(ITodo:ITodo): Promise<ITodo>
    get(id:number,page?:number,limit?:number): Promise<Array<ITodo>|ITodoPagination>
    update(ITodo:ITodo): Promise<ITodo>
    delete(id:number): Promise<ITodo>
    changedone(id:number,isdone:boolean): Promise<ITodo>
    
}