import { Request, Response } from "express";
import { PostRespository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "./AuthController";

export interface Post {
    id?: string
    post: string
    user: User
}

export class PostController {
    private userRepository = new UserRepository()

    constructor(
        private postRepository = new PostRespository(),
    ) {}

    createPost = async (req: Request, res: Response) => {
        const {id} = req.user
        const {post} = req.body

        const user = await this.userRepository.findById(id)
        console.log(user.id)
        
        const newPost = await this.postRepository.create({post, user})

        res.status(201).json(newPost)
    }

    listPosts = async (req: Request, res: Response) => {
        const {id} = req.user
        const posts = await this.postRepository.findAll(id)
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