import { Router } from 'express'
import authRoutes from './auth'
import { postRoutes } from './posts_routes'
import { refleshTokenRoutes } from './refreshToken_routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/posts', postRoutes)
router.use('/reflesh-token', refleshTokenRoutes)

export default router