import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export const existEmail = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository()
    const {email} = req.body

    const user = await userRepository.findByEmail(email)

    if(user) {
        return res.status(400).json({mensagem: 'Um usuário com este email já existe'})
    }

    next()
}