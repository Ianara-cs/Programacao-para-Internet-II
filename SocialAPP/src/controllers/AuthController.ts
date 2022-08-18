import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/UserRepository";

export interface User {
    id?: string,
    email: string
    password: string
    name: string
}

type JwtPayload = {
    email: string
}

export class AuthController {
    
    constructor(private userRepository= new UserRepository()){}
    
    signUp = async (req: Request, res: Response) => {
        const {name, email, password} = req.body

        const user = await this.userRepository.findByEmail(email)

        if(user) {
            return res.status(400).json({mensagem: 'Usuário já existe!'})
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const result = await this.userRepository.create({name, email, password: hashPassword})

        return res.json(result)
    }

    signIn = async (req: Request, res: Response) => {
        const {email, password} = req.body

        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            return res.status(400).json({mensagem: 'Email ou senha inválidos!'})
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) {
            return res.status(400).json({mensagem: 'Email ou senha inválidos!'})
        }

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_PASSWORD, {
            expiresIn: '1h'
        })


        return res.json({user, token})
    }

    me = async (req: Request, res: Response) => {
        const {authorization} = req.headers

        if(!authorization) {
            return res.status(401).json({mensagem: 'Acesso negado!'})
        }
        
        const token = authorization.split(' ')[1]
        
        const {email} = jwt.verify(token, process.env.JWT_PASSWORD) as JwtPayload
        
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            return res.status(500).json({mensagem: 'Acesso negado!'})
        }
        
        return res.json(user)


    }

}