import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import { UserRepository } from "../repositories/UserRepository"

export class AuthController {

    constructor(private userRepository= new UserRepository()){}

    signUp = async (req: Request, res: Response) => {
        const {name, login, telefone, password} = req.body

        const hashPassword = await bcrypt.hash(password, 8)

        const result = await this.userRepository.create({name, login, telefone, password: hashPassword})

        return res.json(result)
    }
}