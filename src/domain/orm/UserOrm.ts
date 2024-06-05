import IUser from "../interfaces/IUser";
import IUserCreate from "../interfaces/IUserCreate";
import IUserOrm from "../interfaces/IUserOrm";
import { db } from "../repositories/mysql.repo";
export default class UserOrm implements IUserOrm {
   public async  create(IUser: IUser): Promise<IUserCreate> {
    try{
        const result=await db.user.create({
            data:{
                email:IUser.email,
                password:IUser.password,
                name:IUser.name,
                username:IUser.username
            }
        })
        return {
            id:result.id,
           
            name:result.name,
            username:result.username,
            createdAt:result.createdAt,
            updatedAt:result.updatedAt
        }

    }catch(e: any){
        throw new Error(e)
    
        
    }
}
   public async  update(IUser: IUser): Promise<IUserCreate> {
    try{
        const result=await db.user.update({
            where:{
                id:IUser.id
            },
            data:{
                
                name:IUser.name,
                
            }
        })
        return {
            
            id:result.id,
            name:result.name,
            username:result.username,
            createdAt:result.createdAt,
            updatedAt:result.updatedAt
        }
    }catch(e: any){
        throw new Error(e)
    }
        
    }
    public async login(email: string, password: string): Promise<any> {
        try{
            const result=await db.user.findFirst({
                where:{
                    email:email,
                    
                }
            })
            return result as IUserCreate
        }catch(e: any){
            throw new Error(e)
        }
    }
    public async get(id: number): Promise<string> {
        try{
            const result=await db.user.findFirst({
                where:{
                    id:id
                }
            })
            return result?.name as string
        }catch(e: any){
            throw new Error(e)
        }
    }
}
