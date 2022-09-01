import { Router } from "express";
import { authRoutes } from "./auth_routes";
import { leituraRoutes } from "./leitura_routes";

const router = Router()


router.use('/auth', authRoutes)
router.use('/leitura', leituraRoutes)


export default router