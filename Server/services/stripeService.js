const stripe = require('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
const utils = require("../models/utils");
const utente = require("../models/utente");
const abbonamento = require("../models/abbonamento");

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

stripeService.effettuaPagamento = async(idUtente, idAbbonamento) => {
    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }

    const nuovoAbbonamento = abbonamento.getById(idAbbonamento);

    if(nuovoAbbonamento.prezzo === 0){
        return {success: true};
    }

    if(nuovoAbbonamento.prezzo > 0) {

        const baseUrl = process.env.BASE_URL;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Abbonamento ' + nuovoAbbonamento.nomeTier,
                            images: ['https://www.vistanet.it/napoli/wp-content/uploads/sites/5/2023/04/pizza-napoli-1.jpg'],
                        },
                        unit_amount: nuovoAbbonamento.prezzo * 1000
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
    else{
        return {success: true, sessionUrl: null};
    }
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

module.exports=stripeService;