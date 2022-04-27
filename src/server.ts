require('dotenv').config();

import express, { Request, response, Response } from "express";
import bodyParser from "body-parser";
// import payments from "./mundipagg/payments";
import payments from './pagarme/payments'
import { creditCardPayment } from "./pagarme/types";

const server = express();

server.use(bodyParser.json());
server.use('/public', express.static('public'));

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

    try {
        axiosResponse = await payments.creditCard(payload)
    } catch (error: any) {
        console.error(error)
        axiosResponse.data = error.message
    }
    res.json(axiosResponse.data)
})

export default server;