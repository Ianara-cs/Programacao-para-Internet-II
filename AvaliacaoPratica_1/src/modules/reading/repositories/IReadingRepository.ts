import { ICreateReadingDTO } from "../dtos/createReadingDTO"
import { Reading } from "../entities/Reading"

export interface IReadingRepository {
    createReading(data: ICreateReadingDTO): Promise<Reading>
    //listAllReading(): Promise<Reading[]>
    findById(id: string): Promise<Reading>
    removeReading(id: string): Promise<boolean>
}