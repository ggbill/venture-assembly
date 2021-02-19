var mongoose = require('mongoose');

import PdfPurchase, { IPdfPurchase } from '../models/pdfPurchase.model';

export namespace RoundPlannerController {
    export async function CreatePdfPurchase(payload: any): Promise<IPdfPurchase> {
        console.log("createPdfPurchase")
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            PdfPurchase.create({
                name: payload.metadata.name,
                email: payload.customer_details.email,
                companyName: payload.metadata.companyName,
                preMoneyValuation: payload.metadata.preMoneyValuation,
                amountRaising: payload.metadata.amountRaising,
                cashInBank: payload.metadata.cashInBank,
                monthlyBurnRate: payload.metadata.monthlyBurnRate,
                sector: payload.metadata.sector,
                stage: payload.metadata.stage,
                monthlyRevenue: payload.metadata.monthlyRevenue,
                month12Revenue: payload.metadata.month12Revenue,
                isUsesTech: payload.metadata.isUsesTech,
                year1Revenue: payload.metadata.year1Revenue,
                year1Ebitda: payload.metadata.year1Ebitda,
                year2Revenue: payload.metadata.year2Revenue,
                year2Ebitda: payload.metadata.year2Ebitda,
                year3Revenue: payload.metadata.year3Revenue,
                year3Ebitda: payload.metadata.year3Ebitda,
                swotTeam: payload.metadata.swotTeam,
                swotTechnology: payload.metadata.swotTechnology,
                swotAdvisors: payload.metadata.swotAdvisors,
                swotTraction: payload.metadata.swotTraction,
                swotMarket: payload.metadata.swotMarket,
                stripePaymentIntentId: payload.payment_intent,
                purchaseDate: new Date(),
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