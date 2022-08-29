import dayjs from "dayjs";
import { Request, Response } from "express";
import { RefleshTokenRepository } from "../repositories/TokenRepository";

export class RefleshTokenController {
    constructor(private refleshTokenRepository = new RefleshTokenRepository()) {}

    generateTokenByreflashtoken = async (req: Request, res: Response) => {
        const {reflesh_token} = req.body

        const refleshToken = await this.refleshTokenRepository.findById(reflesh_token)
        
        console.log(refleshToken)
        console.log(reflesh_token)
        if(!refleshToken) {
            return res.status(404).json({mensagem: "Reflesh Token inválido"})
        }
        
        const refleshTokenExpired = dayjs().isAfter(dayjs.unix(refleshToken.expiresIn))
        const token = await this.refleshTokenRepository.generateToken(refleshToken.userId)

        if(refleshTokenExpired) {
            await this.refleshTokenRepository.delete(refleshToken.userId)

            const newResleshToken = await this.refleshTokenRepository.generateRefleshToken(refleshToken.userId)

            return res.json({token, refleshToken: newResleshToken})
        }

        return res.status(200).json({token: token})
    }
}