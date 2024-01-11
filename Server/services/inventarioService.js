const utils = require("../models/utils");
const creazione = require("../models/creazione");
const contesto = require("../models/contesto");
const utente = require("../models/utente");

const inventarioService = {};

inventarioService.getInventario = async(data) => {
    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    data.filters.nome && (data.filters.nome = data.filters.nome.trim());

    let contesti, creazioni;

    if (data.filters.tipo) {
        let tipi = data.filters.tipo.split(",").map(str => str.trim().toLowerCase());
        if (!tipi.every(tipo => ["personaggio", "ambiente", "contesto"].includes(tipo)))
            return Promise.reject("Filtro tipo non valido!");

        if (tipi.includes("contesto")) {
            contesti = await contesto.getByUtenteAndFilters(data.idUtente, data.filters, data.pagina);
            tipi.filter(tipo => tipo !== 'contesto');
            data.filters.tipo = tipi.join(",");
        }
        creazioni = await creazione.getByUtenteAndFilters(data.idUtente, data.filters, data.pagina);
    } else {
        contesti = await contesto.getByUtenteAndFilters(data.idUtente, data.filters, data.pagina);
        creazioni = await creazione.getByUtenteAndFilters(data.idUtente, data.filters, data.pagina);
    }

    const merge = {};
    let pagination;

    if (contesti) {
        merge.contesti = contesti.contesti;
        if (!creazioni)
            pagination = contesti.pagination;
    }

    if (creazioni) {
        merge.creazioni = creazioni.creazioni;
        if (!contesti)
            pagination = creazioni.pagination;
    }

    merge.pagination = pagination;

    return merge;
}

inventarioService.addContenuto = async(data) => {
    if ((!data.idCreazione && !data.idContesto) || (data.idCreazione && data.idContesto)) {
        return Promise.reject("Devi fornire uno tra idCreazione e idContesto!");
    }

    let u = await utente.getById(data.idUtente);
    let c;
    if (data.idCreazione) {
        c = await checkUtenteAndCreazione(data);

        if (c.fkUtente !== data.idUtente && !c.isPubblico)
            return Promise.reject("Non hai i permessi!");

        if (await u.hasCreazione(c))
            return Promise.reject("Creazione già presente nell'Inventario!");

        return await u.addCreazione(c);
    } else if (data.idContesto) {
        c = await checkUtenteAndContesto(data);

        if (c.fkUtente !== data.idUtente && !c.isPubblico)
            return Promise.reject("Non hai i permessi!");

        if (await u.hasContesto(c))
            return Promise.reject("Contesto già presente nell'Inventario!");

        return await u.addContesto(c);
    }
}

inventarioService.removeContenuto = async(data) => {
    if ((!data.idCreazione && !data.idContesto) || (data.idCreazione && data.idContesto)) {
        return Promise.reject("Devi fornire uno tra idCreazione e idContesto!");
    }

    let u = await utente.getById(data.idUtente);
    let c;
    if (data.idCreazione) {
        c = await checkUtenteAndCreazione(data);

        if (!await u.hasCreazione(c))
            return Promise.reject("Creazione non presente nell'Inventario!");

        return await u.removeCreazione(c);
    } else if (data.idContesto) {
        c = await checkUtenteAndContesto(data);

        if (!await u.hasContesto(c))
            return Promise.reject("Contesto non presente nell'Inventario!");

        return await u.removeContesto(c);
    }
}

async function checkUtenteAndCreazione(data) {
    if (!utils.checkParameters(data, ['idUtente', 'idCreazione']))
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

async function checkUtenteAndContesto(data) {
    if (!utils.checkParameters(data, ['idUtente', 'idContesto']))
        return Promise.reject("Dati non validi!");

    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    if (!utils.checkId(data.idContesto))
        return Promise.reject("ID contesto non valido!");

    let c = await contesto.getContestoById(data.idContesto);
    if (c == null)
        return Promise.reject("Contesto non trovato!");

    return c;
}

module.exports = inventarioService;