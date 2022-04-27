require('dotenv').config();

import express, { Request, response, Response } from "express";
import bodyParser from "body-parser";
// import payments from "./mundipagg/payments";
import payments from './pagarme/payments'
import { creditCardPayment } from "./pagarme/types";
import cors from 'cors'

const serveStatic = require('serve-static')
const path = require('path')

const server = express();

server.use(cors())
server.use(bodyParser.json());


//here we are configuring dist to serve app files
server.use('/', serveStatic(path.join(__dirname, '/../public')))

// this * route is to serve project on different page routes except root `/`
server.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/index.html'))
})

server.get("/", (request, response) => {
    return response.send("Hello!");
});
/*
server.post("/pay", async (request, response) => {

    const params = request.body;

    let axiosResponse = { data: {} };
    try {
        axiosResponse = await payments.creditCard(params);
    } catch (e: any) {
        console.log(e);
        axiosResponse.data = e.message
    }


    return response.json(axiosResponse.data);
});
*/

server.post('/pay', async (req: Request, res: Response) => {
    const params: creditCardPayment = req.body;

    const payload = {api_key: `${process.env.PAGARME_KEY!}`, ...params}

    console.log(payload)

    let axiosResponse = {data: {}}
    let code = 0;

    try {
        axiosResponse = await payments.creditCard(payload)
        code = 200
    } catch (error: any) {
        console.error(error)
        axiosResponse.data = error.message
        code = 400
    }
    res.status(code).json(axiosResponse.data)
})

export default server;