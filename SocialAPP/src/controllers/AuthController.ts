import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export interface User {
    email: string
    password: string
    name: string
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

        return res.json(user)
    }

}