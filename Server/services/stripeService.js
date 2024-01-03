const stripe = require('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
const utils = require("../models/utils");
const utente = require("../models/utente");
const express = require('express');
const app = express();

const stripeService = {}

stripeService.cambiaAbbonamento= async(idUtente, idAbbonamento)=>{


    app.use(express.static('public'));

    const YOUR_DOMAIN = 'http://localhost:3000';

    app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: '{{PRICE_ID}}',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        res.redirect(303, session.url);
    });

    app.listen(3000, () => console.log('Running on port 3000'));

    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }
    if(!utils.checkId(idAbbonamento)){
        return Promise.reject("Id Abbonamento non valido");
    }
    //getCustomer
    const customer = await stripe.customers.retrieve(idUtente);

    //Se ha un abbonamento attivo lo cancella
    if(customer.subscriptions && customer.subscriptions.data.length > 0){

        const idSubscription = customer.subscriptions.data[0].id;
        if(idSubscription === idAbbonamento){
            return Promise.reject("Abbonamento già sottoscritto");
        }
        await stripe.subscriptions.del(idSubscription);
    }

    //Ne crea uno nuovo
    const nuovoAbbonamento = await utente.cambiaAbbonamento(idUtente, idAbbonamento);

    return nuovoAbbonamento;

}