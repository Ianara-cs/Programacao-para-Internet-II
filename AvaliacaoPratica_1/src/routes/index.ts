import { Router } from "express";
import { authRoutes } from "./auth_routes";
import { readingRoutes } from "./reading_routes";

const router = Router()


router.use('/auth', authRoutes)
router.use('/leitura', readingRoutes)


export default router