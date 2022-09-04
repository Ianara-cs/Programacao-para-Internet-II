import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { Request, Response } from "express"
import { generateAccessToken, generateRefreshToken } from '../../Tokens/Token'
import { UserRepository } from "../repositories/UserRepository"
import { sendEmail } from '../utils/emails/sendEmail'
import { generateCodeNumber } from '../utils/util'

export class AuthController {

    constructor(private userRepository= new UserRepository()){}

    signUp = async (req: Request, res: Response) => {
        const {name, email, login, telefone, password} = req.body

        const codeNumber = generateCodeNumber()
        const expires_in = dayjs().add(2, "hours").unix()
        sendEmail(email, codeNumber)
        
        const hashPassword = await bcrypt.hash(password, 8)
        
        const newUser = await this.userRepository.create({
            name, login, telefone, password: hashPassword, email, codigo_de_validacao: codeNumber, expires_in
        })

        return res.json(newUser)
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

    activateUser = async (req: Request, res: Response) => {
        const {code, email} = req.body
        
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            return res.status(400).json({mensagem: 'Email inválido!'})
        }

        const codeExpired = dayjs().isAfter(dayjs.unix(user.expires_in))
        
        if(codeExpired) {
            return res.status(400).json({mensagem: 'Código expirado!'})
        }

        if(user.codigo_de_validacao != code) {
            return res.status(400).json({mensagem: 'Código inválido!'})
        }
        
        await this.userRepository.activateUser(user.id)
        return res.json({mensagem: "Conta ativada com sucesso!"})

    }

    

    
}