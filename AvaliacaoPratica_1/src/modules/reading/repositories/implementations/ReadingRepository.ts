import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { User } from "../../../auth/entities/User";
import { ICreateReadingDTO } from "../../dtos/createReadingDTO";
import { Reading } from "../../entities/Reading";
import { IReadingRepository } from "../IReadingRepository";

export class ReadingRepository implements IReadingRepository {
    private readingRepsoitory : Repository<Reading>

    constructor() {
        this.readingRepsoitory = AppDataSource.getRepository(Reading)
    }

    async createReading(user: User, {subtitulo, titulo, tags}: ICreateReadingDTO): Promise<Reading> {
        const newLeitura =  this.readingRepsoitory.create({
            subtitulo,
            titulo,
            tags,
            user
        })

        await this.readingRepsoitory.save(newLeitura)

        return newLeitura
    }

    async findAllReading(): Promise<Reading[]> {
        const readings = await this.readingRepsoitory.find({relations: {
            user: true
        }})

        return readings
    }
    
    async findById(id: string): Promise<Reading> {
        const livro = await this.readingRepsoitory.findOne({
            where: {id}, 
            relations: {user: true}
        })
        return livro
    }

    async removeReading(readingId: string): Promise<boolean> {
        await this.readingRepsoitory.delete({id: readingId})
        return true
    }

}