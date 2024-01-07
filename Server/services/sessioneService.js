const sessione = require("../models/sessione");
const utente = require("../models/utente");
const utils = require("../models/utils");

const sessioneService = {};
const requiredFields = ['utente', 'contesto', 'titolo'];

sessioneService.getByUtente = async (idUtente) => {
    if (!utils.checkId(idUtente))
        return Promise.reject("ID utente non valido!");

    if (await utente.getById(idUtente) == null)
        return Promise.reject("Utente non trovato!");

    return await sessione.getByUtente(idUtente);
}

module.exports = sessioneService;