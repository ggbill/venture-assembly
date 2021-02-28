import { RoundPlannerController } from "../controllers/roundPlanner.controller";
import { Request, Response } from 'express';

const router = require('express').Router();

router.post("/create", async (request: Request, response: Response) => {
    RoundPlannerController.CreatePlannedRound(request.body)
    .then((result) => {
        response.send(result);
    })
    .catch((err) => {
        console.log(err)
        response.status(404).send(err);
    })
});

export default router;