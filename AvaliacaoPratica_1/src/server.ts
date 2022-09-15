import 'reflect-metadata';
import './shared/container';

import express from 'express';
import { createConnection } from './database/data-source';
import router from './routes';



createConnection(process.env.DB_HOST)
const app = express()

app.use(express.json())

app.use(router)

app.listen(3000, () => console.log("Servidor rodando🛸"))