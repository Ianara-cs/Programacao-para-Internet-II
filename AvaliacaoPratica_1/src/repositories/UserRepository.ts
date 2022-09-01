import { AppDataSource } from "../database/data-source";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { User } from "../entities/User";

export class UserRepository {
    private repository = AppDataSource.getRepository(User)

    constructor() {
        this.repository
    }

    async create(user: CreateUserDTO): Promise<CreateUserDTO> {
       const newUser =  this.repository.create(user)

        await this.repository.save(newUser)

        return newUser
    }

    async findById(id: string): Promise<CreateUserDTO| undefined> {
        const user = await this.repository.findOne({where: {
            id
        }})

        return user
    }

    /*async update(id:string, newpassword: string) {
        const user = await this.repository.update(id, {password: newpassword})
        return user
    }*/
}