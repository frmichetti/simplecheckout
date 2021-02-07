import express from "express";
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.json());

server.get("/", (request, response) => {
    return response.send("Hello!");
});

export default server;