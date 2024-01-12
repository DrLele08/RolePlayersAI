const utente= require("../../services/utenteService");
const creazione = require("../../services/creazioneService")

/**
 * Ottiene le informazioni necessarie e renderizza la dashboard.
 *
 * @param {Object} req - Oggetto della richiesta Express.
 * @param {Object} ris - Oggetto della risposta Express.
 * @returns {Promise<void>} La funzione restituisce una Promise che si risolve quando la renderizzazione è completata.
 * @throws {Error} Se si verifica un errore durante l'ottenimento dei dati o la renderizzazione della pagina.
 */
exports.GetDashboard = async (req, ris) => {
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();
        const personaggiPopolari = await creazione.getCreazioniPopolari(8, "Personaggio");
        const ambientiPopolari = await creazione.getCreazioniPopolari(8, "Ambiente");

        ris.render("index", {
            Utente: user,
            Abbonamento: abbonamento,
            PersonaggiPopolari: personaggiPopolari,
            AmbientiPopolari: ambientiPopolari
        });
    }catch(error){
        ris.render("error", {errore: error});
    }
};

