const utente= require("../../services/utenteService");
const creazione = require("../../services/creazioneService");
const utils = require("../../models/utils");
const sessione = require("../../services/sessioneService");
const utenteService = require("../../services/utenteService");

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

        for(let i=0; i<personaggiPopolari.length; i++){
            personaggiPopolari[i].dataValues.inventario = await utenteService.hasCreazione(idUtente, personaggiPopolari[i].idCreazione);
        }

        for(let i=0; i<ambientiPopolari.length; i++){
            ambientiPopolari[i].dataValues.inventario = await utenteService.hasCreazione(idUtente, ambientiPopolari[i].idCreazione);
        }

        ris.render("index", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento),
            PersonaggiPopolari: utils.convertToNormalObject(personaggiPopolari),
            AmbientiPopolari: utils.convertToNormalObject(ambientiPopolari)
        });
    }catch(error){
        ris.render("error", {errore: error});
    }
};

exports.GetLibreria=async (req,ris)=>{
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();

        ris.render("libreria", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento)
        });
    }catch(error){
        ris.render("error", {errore: error});
    }
};

exports.GetInventario=async (req,ris)=>{
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();

        ris.render("inventario", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento)
        });
    }catch(error){
        ris.render("error", {errore: error});
    }
};

exports.GetHome = async (req, ris) => {
    ris.render("landing");
};


