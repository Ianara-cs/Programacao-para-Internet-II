import express from "express"
import { createConnection } from "./database/data-source"
import routes from "./routes/"

createConnection('localhost')
const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({mensagem:'Pong!'})
})

app.use(routes)

app.listen(3000, () => console.log("Servidor rodando!"))