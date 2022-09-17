import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { ICreateReadingDTO } from "../../dtos/createReadingDTO";
import { Reading } from "../../entities/Reading";
import { IReadingRepository } from "../IReadingRepository";

export class ReadingRepository implements IReadingRepository {
    private readingRepsoitory : Repository<Reading>

    constructor() {
        this.readingRepsoitory = AppDataSource.getRepository(Reading)
    }

    async createReading(data: ICreateReadingDTO): Promise<Reading> {
        const newLeitura =  this.readingRepsoitory.create(data)

        await this.readingRepsoitory.save(newLeitura)

        return newLeitura
    }

    //async listAllReading(): Promise<Reading[]> {}
    
    async findById(id: string): Promise<Reading> {
        const livro = await this.readingRepsoitory.findOne({where: {id}})
        return livro
    }

    async removeReading(id: string): Promise<boolean> {
        const livro = await this.readingRepsoitory.delete(id)
        return true
    }

}