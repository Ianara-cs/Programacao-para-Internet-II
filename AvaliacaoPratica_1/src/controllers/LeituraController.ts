import { Request, Response } from "express"
import { LeituraRepository } from "../repositories/LeituraRepository"

export class LeituraController {
    constructor(private leituraRepository = new LeituraRepository()) {}
    
    addLeitura = async (req: Request, res: Response) => {
        const {titulo, subtitulo, tags} = req.body
        const {id} = req.user

        const result = await this.leituraRepository.addLeitura({titulo, subtitulo, tags, user_id: id})

        return res.json(result)
    }

    listAllLeitura = async (req: Request, res: Response) => {
        
        const leituras = this.leituraRepository.listAllLeitura()

        return res.json(leituras)
    }

    removeLeitura = async (req: Request, res: Response) => {
        const {id} = req.user
        const {id_livro} = req.params

        const livro = await this.leituraRepository.findById(id_livro)

        if(livro.user_id !== id) {
            return res.status(400).json({mensagem: "Erro ao remover"})
        }

        await this.leituraRepository.removeLeitura(id_livro)
        return res.status(204).send()
    }

}