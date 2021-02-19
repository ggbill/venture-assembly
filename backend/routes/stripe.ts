import { Request, Response } from 'express';
import { PDFController } from '../controllers/pdf.controller';

const router = require('express').Router();
const stripe = require("stripe")("sk_test_BxKQ9cg1p2v9Tl3z05gX3GFi");

const YOUR_DOMAIN = 'http://localhost:3000/round-planner';

router.post("/create-checkout-session", async (req, res) => {

    console.log(req.body)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Round Planner Pack',
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        metadata: 
        {
            "name": req.body.name,
            "companyName": req.body.name,
            "preMoneyValuation" : req.body.roundDetails.preMoneyValuation,
            "amountRaising" : req.body.roundDetails.amountRaising,
            "cashInBank" : req.body.roundDetails.cashInBank,
            "monthlyBurnRate" : req.body.roundDetails.monthlyBurnRate,
            "sector" : req.body.roundDetails.sector,
            "stage" : req.body.roundDetails.stage,
            "monthlyRevenue" : req.body.roundDetails.monthlyRevenue,
            "month12Revenue" : req.body.roundDetails.month12Revenue,
            "isUsesTech" : req.body.roundDetails.isUsesTech,
            "year1Revenue" : req.body.roundDetails.financials[0].revenue,
            "year1Ebitda" : req.body.roundDetails.financials[0].ebitda,
            "year2Revenue" : req.body.roundDetails.financials[1].revenue,
            "year2Ebitda" : req.body.roundDetails.financials[1].ebitda,
            "year3Revenue" : req.body.roundDetails.financials[2].revenue,
            "year3Ebitda" : req.body.roundDetails.financials[2].ebitda,
            "swotTeam" : req.body.roundDetails.swot.team,
            "swotTechnology" : req.body.roundDetails.swot.technology,
            "swotAdvisors" : req.body.roundDetails.swot.advisors,
            "swotTraction" : req.body.roundDetails.swot.traction,
            "swotMarket" : req.body.roundDetails.swot.market
        }
    });
    res.json({ id: session.id });
});


router.post("/test-pdf", async (req, res) => {
    console.log("test-pdf")

    // console.log(req.body)

    PDFController.CreateRoundPlannerPdf(req.body)

    
    res.json( "done" );
});


export default router;