import { User } from "../../auth/entities/User"
import { ICreateReadingDTO } from "../dtos/createReadingDTO"
import { Reading } from "../entities/Reading"

export interface IReadingRepository {
    createReading(user: User ,data: ICreateReadingDTO): Promise<Reading>
    findAllReading(): Promise<Reading[]>
    findById(id: string): Promise<Reading>
    removeReading(readingId: string): Promise<boolean>
}