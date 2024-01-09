const utils = require("../models/utils");

const inventarioService = {};

inventarioService.getInventario = async(data) => {
    if (!utils.checkId(data.idUtente))
        return Promise.reject("ID utente non valido!");

    if (data.tipo)
}

inventarioService.getContenuto = async(data) => {

}

inventarioService.removeContenuto = async(data) => {

}