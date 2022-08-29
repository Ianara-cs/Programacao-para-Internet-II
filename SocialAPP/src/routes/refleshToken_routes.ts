import { Router } from 'express'
import { RefleshTokenController } from '../controllers/RefleshTokenController'

const refleshTokenRoutes =Router()

const refleshTokenController = new RefleshTokenController()


refleshTokenRoutes.post('/', refleshTokenController.generateTokenByreflashtoken)


export { refleshTokenRoutes }

