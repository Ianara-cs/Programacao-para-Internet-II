import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const routes = Router()

const authController = new AuthController()

routes.post('/signup', authController.signUp)

routes.post('/signin', authController.signIn)

export default routes