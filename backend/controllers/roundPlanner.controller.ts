var mongoose = require('mongoose');

import PlannedRound, { IPlannedRound } from '../models/plannedRound.model';

export namespace RoundPlannerController {
    export async function CreatePlannedRound(round: any): Promise<IPlannedRound> {
        console.log("createPlannedRound")
        console.log(round)
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            PlannedRound.create({
                name: round.name,
                email: round.email,
                companyName: round.companyName,
                companyWebsite: round.companyWebsite,
                preMoneyValuation: round.preMoneyValuation,
                amountRaising: round.amountRaising,
                cashInBank: round.cashInBank,
                monthlyBurnRate: round.monthlyBurnRate,
                sector: round.sector,
                stage: round.stage,
                businessType: round.businessType,
                businessModel: round.businessModel,
                monthlyRevenue: round.monthlyRevenue,
                month12Revenue: round.month12Revenue,
                isUsesTech: round.isUsesTech,
                financials: round.financials,
                swot: round.swot,
                calendlyEventUri: round.calendlyEventUri,
                calendlyInviteeUri: round.calendlyInviteeUri
                // year1Revenue: round.financials[0].revenue,
                // year1Ebitda: round.financials[0].ebitda,
                // year2Revenue: round.financials[1].revenue,
                // year2Ebitda: round.financials[1].ebitda,
                // year3Revenue: round.financials[2].revenue,
                // year3Ebitda: round.financials[2].ebitda,
                // swotTeam: round.swot.team,
                // swotTechnology: round.swot.technology,
                // swotAdvisors: round.swot.advisors,
                // swotTraction: round.swot.traction,
                // swotMarket: round.swot.market,
                // stripePaymentIntentId: payload.payment_intent,
                // purchaseDate: new Date(),
            }, function (err, result) {      
                if (err) {
                    console.error("Error: " + err);
                    reject(err)
                }
                console.log(result)
                resolve(result);
            })
        });
    }
}