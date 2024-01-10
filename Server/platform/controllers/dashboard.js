const utente= require("../../services/utenteService");
const creazione = require("../../services/creazioneService")

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

