import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


declare global {
    namespace Express {
        export interface Request {
            userId  : string
        }
    }
}


export async function AuthMiddleWare(req : Request, res : Response, next : NextFunction){
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];

    if(!token){
        console.log("unauthorized ", token)
        res.status(403).json({
            message : "UnAuthourized"
        })
        return
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if(typeof decoded === "string" || typeof decoded.sub === "string"){
        res.status(403).json({
            message : "Token is Invalid"
        })
        return
    }
    console.log(decoded)

    //@ts-ignore
   req.userId = decoded.userId

   next();
}