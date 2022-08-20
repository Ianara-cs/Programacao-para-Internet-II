import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const postRoutes =Router()

const postController = new PostController()

postRoutes.post('/create', postController.createPost)
postRoutes.get('/list', postController.listPosts)
postRoutes.delete('/remove', postController.removePost)

export { postRoutes }

