import { container, inject, injectable } from "tsyringe";
import { IUsersRepository } from "../auth/repositories/IUsersRepository";
import { TagsService } from "../tags/tags.service";
import { ICreateReadingDTO } from "./dtos/createReadingDTO";
import { IReadingRepository } from "./repositories/IReadingRepository";

@injectable()
export class ReadingService {
    constructor(
        @inject("ReadingRepository")
        private readingRepository: IReadingRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) {}

    async addReading (userId: string, {titulo, subtitulo, tags}: ICreateReadingDTO) {
        const user = await this.usersRepository.findById(userId)
        const tagsService = container.resolve(TagsService)

        const tagsValidation = await tagsService.getTag(tags)

        const reading = await this.readingRepository.createReading(user ,{titulo, subtitulo, tags: tagsValidation})

        return reading
    }
}