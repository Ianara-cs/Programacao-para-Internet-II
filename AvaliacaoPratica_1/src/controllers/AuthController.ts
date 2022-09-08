import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { Request, Response } from "express"
import { CodigoValidacaoEmail } from '../entities/CodigoValidacaoEmail'
import { CodigoValidacaoTelefone } from '../entities/CodigoValidacaoTelefone'
import { UserRepository } from "../repositories/UserRepository"
import { generateToken, verifyToken } from '../Tokens/Token'
import { sendEmail } from '../utils/emails/sendEmail'
import { generateCodeNumber } from '../utils/util'

export class AuthController {

    constructor(
        private userRepository= new UserRepository(),
        private codigoTelefone = new CodigoValidacaoTelefone(),
        private codigoEmail = new CodigoValidacaoEmail()
    ){}

    signUp = async (req: Request, res: Response) => {
        const {name, email, password} = req.body

        const codigo = await this.userRepository.createCodigoEmail(email, 2)
        await sendEmail(email, codigo.codigo_de_validacao)
        
        const hashPassword = await bcrypt.hash(password, 8)
        
        const newUser = await this.userRepository.create({name, password: hashPassword, email})

        console.log(`Código de validação ${codigo.codigo_de_validacao}`)

        return res.status(201).json(newUser)
    }

    
    activateUser = async (req: Request, res: Response) => {
        const {code, email} = req.body
        
        const user = await this.userRepository.findByEmail(email)
        
        if(!user) {
            return res.status(400).json({mensagem: 'Email inválido!'})
        }
        
        const codeEmail = await this.userRepository.findByCodeEmail(email, code)
        
        if(!codeEmail) {
            return res.status(400).json({mensagem: 'Código inválido!'})
        }
        
        const codeExpired = dayjs().isAfter(dayjs.unix(codeEmail.expires_in))
        
        if(codeExpired) {
            return res.status(400).json({mensagem: 'Código expirado!'})
        }

        
        await this.userRepository.activateUser(user.id)
        return res.json({mensagem: "Conta ativada com sucesso!"})

    }

    reenviarCodigoEmail = async (req: Request, res: Response) => {
        const {email} = req.body

        await this.userRepository.deleteCodeEmail(email)

        const codigo = await this.userRepository.createCodigoEmail(email, 2)
        await sendEmail(email, codigo.codigo_de_validacao)

        console.log(`Código de validação ${codigo.codigo_de_validacao}`)
        return res.status(200).send("Código enviado")
    }

    enviarCodeTelefone = async (req: Request, res: Response) => {
        const {telefone } = req.body
        const {id} = req.user
        
        const telefoneAlreadyExists = await this.userRepository.findByTelefone(telefone)
        if(telefoneAlreadyExists) {
            return res.status(400).json({mensagem: "Telefone já registrado"})
        }

        const user = await this.userRepository.findById(id)
        if(user.conta_ativa === false) {
            return res.status(400).json({mensagem: "Conta desativada!"})
        }

        const code =  generateCodeNumber()
        await this.userRepository.addTelefoneCode(telefone, code)
        console.log(`Código de confimação --> ${code}`)
        return res.send(`Código enviado para o número ${telefone}`)
    
    }

    addTelefone = async (req: Request, res: Response) => {
        const {code, telefone, sms} = req.body
        const {id} = req.user

       const result = await this.userRepository.findByTelefoneCode(telefone, code)
       const user = await this.userRepository.findById(id)

       if(!result) {
        return res.status(400).json({mensagem: "Código inválido"})
       }
       
       if(sms == 'ok' ) {
           await this.userRepository.upadateTelefone(user.id, telefone)
           return res.json({mensagem: 'Telefone adicionado com sucesso'})
        }
        
        return res.status(400).json({mensagem: 'errr'})
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

        const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')
        const refreshToken = await generateToken({user_id: user.id, user_email: user.email}, '30d')
        await this.userRepository.updateRefreshToken(user.id, refreshToken)

        return res.json({user, token: accessToken, refreshToken})
    }
    
    refreshToken = async (req: Request, res: Response) => {
        const {refreshtoken} = req.body

        const expired = await verifyToken(refreshtoken)
        const user = await this.userRepository.findById(expired.payload.user_id)

        if(!user) {
            return res.status(400).json({mensagem: 'Token inválido'})
        }
        
        if(user.conta_ativa === false) {
            return res.status(400).json({mensagem: 'Conta desativada'})
        }

        if(expired.expired === true) {
            const refreshToken = await generateToken({payload: expired.paylaod}, '30d')
            await this.userRepository.updateRefreshToken(user.id, refreshToken)
            const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')
            return res.json({accessToken, refreshtoken})
        }
        
        const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')

        return res.json({accessToken})
    }
    

    
}