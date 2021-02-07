require('dotenv').config();

import express from "express";
import bodyParser from "body-parser";
import payments from "./mundipagg/payments";

const server = express();

server.use(bodyParser.json());

server.get("/", (request, response) => {
    return response.send("Hello!");
});

server.post("/pay", async (request, response) => {

    const params = {
        "items": [
            {
                "amount": 2990,
                "description": "Chaveiro do Tesseract",
                "quantity": 1
            }
        ],
        "customer": {
            "name": "Tony Stark",
            "email": "avengerstark@ligadajustica.com.br"
        },
        "payments": [
            {
                "payment_method": "credit_card",
                "credit_card": {
                    "recurrence": false,
                    "installments": 1,
                    "statement_descriptor": "AVENGERS",
                    "card": {
                        "number": "4000000000000010",
                        "holder_name": "Tony Stark",
                        "exp_month": 1,
                        "exp_year": 30,
                        "cvv": "3531",
                        "billing_address": {
                            "line_1": "10880, Malibu Point, Malibu Central",
                            "zip_code": "90265",
                            "city": "Malibu",
                            "state": "CA",
                            "country": "US"
                        }
                    }
                }
            }
        ]
    };

    let axiosResponse = {data: {}};
    try {
        axiosResponse = await payments.creditCard(params);
    } catch (e) {
        console.log(e);
    }


    return response.json(axiosResponse.data);
});

export default server;