const utils = require("../models/utils");
const creazione = require("../models/creazione");

const inventarioService = {};

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

inventarioService.getContenuto = async(data) => {

}

inventarioService.removeContenuto = async(data) => {

}

module.exports = inventarioService;