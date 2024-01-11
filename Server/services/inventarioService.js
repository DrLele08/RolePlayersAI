const utils = require("../models/utils");
const creazione = require("../models/creazione");
const utente = require("../models/utente");

const inventarioService = {};

const requiredFields = ['idUtente', 'idCreazione'];

inventarioService.getInventario = async(data) => {
    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    data.filters.tipo && (data.filters.tipo = data.filters.tipo.trim());
    data.filters.nome && (data.filters.nome = data.filters.nome.trim());

    let tipo = data.filters.tipo;
    if (tipo != null) {
        tipo = tipo.toLowerCase();
        if (tipo !== 'ambiente' && tipo !== 'personaggio')
            return Promise.reject("Tipo non valido!");
    }

    return await creazione.getByUtenteAndFilters(data.idUtente, data.filters, data.pagina);
}

inventarioService.addContenuto = async(data) => {
    let c = await checkUtenteAndCreazione(data);

    if (c.fkUtente !== data.idUtente && !c.isPubblico)
        return Promise.reject("Non hai i permessi!");

    let u = await utente.getById(data.idUtente);

    if (await u.hasCreazione(c))
        return Promise.reject("Creazione già presente nell'Inventario!");

    return await u.addCreazione(c);
}

inventarioService.removeContenuto = async(data) => {
    let c = await checkUtenteAndCreazione(data);
    let u = await utente.getById(data.idUtente);

    if (!await u.hasCreazione(c))
        return Promise.reject("Creazione non presente nell'Inventario!");

    return await u.removeCreazione(c);
}

async function checkUtenteAndCreazione(data) {
    if (!utils.checkParameters(data, requiredFields))
        return Promise.reject("Dati non validi!");

    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    if (!utils.checkId(data.idCreazione))
        return Promise.reject("ID creazione non valido!");

    let c = await creazione.getById(data.idCreazione);
    if (c == null)
        return Promise.reject("Creazione non trovata!");

    return c;
}

module.exports = inventarioService;