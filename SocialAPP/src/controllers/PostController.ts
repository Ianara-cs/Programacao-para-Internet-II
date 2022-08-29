import { Request, Response } from "express";
import { PostRespository } from "../repositories/PostRepository";

export interface Post {
    id?: string
    post: string
    user_id?: string
}

export class PostController {
    constructor(private postRepository = new PostRespository()) {}

    createPost = async (req: Request, res: Response) => {
        const {id} = req.user
        const {post} = req.body
        
        const newPost = await this.postRepository.create({post, user_id: id})

        res.status(201).json(newPost)
    }

    listPosts = async (req: Request, res: Response) => {
        const {id} = req.body
        const {user} = req
        const posts = await this.postRepository.findAll(id)
        console.log(user)
        res.status(200).json(posts)
    }

    removePost = async (req: Request, res: Response) => {
        const {id} = req.body

        const post = await this.postRepository.findById(id)

        if(!post) {
            res.status(400).json({mensagem: "Post não existe"})
        }

        const result = await this.postRepository.remove(id)

        res.status(204).json(result)
        
    }
}