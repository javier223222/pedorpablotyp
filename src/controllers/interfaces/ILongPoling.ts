import {Response} from "express"
//interfaz para el long poling
//res:Response guarda la respuesta
//id:number guarda el id del usuario


export default interface ILongPoling {
    res:Response,
    id:number
}