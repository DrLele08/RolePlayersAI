const relazionePersonaggi=require("../models/relazionePersonaggi");
const utils = require("../models/utils");

const relazionePersonaggiService={};

const requiredFields = ['descrizione', 'fkContesto', 'fkPersonaggio1', 'fkPersonaggio2'];


relazionePersonaggiService.getById = async (idRelazione) =>{
    if(utils.checkId(idRelazione)){
        let relazione = await relazionePersonaggi.getById(idRelazione);
        if(relazione !== null){
            return relazione;
        }
        else{
            return Promise.reject("RelazionePersonaggi non trovata");
        }
    }
    else{
        return Promise.reject("ID minore di 0");
    }
};

relazionePersonaggiService.createRelazionePersonaggi = async (dati) =>{
    if(isValidDati(dati)){
        if(utils.checkId(dati.fkContesto) && utils.checkId(dati.fkPersonaggio1) && utils.checkId(dati.fkPersonaggio2)){
            return relazionePersonaggi.createRelazionePersonaggi(dati);
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        return Promise.reject("Dati non validi");
    }
}

relazionePersonaggiService.getByContesto = async (idContesto) =>{
    if(utils.checkId(idContesto)){
        return relazionePersonaggi.getByContesto(idContesto);
    }
    else{
        return Promise.reject("ID Contesto non valido");
    }
}


//Controlla la validità dei dati per la creazione di una nuova Relazione
function isValidDati(dati){
    if(!dati){
        return false;
    }

    for(const field of requiredFields){
        if(!(field in dati) || dati[field] === undefined || dati[field] === null){
            return false;
        }
    }

    return true;
}


module.exports=relazionePersonaggiService;