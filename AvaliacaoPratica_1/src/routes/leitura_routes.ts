import { Router } from "express";
import { LeituraController } from "../controllers/LeituraController";
import { authMiddleware } from "../middlewares/auth_middleware";

const leituraRoutes = Router()

const leituraController = new LeituraController()
leituraRoutes.use(authMiddleware)

leituraRoutes.post("/addleitura", leituraController.addLeitura)
leituraRoutes.get("/", leituraController.listAllLeitura)
leituraRoutes.get("/remove:id", leituraController.removeLeitura)

export { leituraRoutes };
