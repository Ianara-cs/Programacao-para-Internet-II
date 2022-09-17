import { Router } from "express"
import { authMiddleware } from "../middlewares/auth_middleware"
import { ReadingController } from "../modules/reading/reading.controller"

const readingRoutes = Router()

const readingController = new ReadingController()
readingRoutes.use(authMiddleware)

readingRoutes.post("/addleitura", readingController.addReading)
readingRoutes.get("/", readingController.listAllReading)
readingRoutes.delete("/:id/delete", readingController.removeReading)

export { readingRoutes }

