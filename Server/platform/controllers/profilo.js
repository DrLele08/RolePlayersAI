const utente = require("../../models/utente" );
const sessione = require ("../../models/sessione");
const creazione = require("../../models/creazione");

exports.getAreaProfilo = async(req,ris)=>{
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        const session = await sessione.getByUtente(idUtente);
        const personaggi = await creazione.getByUtenteAndFilters(idUtente, 1,1);
        const ambienti = await creazione.getByUtenteAndFilters(idUtente, 2,1);

        ris.render("overview", {
            Name: user.name,
            Username: user.username,
            NumberPersonaggi: personaggi.totalItems,
            NumberAmbienti: ambienti.totalItems,
            NumberSessioni: session.length,
            Personaggi: personaggi,
            Ambienti: ambienti
        })
    }
    catch(error){
        ris.render("error", {errore: error});
    }
}