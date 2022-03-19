const functions = require("firebase-functions");
const express = require("express");
const cors = require ("cors");
const stripe = require('stripe')("sk_test_51KeQYcIlPEqhutrSLvAgxNXv7CurC9HJimxfhhsJ3CoS7qFhAYFF6V0VuMLn2wXMcJMyZck4xG0UxA8nElbrdtqA00XVwXUhDL");

// -API

// -App config 
const app =express();

// - Middlewares
app.use(cors({origin:true}));
app.use(express.json())

// - API routes
app.get('/', (request, response) => response.status(200).send('hi babe :)'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("payment Request Recived BOOM!! for this amount >>>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // submits of the currency
        currency: "usd",
    });


    // OK - breated
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });

    console.log("SEC >>>>> ", paymentIntent.client_secret);
});

// - listen command
exports.api = functions.https.onRequest(app);

// Exemple endpoint
// http://localhost:5001/challenge-bdc8f/us-central1/api