import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/auth_middleware";

const authRoutes = Router()

const authController = new AuthController()

authRoutes.post('/signup', authController.signUp)
authRoutes.post('/signin', authController.signIn)
authRoutes.post('/activateuser', authController.activateUser)
authRoutes.post('/enviarcodigo', authMiddleware, authController.enviarCodeTelefone)
authRoutes.post('/addtelefone', authMiddleware, authController.addTelefone)

export { authRoutes };

