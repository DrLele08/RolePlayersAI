const stripe = require('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
const utils = require("../models/utils");
const utente = require("../models/utente");
const express = require('express');
const app = express();

const stripeService = {}

stripeService.cambiaAbbonamento= async(idUtente, idAbbonamento)=>{

    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }
    if(!utils.checkId(idAbbonamento)){
        return Promise.reject("Id Abbonamento non valido");
    }

    //Crea un nuovo Abbonamento
    const nuovoAbbonamento = await utente.cambiaAbbonamento(idUtente, idAbbonamento);

    return nuovoAbbonamento;

}

stripeService.effettuaPagamento = async(idUtente, tipoAbbonamento) => {
    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }

    switch (tipoAbbonamento) {
        case 'free':
            return {success: true};
        case 'base':
            unitAmount = 19.99;
            break;
        case 'enterprise':
            unitAmount = 29.99;
            break;
        default:
            // Gestione di un tipo non valido
            return { success: false, message: "Tipo di abbonamento non valido." };
    }

    const baseUrl=process.env.BASE_URL;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Abbonamento ' + tipoAbbonamento,
                        images: ['https://www.vistanet.it/napoli/wp-content/uploads/sites/5/2023/04/pizza-napoli-1.jpg'],
                    },
                    unit_amount: unitAmount
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://${baseUrl}/payment/verify/${idUtente}/{CHECKOUT_SESSION_ID}`,
        cancel_url: `http://${baseUrl}/error.html`,
    });
    return {success: true, sessionUrl: session.url};
}


stripeService.verificaPagamento = async(idUtente, idPagamento, idAbbonamento)=> {
    const session = await stripe.checkout.sessions.retrieve(idPagamento);

    console.log("Pagamento: " + session.payment_status);
    console.log(idUtente);

    if (session.payment_status === "paid") {
        // Tutto ok, cambiare tipo abbonamento
        await stripeService.cambiaAbbonamento(idUtente, idAbbonamento);
        return {success: true, message: "Cambio abbonamento effettuato con successo."};
    }
    else {
        // Errore, non hai pagato
        return {success: false, message: "Errore: il pagamento non è stato effettuato."};
    }
}