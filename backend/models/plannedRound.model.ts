import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose';

export interface IPlannedRound extends Document {
    name: string,
    email: string,
    companyName: string,
    companyWebsite: string,
    preMoneyValuation: number,
    amountRaising: number,
    cashInBank: number,
    monthlyBurnRate: number,
    sector: string,
    stage: string,
    businessType: string,
    businessModel: string,
    monthlyRevenue: number,
    month12Revenue: number,
    isUsesTech: boolean,
    financials: any[],
    swot: any,
    calendlyEventUri: string, 
    calendlyInviteeUri: string,
}

const PlannedRoundSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    companyName: { type: String },
    companyWebsite: { type: String },
    preMoneyValuation: { type: Number },
    amountRaising: { type: Number },
    cashInBank: { type: Number },
    monthlyBurnRate: { type: Number },
    sector: { type: String },
    stage: { type: String },
    businessType: { type: String },
    businessModel: { type: String },
    monthlyRevenue: { type: Number },
    month12Revenue: { type: Number },
    isUsesTech: { type: Boolean },
    financials: [{type: Object}],
    swot: {type: Object},
    calendlyEventUri: { type: String }, 
    calendlyInviteeUri: { type: String },
});

export default mongoose.model<IPlannedRound>('PlannedRound', PlannedRoundSchema);