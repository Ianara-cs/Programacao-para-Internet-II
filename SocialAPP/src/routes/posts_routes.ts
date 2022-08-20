import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { authMiddleware } from '../middlewares/auth_middleware'

const postRoutes =Router()

const postController = new PostController()

postRoutes.use(authMiddleware)
postRoutes.post('/create', postController.createPost)
postRoutes.get('/list', postController.listPosts)
postRoutes.delete('/remove', postController.removePost)

export { postRoutes }

