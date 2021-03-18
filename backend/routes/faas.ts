import { FaasController } from "../controllers/faas.controller";
import { Request, Response } from 'express';

const router = require('express').Router();

router.post("/create", async (request: Request, response: Response) => {
    FaasController.CreateFaasEnquiry(request.body)
    .then((result) => {
        response.send(result);
    })
    .catch((err) => {
        console.log(err)
        response.status(404).send(err);
    })
});

export default router;