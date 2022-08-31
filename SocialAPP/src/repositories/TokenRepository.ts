import dayjs from "dayjs";
import jwt from 'jsonwebtoken';
import { AppDataSource } from "../database/data-source";
import { RefreshToken } from "../entities/RefreshToken";

export class TokenRepository {
    private repository = AppDataSource.getRepository(RefreshToken)

    constructor() {
        this.repository 
    }

    generateRefreshToken = async (userId: string) => {
        const expiresIn = dayjs().add(30, "days").unix()

        const refleshToken = this.repository.create({
            userId, expiresIn
        })

        await this.repository.save(refleshToken)

        return refleshToken
    }

    generateToken = async (userId: string) => {
        const token = jwt.sign({id: userId}, process.env.JWT_PASSWORD, {
            expiresIn: '1h'
        })

        return token
    }

    findById = async (id: string) => {
        const refleshToken = await this.repository.findOne({where: {
            id
        }})

        return refleshToken
    }

    deleteRefreshToken = async (userId: string) => {
        await this.repository.delete({userId})
    }
}