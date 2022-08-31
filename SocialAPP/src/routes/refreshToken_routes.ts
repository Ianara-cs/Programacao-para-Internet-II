import { Router } from 'express'
import { RefreshTokenController } from '../controllers/RefreshTokenController'

const refreshTokenRoutes =Router()

const refreshTokenController = new RefreshTokenController()


refreshTokenRoutes.post('/', refreshTokenController.generateTokenByRefreshToken)


export { refreshTokenRoutes as refleshTokenRoutes }

