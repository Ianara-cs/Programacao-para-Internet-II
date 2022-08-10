import express from "express"
import { createConnection } from "./data-source"

createConnection('localhost')
const app = express()

app.use(express.json())

app.listen(3333, () => console.log("Servidor rodando!"))