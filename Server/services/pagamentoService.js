const utils = require("../models/utils");
const abbonamento = require("../models/abbonamento");
const stripeAdapter = require("./stripeAdapter");
const paymentStripe = new stripeAdapter();

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
        return paymentStripe.effettuaPagamento(idUtente, nuovoAbbonamento);
    }
    else{
        return {success: false, sessionUrl: "Abbonamento non valido"};
    }
}


pagamentoService.verificaPagamento = async(idUtente, idPagamento)=> {
    return paymentStripe.verificaPagamento(idUtente,idPagamento);
}

module.exports=pagamentoService;