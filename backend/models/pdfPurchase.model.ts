import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose';

export interface IPdfPurchase extends Document {
    name: string,
    email: string,
    companyName: string,
    preMoneyValuation: number,
    amountRaising: number,
    cashInBank: number,
    monthlyBurnRate: number,
    sector: string,
    stage: string,
    monthlyRevenue: number,
    month12Revenue: number,
    isUsesTech: boolean,
    year1Revenue: number,
    year1Ebitda: number,
    year2Revenue: number,
    year2Ebitda: number,
    year3Revenue: number,
    year3Ebitda: number,
    swotTeam: number,
    swotTechnology: number,
    swotAdvisors: number,
    swotTraction: number,
    swotMarket: number,
    stripePaymentIntentId: string,
    purchaseDate: Date
}

const PdfPurchaseSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    companyName: { type: String },
    preMoneyValuation: { type: Number },
    amountRaising: { type: Number },
    cashInBank: { type: Number },
    monthlyBurnRate: { type: Number },
    sector: { type: String },
    stage: { type: String },
    monthlyRevenue: { type: Number },
    month12Revenue: { type: Number },
    isUsesTech: { type: Boolean },
    year1Revenue: { type: Number },
    year1Ebitda: { type: Number },
    year2Revenue: { type: Number },
    year2Ebitda: { type: Number },
    year3Revenue: { type: Number },
    year3Ebitda: { type: Number },
    swotTeam: { type: Number },
    swotTechnology: { type: Number },
    swotAdvisors: { type: Number },
    swotTraction: { type: Number },
    swotMarket:{ type: Number },
    stripePaymentIntentId: { type: String },
    purchaseDate: { type: Date }
});

export default mongoose.model<IPdfPurchase>('PdfPurchase', PdfPurchaseSchema);