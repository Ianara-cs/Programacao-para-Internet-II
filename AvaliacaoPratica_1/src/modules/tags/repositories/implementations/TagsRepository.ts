import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Tag } from "../../entities/Tag";
import { ITagsRepository } from "../ITagsRepository";

export class TagsRepository implements ITagsRepository {
    private tagsRepository: Repository<Tag>
    constructor() {
        this.tagsRepository = AppDataSource.getRepository(Tag)
    }

    async create(name: string): Promise<Tag> {
        const tag = this.tagsRepository.create({name})

        await this.tagsRepository.save(tag)

        return tag
    }

    async getTag(name: string): Promise<Tag> {
        const tag = await this.tagsRepository.findOne({where: {name}})
        return tag
    }
}