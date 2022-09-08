import dayjs from 'dayjs';
import { AppDataSource } from "../database/data-source";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { CodigoValidacaoEmail } from "../entities/CodigoValidacaoEmail";
import { CodigoValidacaoTelefone } from "../entities/CodigoValidacaoTelefone";
import { User } from "../entities/User";
import { generateCodeNumber } from "../utils/util";

interface IResponse {
    id?: string
    name: string
    email: string
    conta_ativa: boolean
}

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User)
    private codigoTelefone = AppDataSource.getRepository(CodigoValidacaoTelefone)
    private codigoEmail = AppDataSource.getRepository(CodigoValidacaoEmail)
    

    constructor() {
        this.userRepository
        this.codigoTelefone
        this.codigoEmail
    }

    async create(user: CreateUserDTO): Promise<IResponse> {
       const newUser =  this.userRepository.create(user)

        await this.userRepository.save(newUser)

        return newUser
    }

    async activateUser (userId: string) {
        await this.userRepository.update(userId, {conta_ativa: true})
        return true
    }

    async findById(id: string): Promise<IResponse| undefined> {
        const user = await this.userRepository.findOne({where: {
            id
        }})

        return user
    }

    async findByEmail(email: string): Promise<CreateUserDTO| undefined> {
        const user = await this.userRepository.findOne({where: {
            email
        }})

        return user
    }

    async findByTelefone (telefone: string) {
        const user = await this.userRepository.findOne({where: {
            telefone
        }})
        return user
    }

    async updateRefreshToken (user_id: string, refresh_token: string) {
        const user = await this.userRepository.update(user_id, {refresh_token})
        return user
    }

    async createCodigoEmail (email: string, expire: number) {
        
        const codigo_de_validacao = generateCodeNumber()
        const expires_in = dayjs().add(expire, "hours").unix()
        
        const code = this.codigoEmail.create({codigo_de_validacao, user_email: email, expires_in: expires_in})
        await this.codigoEmail.save(code)
        return code
    }

    async findByCodeEmail (email: string, code: number) {
        return await this.codigoEmail.findOne({where: {user_email: email, codigo_de_validacao: code}})

    }

    async deleteCodeEmail (user_email: string) {
       return await this.codigoEmail.delete({user_email})
    }

    async findByTelefoneCode (telefone: string, code: number) {
        return await this.codigoTelefone.findOne({where: {telefone, codigo_de_validacao: code}})
    }

    async addTelefoneCode (telefone: string, code: number) {
        const fone = this.codigoTelefone.create({telefone, codigo_de_validacao: code})
        await this.codigoTelefone.save(fone)
        return fone
    }

    async upadateTelefone (user_id: string, telefone: string) {
        const user = await this.userRepository.update(user_id, {telefone})
        return user
    }

}