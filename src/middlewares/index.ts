import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token =  req.header("x-access-token")||"s";
        if (!token) {
            throw new Error("Token not provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        next();
    } catch (e: any) {
        res.status(401).json({ message: "nno autorizado" });
    }
}

export const getDecodedToken = (token:string):any => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string,(err,decoded)=>{
            if(err){
                throw new Error("Invalid Token")
            }
            return decoded
        });
      
    } catch (e: any) {
        return null;
    }

}
export const getToekndata=async(token:string):Promise<any>=>{
    let data=null
    jwt.verify(token,`${process.env.JWT_SECRET}`,(err,decoded)=>{
        if(err){
            console.log("error al obtener el token",err.message)
        }else{
            data=decoded
        }
    })
    return data
}