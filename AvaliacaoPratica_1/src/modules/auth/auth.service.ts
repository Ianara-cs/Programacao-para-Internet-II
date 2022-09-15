import bcrypt, { hash } from 'bcrypt';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { generateToken, verifyToken } from '../../Tokens/Token';
import { generateCodeNumber } from '../../utils/util';
import { ICreateUserDTO } from './dtos/ICreateUserDTO';
import { IEmailCodeRepository } from './repositories/IEmailCodeRepository';
import { IPhoneCodeRepository } from './repositories/IPhoneCodeRepository';
import { IUsersRepository } from './repositories/IUsersRepository';

@injectable()
export class UserService {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("EmailCodeRepository")
        private emailCodeRepository: IEmailCodeRepository,
        @inject("PhoneCodeRepository")
        private phoneCodeRepository: IPhoneCodeRepository
        
    ) {}

    async signUp ({name, email, password}: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)
        
        await this.usersRepository.create({
            name, email, password: passwordHash
        })
        
        const codigo = await this.sendEmailCode(email)
        
        console.log(`Código de validação ${codigo.codigo_de_validacao}`)
    }

    async activerAccount (email: string, code: number) {
        const user = await this.usersRepository.findByEmail(email)
        
        if(!user) {
            throw new Error("Email inválido")
        }

        const codeEmail = await this.emailCodeRepository.findByEmail(email)
        
        if(!codeEmail) {
            throw new Error("Código inválido")
        }
        
        const codeExpired = dayjs().isAfter(dayjs.unix(codeEmail.expires_in))
        
        if(codeExpired) {
            throw new Error("Código expirado")
        }

        const result = await this.usersRepository.updateAccountStatus(user.id)
        return result
    }

    async sendEmailCode (email: string) {
        const code = await this.emailCodeRepository.findByEmail(email)

        if (!code) {
            return await this.emailCodeRepository.createCodigoEmail(email, 2)
        }

        await this.emailCodeRepository.deleteCodeEmail(email)

        const newCode =  await this.emailCodeRepository.createCodigoEmail(email, 2)
        console.log(`Código de validação ${newCode.codigo_de_validacao}`)
        return newCode
    }

    async signIn (email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new Error("Email ou senha inválido")
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) {
            throw new Error("Email ou senha inválido")
        }

        const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')
        const refreshToken = await generateToken({user_id: user.id, user_email: user.email}, '30d')
        await this.usersRepository.updateRefreshToken(user.id, refreshToken)
        return { accessToken, refreshToken}
    }

    async addTelefone(telefone: string, userId: string) {
        const telefoneAlreadyExists = await this.usersRepository.findUserByTelefone(telefone)
        if(telefoneAlreadyExists) {
            throw new Error("Telefone já registrado")
        }

        const user = await this.usersRepository.findById(userId)
        if(user.conta_ativa === false) {
            throw new Error("Conta desativada!")
        }

        const code =  generateCodeNumber()
        await this.phoneCodeRepository.addPhoneCode(telefone, code)
        console.log(`Código é ${code}`)
        return true
    }

    async confirmarTelefone(code: number, telefone: string, sms: string, id: string) {

        const result = await this.phoneCodeRepository.findByTelefoneCode(telefone, code)
        const user = await this.usersRepository.findById(id)

        if(!result) {
            throw new Error("Código inválido")
        }
           
        if(sms == 'ok' ) {
            await this.usersRepository.updatePhone(user.id, telefone)
            return true
        }

        throw new Error("Erro")
    }

    async refreshToken (token: string) {
        const expired = await verifyToken(token)
        const user = await this.usersRepository.findById(expired.payload.user_id)

        if(!user) {
            throw new Error("Token inválido")
        }
        
        if(user.conta_ativa === false) {
            throw new Error("Conta desativada")
        }

        if(expired.expired === true) {
            const refreshToken = await generateToken({payload: expired.paylaod}, '30d')
            await this.usersRepository.updateRefreshToken(user.id, refreshToken)
            const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')
            return {accessToken, refreshToken}
        }
        
        const accessToken = await generateToken({user_id: user.id, user_email: user.email}, '1h')
        return {accessToken}
    }
}