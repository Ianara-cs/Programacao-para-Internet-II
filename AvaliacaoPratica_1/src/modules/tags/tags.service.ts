import { inject, injectable } from "tsyringe";
import { ITagsRepository } from "./repositories/ITagsRepository";

@injectable()
export class TagsService {
    constructor(
        @inject("TagsRepository")
        private tagsRepository: ITagsRepository
    ) {}

    async getTag(tags: JSON) {

        const tagAlreadyExist = Object.keys(tags).map(async(key) => {
            const tag = await this.tagsRepository.getTag(tags[key])
            
            if (!tag) {
                throw new Error("tag not exist!")
            }
            return tag
        })


        return tags
    }
}