import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken } from '../../Tokens/Token'
import { UserRepository } from "../repositories/UserRepository"

export class AuthController {

    constructor(private userRepository= new UserRepository()){}

    signUp = async (req: Request, res: Response) => {
        const {name, login, telefone, password} = req.body

        const hashPassword = await bcrypt.hash(password, 8)

        const result = await this.userRepository.create({name, login, telefone, password: hashPassword})

        return res.json(result)
    }

    signIn = async (req: Request, res: Response) => {
        const {login, password} = req.body

        const user = await this.userRepository.findByUsername(login)

        if(!user) {
            return res.status(400).json({mensagem: 'Username ou senha inválidos!'})
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) {
            return res.status(400).json({mensagem: 'Username ou senha inválidos!'})
        }

        const accessToken = await generateAccessToken(user.id)
        const refreshToken = await generateRefreshToken(user.id)
        await this.userRepository.updateRefreshToken(user.id, refreshToken)

        return res.json({user, token: accessToken, refreshToken})
    }

    

    
}