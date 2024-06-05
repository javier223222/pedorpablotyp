import IUserCreate from "../domain/interfaces/IUserCreate";
import UserOrm from "../domain/orm/UserOrm";
import IUserController from "./interfaces/IUserController";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()
export default class UserController implements IUserController{
   public async create(email: string, password: string, name: string, username: string): Promise<IUserCreate> {
      try{
        const userorm=new UserOrm()
        const result=await userorm.create({
            id:0,
            createdAt:new Date(),
            updatedAt:new Date(),
            email:email,
            password:bcrypt.hashSync(password,10),
            name:name,
            username:username,
        })
        return result

      }catch(e: any){
          throw new Error(e)
      }
       
   }
    public async update(id: number, email: string, password: string, name: string, username: string): Promise<IUserCreate> {
        try{
          const userorm=new UserOrm()
          const result=await userorm.update({
                id:id,
                createdAt:new Date(),
                updatedAt:new Date(),
                email:email,
                password:password,
                name:name,
                username:username,
          })
          return result
    
        }catch(e: any){
             throw new Error(e)
        }
         
    }
    public async login(email: string, password: string): Promise<string> {
        try{
          const userorm=new UserOrm()
          const result=await userorm.login(email,password)
          if(result){
             if(bcrypt.compareSync(password,result.password)){
                const token=jwt.sign({id:result.id},process.env.JWT_SECRET as string||"secret",{expiresIn:"1h"})
                return token
             }
              
             
          }

          throw new Error("Login Failed")
    
        }catch(e: any){
             throw new Error(e)
        }
    }
    public async get(id: number): Promise<string> {
        try{
          const userorm=new UserOrm()
          const result=await userorm.get(id)
          return result
    
        }catch(e: any){
             throw new Error(e)
        }
    }

}