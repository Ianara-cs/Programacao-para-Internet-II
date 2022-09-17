import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { UserService } from './auth.service';

@injectable()
export class UserController {
    async singUp (req: Request, res: Response): Promise<Response> {
        const {name, email, password} = req.body
        const userService = container.resolve(UserService)

        await userService.signUp({name, email, password})

        return res.status(201).send()
    }

    async activateAccount (req: Request, res: Response): Promise<Response> {
        const {code, email} = req.body

        const userService = container.resolve(UserService)

        await userService.activerAccount(email, code)

        return res.status(204).json({messege: "OK"})
    }

    async reenviarCodigoEmail (req: Request, res: Response) : Promise<Response> {
        const {email} = req.body

        const userService = container.resolve(UserService)
        await userService.sendEmailCode(email)
        
        return res.status(200).json({messege: "Código enviado"})
    }

    async signIn (req: Request, res: Response) : Promise<Response> {
        const {email, password} = req.body

        const userService = container.resolve(UserService)
        const result = await userService.signIn(email, password)
        return res.status(200).json({accessToken: result.accessToken, refreshToken: result.refreshToken})
    }

    async sendPhoneCode(req: Request, res: Response) {
        const {telefone } = req.body
        const {userId: id} = req.user

        const userService = container.resolve(UserService)
        await userService.addTelefone(telefone, id)
        return res.status(200).send(`Código enviado para o número ${telefone}`)
    }

    async addTelefone(req: Request, res: Response) {
        const {code, telefone, sms} = req.body
        const {userId: id} = req.user

        const userService = container.resolve(UserService)
        await userService.confirmarTelefone(code, telefone, sms, id)
        return res.json({mensagem: 'Telefone adicionado com sucesso'})
    }

    async refreshToken(req: Request, res: Response) {
        const {refreshtoken} = req.body

        const userService = container.resolve(UserService)
        const token = await userService.refreshToken(refreshtoken)
        return res.status(200).json(token)
    }
}