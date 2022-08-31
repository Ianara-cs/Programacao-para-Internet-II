import dayjs from "dayjs";
import { Request, Response } from "express";
import { TokenRepository } from "../repositories/TokenRepository";

export class RefreshTokenController {
    constructor(private refleshTokenRepository = new TokenRepository()) {}

    generateTokenByRefreshToken = async (req: Request, res: Response) => {
        const {reflesh_token} = req.body

        const refleshToken = await this.refleshTokenRepository.findById(reflesh_token)
        
        if(!refleshToken) {
            return res.status(404).json({mensagem: "Reflesh Token inválido"})
        }
        
        const refleshTokenExpired = dayjs().isAfter(dayjs.unix(refleshToken.expiresIn))
        const token = await this.refleshTokenRepository.generateToken(refleshToken.userId)

        if(refleshTokenExpired) {
            await this.refleshTokenRepository.deleteRefreshToken(refleshToken.userId)

            const newRefleshToken = await this.refleshTokenRepository.generateRefreshToken(refleshToken.userId)

            return res.json({token, refleshToken: newRefleshToken})
        }

        return res.status(200).json({token: token})
    }
}