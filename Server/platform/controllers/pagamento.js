const stripeService = require("../../services/stripeService");

exports.EffettuaPagamento=async(req,ris)=>{
        let idUtente = req.params.idUtente;
        let tipoAbbonamento = req.params.tipoAbbonamento;

        const result = await stripeService.effettuaPagamento(idUtente, tipoAbbonamento);

        // Invia la risposta al chiamante (client)
        if (result.success) {
            ris.redirect(303, result.sessionUrl);
        } else {
            ris.render("Errore, Tipo di abbonamento non valido", { errore: result.message });
        }
};

exports.VerificaPagamento = async (req, ris) => {
    let idUtente = req.params.idUtente;
    let idPagamento = req.params.idPagamento;
    let idAbbonamento = req.params.idAbbonamento;

    const result = await stripeService.verificaPagamento(idUtente, idPagamento, idAbbonamento);

    // Invia la risposta al chiamante (client)
    if (result.success) {
        ris.render("Cambio abbonamento effettuato con successo", { utente: idUtente });
    } else {
        ris.render("Errore, Non hai pagato", { errore: result.message });
    }
};
