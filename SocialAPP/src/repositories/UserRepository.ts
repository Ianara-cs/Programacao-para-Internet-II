import { User } from "../controllers/AuthController";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../entities/User.Entity";

export class UserRepository {
    private repository = AppDataSource.getRepository(UserEntity)

    constructor() {
        this.repository
    }

    async create(user: User): Promise<User> {
       const newUser =  this.repository.create(user)

        await this.repository.save(newUser)

        return newUser
    }

    async findByEmail(email: string): Promise<User| undefined> {
        const user = await this.repository.findOne({where: {
            email: email
        }})

        return user
    }

    async findById(id: string): Promise<User| undefined> {
        const user = await this.repository.findOne({where: {
            id
        }})

        return user
    }

    async update(id:string, newpassword: string) {
        const user = await this.repository.update(id, {password: newpassword})
        return user
    }
}