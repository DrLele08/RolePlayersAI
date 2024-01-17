const stripeService = require("../../services/pagamentoService");

exports.EffettuaPagamento=async(req,ris)=>{
        let idUtente = req.idUtente;
        let idAbbonamento = req.params.idAbbonamento;

        const result = await stripeService.effettuaPagamento(idUtente, idAbbonamento);

        // Invia la risposta al chiamante (client)
        if (result.success) {
            ris.redirect(303, result.sessionUrl);
        } else {
            ris.render("error", { errore: result.message });
        }
};

exports.VerificaPagamento = async (req, ris) => {
    let idUtente = req.params.idUtente;
    let idPagamento = req.params.idPagamento;

    const result = await stripeService.verificaPagamento(idUtente, idPagamento);

    // Invia la risposta al chiamante (client)
    if (result.success) {
        ris.redirect(process.env.BASE_URL + "/dashboard");
    } else {
        ris.render("error", { errore: result.message });
    }
};
