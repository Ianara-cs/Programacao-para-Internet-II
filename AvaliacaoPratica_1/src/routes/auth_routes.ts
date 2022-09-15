import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { UserController } from "../modules/auth/auth.controller";

const authRoutes = Router()

const userController = new UserController()

authRoutes.post('/signup', userController.singUp)
authRoutes.patch('/activateuser', userController.activateAccount)
authRoutes.post('/reenviaremail', userController.reenviarCodigoEmail)
authRoutes.post('/signin', userController.signIn)
authRoutes.post('/refreshtoken', userController.refreshToken)
authRoutes.post('/enviarcodigo', authMiddleware, userController.sendPhoneCode)
authRoutes.patch('/addtelefone', authMiddleware, userController.addTelefone)

export { authRoutes };

