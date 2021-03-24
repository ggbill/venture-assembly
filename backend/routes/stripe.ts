const router = require('express').Router();
const stripe = require("stripe")("sk_test_BxKQ9cg1p2v9Tl3z05gX3GFi");

const YOUR_DOMAIN = 'http://localhost:3000/pitch-deck-review';

router.post("/create-checkout-session", async (req, res) => {

    console.log(req.body)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: req.body.email,
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Pitch Deck Review',
                        images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: 5000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?cancelled=true`,
        metadata: 
        {
            "name": req.body.name,
            "companyName": req.body.name,
            "email": req.body.email,
            "message": req.body.message,
        }
    });
    res.json({ id: session.id });
});


export default router;