import * as express from 'express';
import * as cors from 'cors';
// import * as bodyparser from 'body-parser';
import requestLoggerMiddleware from './request.logger.middleware';
// const stripe = require("stripe")("sk_test_BxKQ9cg1p2v9Tl3z05gX3GFi");

// Find your endpoint's secret in your Dashboard's webhook settings
// const endpointSecret = 'whsec_ioinbLILYitGVhnB6Y3JyrjVH4mMgDPP';

const path = require('path');
const shrinkRay = require('shrink-ray-current');
const bodyParser = require('body-parser');

import stripeRouter from './routes/stripe';
import roundPlannerRouter from './routes/roundPlanner';
import pitchDeckReviewRouter from './routes/pitchDeckReview';
import faasRouter from './routes/faas';
import airtableRouter from './routes/airtable';


const app = express();

// compress responses
app.use(shrinkRay());

app.use(cors());
// app.use(bodyparser.json());
// app.use(express.json({limit: '50mb'}));
app.use(requestLoggerMiddleware);

// only use the raw bodyParser for webhooks
app.use((req, res, next) => {
	// console.log(`req.originalUrl: ${req.originalUrl}`)
	if (req.originalUrl === '/webhook') {
		bodyParser.raw({ type: 'application/json' })(req, res, next)
	} else {
		bodyParser.json({ limit: '50mb' })(req, res, next);
	}
});

app.use('/stripe', stripeRouter);
app.use('/roundPlanner', roundPlannerRouter);
app.use('/pitchDeckReview', pitchDeckReviewRouter);
app.use('/faas', faasRouter);
app.use('/airtable', airtableRouter);

// app.post('/webhook', (request, response) => {

//   const payload = request.body;
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (err) {
//     console.log(err.message)
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;
//     console.log(`event: ${JSON.stringify(event)}`)

//     // Fulfill the purchase...
//     RoundPlannerController.CreatePdfPurchase(session).then(() => {
//       return response.status(200).send();
//     }).catch((err) => {
//       console.log(err)
//       return response.status(400).send(`Controller Error: ${err}`);

//     })
//   }

//   // console.log("Got payload: " + JSON.stringify(payload));

//   return response.status(200).send();

// });

if (process.env.NODE_ENV === 'production') {

	// Declare the path to frontend's static assets
	app.use(express.static(path.resolve("..", "frontend", "build")));

	// Intercept requests to return the frontend's static entry point
	app.get("*", (_, response) => {
		response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
	});
}

export default app;