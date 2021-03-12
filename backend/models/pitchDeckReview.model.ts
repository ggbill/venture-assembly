import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose';

export interface IPitchDeckReview extends Document {
    name: string,
    email: string,
    companyName: string,
    message: string,
    pitchDeckUrl: string,
    calendlyEventUri: string, 
    calendlyInviteeUri: string,
}

const PitchDeckReviewSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    companyName: { type: String },
    message: { type: String },
    pitchDeckUrl: { type: String },
    calendlyEventUri: { type: String }, 
    calendlyInviteeUri: { type: String },
});

export default mongoose.model<IPitchDeckReview>('PitchDeckReview', PitchDeckReviewSchema);