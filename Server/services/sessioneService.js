const sessione = require("../models/sessione");
const utente = require("../models/utente");
const contesto = require("../models/contesto");
const conversazioneService = require("../services/conversazioneService");
const utils = require("../models/utils");

const sessioneService = {};
const requiredFields = ['idUtente', 'idContesto', 'titolo'];

sessioneService.getById = async(id) => {
    if (!utils.checkId(id))
        return Promise.reject("ID sessione non valido!");

    let result = await sessione.getById(id);
    if (result == null)
        return Promise.reject("Sessione non trovata!");

    return result;
}

sessioneService.getByUtente = async (idUtente) => {
    if (!utils.checkId(idUtente))
        return Promise.reject("ID utente non valido!");

    if (await utente.getById(idUtente) == null)
        return Promise.reject("Utente non trovato!");

    return await sessione.getByUtente(idUtente);
}

sessioneService.createSessione = async(data) => {
    if (!utils.checkParameters(data, requiredFields))
        return Promise.reject("Dati non validi!");

    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    if (!utils.checkId(data.idContesto))
        return Promise.reject("ID contesto non valido!");

    if (await utente.getById(data.idUtente) == null)
        return Promise.reject("Utente non trovato!");

    if (await contesto.getContestoById(data.idContesto) == null)
        return Promise.reject("Contesto non trovato!");

    if (!data.titolo.match("^[a-zA-Z0-9\\s]{1,255}$"))
        return Promise.reject("Titolo non valido! Deve essere una stringa alfanumerica di massimo 255 caratteri.");

    const sessioneCreata = await sessione.createSessione(data)
        .catch(() => Promise.reject("Errore durante la creazione della Sessione!"));

    const idSessione = sessioneCreata.idSessione;

    const contestoAssociato = await sessioneCreata.getContesto();
    const personaggi = await contestoAssociato.getCreaziones();

    for (const personaggio of personaggi) {
        await conversazioneService.createConversazione({
            fkSessione: idSessione,
            fkPersonaggio: personaggio.idCreazione
        });
    }

    return sessioneCreata;
}

sessioneService.accessoSessione = async(data) => {
    let isValid = await checkUtenteAndSessione(data);

    if (isValid) {
        let idSessione = data.idSessione;

        await sessione.setUltimoAvvioToNow(idSessione);
        return await sessioneService.getById(idSessione);
    }
}

sessioneService.deleteById = async(data) => {
    let isValid = await checkUtenteAndSessione(data);

    if (isValid)
         return await sessione.deleteById(data.idSessione);
}

async function checkUtenteAndSessione(data) {
    if (!utils.checkId(data.idSessione))
        return Promise.reject("ID sessione non valido!");

    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    let sess = await sessioneService.getById(data.idSessione);

    if (sess == null) {
        return Promise.reject("Sessione non trovata!")
    }

    if (sess.fkUtente !== data.idUtente)
        return Promise.reject("Non hai i permessi!");

    return true;
}

module.exports = sessioneService;