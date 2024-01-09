const stripe = require('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
const utils = require("../models/utils");
const utente = require("../models/utente");
const abbonamento = require("../models/abbonamento");
const stripeAdapter = require("./stripeAdapter");

const pagamentoService = {}

pagamentoService.effettuaPagamento = async(idUtente, idAbbonamento) => {
    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }


    const nuovoAbbonamento = await abbonamento.getAbbonamentoById(idAbbonamento);

    if(parseFloat(nuovoAbbonamento.prezzo) === 0.0){
        await pagamentoService.cambiaAbbonamento(idUtente, idAbbonamento);
        return {success: true, sessionUrl: "conferma.html"};
    }

    if(nuovoAbbonamento.prezzo > 0) {
        return await stripeAdapter.effettuaPagamento(idUtente, abbonamento);
    }
    else{
        return {success: false, sessionUrl: "Abbonamento non valido"};
    }
}


pagamentoService.verificaPagamento = async(idUtente, idPagamento)=> {
    const session = await stripe.checkout.sessions.retrieve(idPagamento);

    try {
        let idAbbonamento = session.metadata.idAbbonamento

        console.log("Pagamento: " + session.payment_status);
        console.log(idUtente);

        if (session.payment_status === "paid") {
            // Tutto ok, cambiare tipo abbonamento
            await pagamentoService.cambiaAbbonamento(idUtente, idAbbonamento);
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

module.exports=pagamentoService;