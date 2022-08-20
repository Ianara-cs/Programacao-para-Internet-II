import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { existEmail } from '../middlewares/existUser_middleware'

const routes = Router()

const authController = new AuthController()

routes.post('/signup', existEmail, authController.signUp)

routes.post('/signin', authController.signIn)

routes.get('/me', authController.me)

export default routes