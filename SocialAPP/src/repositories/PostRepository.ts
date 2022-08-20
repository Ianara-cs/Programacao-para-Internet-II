import { DeleteResult } from "typeorm"
import { Post } from "../controllers/PostController"
import { AppDataSource } from "../data-source"
import { PostEntity } from "../entities/Post.Entity"

export class PostRespository {
    private repository = AppDataSource.getRepository(PostEntity)

    constructor() {
        this.repository 
    }

    async create(post: Post): Promise<Post> {
        const newPost = this.repository.create(post)
 
        await this.repository.save(post)
 
        return newPost
    }

    async list(id: string): Promise<Post[]> {
        const posts = await this.repository.find({where: {id}})
        return posts 
    }

    async remove(id: string): Promise<DeleteResult> {
        const post = await this.repository.delete({id})
        return post
    }

    async findById(id: string) {
        const post = await this.repository.findOne({where: {id}})
        return post 
    }
    
}