import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/UserRepository";

type JwtPayload = {
    email: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository()
    
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({mensagem: 'Acesso negado!'})
    }
    
    const [authType, authValue] = authorization.split(' ')

    if (authType === 'Basic'){
        let buff = Buffer.from(authValue, 'base64');
        let [email, senha] = buff.toString('ascii').split(':');
        console.log(email, senha)

        const user = await userRepository.findByEmail(email)

        if(!user) {
           return res.status(401).json({mensagem: 'Acesso negado!'})
        }

        const verifyPassword = await bcrypt.compare(senha, user.password)

        if(!verifyPassword) {
            return res.status(400).json({mensagem: 'Acesso negado'})
        }

        req.user = {
            id: user.id
        }
        
    }

    if(authType === 'Bearer') {
        const {email} = jwt.verify(authValue, process.env.JWT_PASSWORD) as JwtPayload

        const user = await userRepository.findByEmail(email)
    
        if(!user) {
            return res.status(401).json({mensagem: 'Acesso negado!'})
        }

        req.user = {
            id: user.id
        }
    }
    
    next()
}