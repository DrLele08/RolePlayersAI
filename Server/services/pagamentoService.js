const utils = require("../models/utils");
const abbonamento = require("../models/abbonamento");
const utente = require("../models/utente");
const stripeAdapter = require("./stripeAdapter");
const paymentStripe = new stripeAdapter();

const pagamentoService = {}

pagamentoService.effettuaPagamento = async(idUtente, idAbbonamento) => {
    if(!utils.checkId(idUtente)){
        return Promise.reject("Id Utente non valido");
    }

    if(idAbbonamento !== null) {
        const nuovoAbbonamento = await abbonamento.getAbbonamentoById(idAbbonamento);

        if (parseFloat(nuovoAbbonamento.prezzo) === 0.0) {
            await utente.cambiaAbbonamento(idUtente, idAbbonamento);
            return {success: true, sessionUrl: "conferma.html"};
        }

        if (nuovoAbbonamento.prezzo > 0) {
            return paymentStripe.effettuaPagamento(idUtente, nuovoAbbonamento);
        } else {
            return {success: false, message: "Abbonamento non valido"};
        }
    }
    else{
        return {success: false, message: "ID Abbonamento non valido"};
    }
}


pagamentoService.verificaPagamento = async(idUtente, idPagamento)=> {
    return paymentStripe.verificaPagamento(idUtente,idPagamento);
}

module.exports=pagamentoService;