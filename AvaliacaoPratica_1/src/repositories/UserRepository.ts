import { AppDataSource } from "../database/data-source";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { CodigoValidacaoTelefone } from "../entities/CodigoValidacaoTelefone";
import { User } from "../entities/User";

interface IResponse {
    id?: string
    name: string
    email: string
    conta_ativa: boolean
    codigo_de_validacao: number
    expires_in: number
}

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User)
    private codigoTelefone = AppDataSource.getRepository(CodigoValidacaoTelefone)
    

    constructor() {
        this.userRepository
        this.codigoTelefone
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

    async findByTelefoneCode (telefone: string, code: number) {
        const result = await this.codigoTelefone.findOne({where: {telefone}})
        return result
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