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


    return await utente.cambiaAbbonamento(idUtente, idAbbonamento);

}

stripeService.effettuaPagamento = async(idUtente, idAbbonamento) => {
    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }


    const nuovoAbbonamento = await abbonamento.getAbbonamentoById(idAbbonamento);

    if(parseFloat(nuovoAbbonamento.prezzo) === 0.0){
        await stripeService.cambiaAbbonamento(idUtente, idAbbonamento);
        return {success: true, sessionUrl: "conferma.html"};
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
                            images: ['https://extensionsforjoomla.com/images/stories/virtuemart/product/stripe-checkout.png'],
                        },
                        unit_amount: Math.round(nuovoAbbonamento.prezzo * 100)
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                idAbbonamento: idAbbonamento
            },
            mode: 'payment',
            success_url: `${baseUrl}/pagamento/verify/${idUtente}/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/error.html`,
        });
        return {success: true, sessionUrl: session.url};
    }
    else{
        return {success: false, sessionUrl: "Abbonamento non valido"};
    }
}


stripeService.verificaPagamento = async(idUtente, idPagamento)=> {
    const session = await stripe.checkout.sessions.retrieve(idPagamento);

    try {
        let idAbbonamento = session.metadata.idAbbonamento

        console.log("Pagamento: " + session.payment_status);
        console.log(idUtente);

        if (session.payment_status === "paid") {
            // Tutto ok, cambiare tipo abbonamento
            await stripeService.cambiaAbbonamento(idUtente, idAbbonamento);
            return {success: true, message: "Cambio abbonamento effettuato con successo."};
        } else {
            // Errore, non hai pagato
            return {success: false, message: "Errore: il pagamento non è stato effettuato."};
        }
    }
    catch(error){
        return{success:false, message: "Errore: il pagamento non è stato effettuato."};
    }
}

module.exports=stripeService;