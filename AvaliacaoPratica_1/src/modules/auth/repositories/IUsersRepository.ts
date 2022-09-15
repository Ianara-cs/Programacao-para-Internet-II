import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IResponse {
    id?: string
    name: string
    email: string
    conta_ativa: boolean
}

export interface IUsersRepository {
    create (data: ICreateUserDTO): Promise<IResponse>
    findByEmail (email: string): Promise<User>
    findById (id: string): Promise<User>
    findUserByTelefone (telefone: string): Promise<User>
    updateAccountStatus (userId: string): Promise<boolean>
    updatePhone (userId: string, telefone: string): Promise<boolean>
    updateRefreshToken (userId: string, refreshToken: string): Promise<boolean>
}