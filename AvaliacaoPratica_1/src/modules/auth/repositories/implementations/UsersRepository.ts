import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database/data-source';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from "../../entities/User";
import { IResponse, IUsersRepository } from '../IUsersRepository';


export class UsersRepository implements IUsersRepository {
    private userRepository : Repository<User>

    constructor () {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async create(data: ICreateUserDTO): Promise<IResponse> {
        const newUser =  this.userRepository.create(data)

        await this.userRepository.save(newUser)

        return newUser
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {
            email
        }})

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {
            id
        }})

        return user
    }

    async findUserByTelefone (telefone: string) {
        const user = await this.userRepository.findOne({where: {
            telefone
        }})
        return user
    }

    async updateAccountStatus (userId: string) {
        await this.userRepository.update(userId, {conta_ativa: true})
        return true
    }

    async updatePhone(userId: string, telefone: string): Promise<boolean> {
        await this.userRepository.update(userId, {telefone})
        return true
    }

    async updateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        const user = await this.userRepository.update(userId, {refresh_token: refreshToken})
        return user.raw
    }
    
}