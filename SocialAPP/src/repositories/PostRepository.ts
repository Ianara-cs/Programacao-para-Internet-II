import { DeleteResult } from "typeorm"
import { Post } from "../controllers/PostController"
import { AppDataSource } from "../database/data-source"
import { PostEntity } from "../entities/Post.Entity"

export class PostRespository {
    private repository = AppDataSource.getRepository(PostEntity)

    constructor() {
        this.repository 
    }

    async create(post :Post): Promise<Post> {
        const newPost = this.repository.create(post)
 
        await this.repository.save(newPost)

        return newPost  
    }

    async findAll(userId: string): Promise<Post[]> {
        const posts = await this.repository.find({relations: {
            user: true, 
        }, where: {user: {id: userId}}})
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