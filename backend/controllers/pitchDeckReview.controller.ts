var mongoose = require('mongoose');

import PitchDeckReview, { IPitchDeckReview } from '../models/pitchDeckReview.model';

export namespace PitchDeckReviewController {
    export async function CreatePitchDeckReview(reviewDetails: any): Promise<IPitchDeckReview> {
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            PitchDeckReview.create({
                name: reviewDetails.name,
                email: reviewDetails.email,
                companyName: reviewDetails.companyName,
                message: reviewDetails.message,
                pitchDeckUrl: reviewDetails.pitchDeckUrl,
                calendlyEventUri: reviewDetails.calendlyEventUri,
                calendlyInviteeUri: reviewDetails.calendlyInviteeUri
            }, function (err, result) {      
                if (err) {
                    console.error("Error: " + err);
                    reject(err)
                }
                resolve(result);
            })
        });
    }
}