const relazionePersonaggi=require("../models/relazionePersonaggi");
const utils = require("../models/utils");

const relazionePersonaggiService={};


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
        if(utils.checkId(dati.contesto_id) && utils.checkId(dati.personaggio1_id) && utils.checkId(dati.personaggio2_id)){
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

    const requiredFields = ['descrizione', 'contesto_id', 'personaggio1_id', 'personaggio2_id'];
    for(const field of requiredFields){
        if(!(field in dati) || dati[field] === undefined || dati[field] === null){
            return false;
        }
    }

    return true;
}


module.exports=relazionePersonaggiService;