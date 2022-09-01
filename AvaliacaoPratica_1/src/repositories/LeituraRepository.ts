import { AppDataSource } from "../database/data-source"
import { CreateLeituraDTO } from "../dtos/createLeituraDTO"
import { Leitura } from "../entities/Leitura"

export class LeituraRepository {
    private repository = AppDataSource.getRepository(Leitura)

    constructor() {
        this.repository
    }

    async addLeitura (leitura: CreateLeituraDTO): Promise<CreateLeituraDTO> {
        const newLeitura =  this.repository.create(leitura)

        await this.repository.save(newLeitura)

        return newLeitura
    }

    async listAllLeitura (): Promise<Leitura[]> {
        return this.repository.find({select: {}})
    }

    async findById (id: string) {
        const livro = await this.repository.findOne({where: {id}})
        return livro
    }

    async removeLeitura(id_livro: string) {
        const livro = await this.repository.delete(id_livro)
        return livro
    }
}