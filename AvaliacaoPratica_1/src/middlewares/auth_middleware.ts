import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UsersRepository } from "../modules/auth/repositories/implementations/UsersRepository";

type JwtPayload = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {    
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({mensagem: 'Acesso negado!'})
    }
    
    const [authType, authValue] = authorization.split(' ')


    try {
        const {id: user_id} = jwt.verify(authValue, process.env.JWT_PASSWORD) as JwtPayload

        const userRepository = new UsersRepository()
        const user = userRepository.findById(user_id)

        if(!user) {
            return res.status(401).json({mensagem: 'Acesso negado!'})
        }

        req.user = {
            userId: user_id
        }
        
        next()
    } catch (error) {
        return res.status(400).json({mensagem: 'Token Inválido'})
    }
}