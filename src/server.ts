require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import payments from "./mundipagg/payments";

const server = express();

server.use(bodyParser.json());
server.use('/public', express.static('public'));

server.get("/", (request, response) => {
    return response.send("Hello!");
});

server.post("/pay", async (request, response) => {

    const params = request.body;

    let axiosResponse = {data: {}};
    try {
        axiosResponse = await payments.creditCard(params);
    } catch (e: any) {
        console.log(e);
        axiosResponse.data = e.message
    }


    return response.json(axiosResponse.data);
});

export default server;