const utils = require("../models/utils");
const utente=require("../models/utente");

const utenteService={};

utenteService.getById = async (idUtente) =>{
    if(!utils.checkId(idUtente)){
        return Promise.reject("ID non valido");
    }

    let utenteCercato = await utente.getById(idUtente);
    if(utenteCercato !== null){
        return utenteCercato;
    }
    else{
        return Promise.reject("Utente non trovato");
    }
};