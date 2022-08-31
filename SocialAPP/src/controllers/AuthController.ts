import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from "../repositories/UserRepository";
import { validarPassword } from '../utils/validarPassword';

export interface User {
    id?: string
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

        const genereteRefreshToken = new TokenRepository()
        const token = await genereteRefreshToken.generateToken(user.id)
        await genereteRefreshToken.deleteRefreshToken(user.id)
        const refreshToken = await genereteRefreshToken.generateRefreshToken(user.id)
        

        return res.json({user, refleshToken: refreshToken, token})
    }

    mudarSenha = async (req: Request, res: Response) => {
        const {newpassword} = req.body
        const {id} = req.user

        const verificarSenha = await validarPassword(newpassword)

        if(verificarSenha === false) {
            return res.status(400).json({
                mensagem: "A senha deve ter pelo menos 4 caracteres, um número, uma caractere especial e uma letra maiúscula"
            })
        }

        const user = await this.userRepository.findById(id)

        const hashPassword = await bcrypt.hash(newpassword, 8)

        await this.userRepository.update(user.id, hashPassword)

        return res.status(200).send()

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