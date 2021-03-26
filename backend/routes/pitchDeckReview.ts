import { PitchDeckReviewController } from "../controllers/pitchDeckReview.controller";
import { Request, Response } from 'express';

const router = require('express').Router();

router.post("/create", async (request: Request, response: Response) => {
    PitchDeckReviewController.CreatePitchDeckReview(request.body)
    .then((result) => {
        response.json(result);
    })
    .catch((err) => {
        console.log(err)
        response.status(404).send(err);
    })
});

export default router;