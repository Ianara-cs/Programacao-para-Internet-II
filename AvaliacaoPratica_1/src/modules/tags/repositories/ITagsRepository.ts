import { Tag } from "../entities/Tag";

export interface ITagsRepository {
    create(name: string): Promise<Tag>
    getTag(name: string): Promise<Tag>
}