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

        const result = await this.userRepository.create({name, email, password})

        return res.json(result)
    }

    signIn = async (req: Request, res: Response) => {
        const {email, password} = req.body

        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            return res.status(400).json({mensagem: 'Usuário não existe!'})
        }

        if(user.email !== email || user.password !== password) {
            return res.status(400).json({mensagem: 'Email ou senha incorreto!'})
        }

        return res.json(user)
    }

}