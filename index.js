import 'dotenv/config';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routers/index.js';
import con from './src/db/connections.js';

const app = express()

app.use(cors())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router)

const PROT = process.env.PROT || 5001
app.listen(PROT, () => {
    console.log("server is run " + PROT)
})