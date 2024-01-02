const relazionePersonaggi=require("../models/relazionePersonaggi");
const utils = require("../models/utils");

const relazionePersonaggiService={};

const requiredFields = ['descrizione', 'fkContesto', 'fkPersonaggio1', 'fkPersonaggio2'];


relazionePersonaggiService.getById = async (idRelazione) =>{
    if(!utils.checkId(idRelazione)){
        return Promise.reject("ID non valido");
    }

    let relazione = await relazionePersonaggi.getById(idRelazione);
    if(relazione !== null){
        return relazione;
    }
    else{
        return Promise.reject("Relazione tra personaggi non trovata");
    }
};

relazionePersonaggiService.createRelazionePersonaggi = async (dati) =>{
    //Verifica Parametri obbligatori
    if(!utils.checkParameters(dati, requiredFields)){
        return Promise.reject("Dati non validi");
    }

    //Verifica id contesto
    if(!utils.checkId(dati.fkContesto)){
        return Promise.reject("ID contesto non valido");
    }

    //Verifica id personaggi
    if(!utils.checkId(dati.fkPersonaggio1) || !utils.checkId(dati.fkPersonaggio2) || dati.fkPersonaggio1 === dati.fkPersonaggio2){
        return Promise.reject("ID personaggi non validi");
    }

    //Verifica descrizione
    dati.descrizione = dati.descrizione.trim();
    if(dati.descrizione.length < 2 || dati.descrizione.length > 255){
        return Promise.reject("Lunghezza della descrizione non valida");
    }

    //Creazione nuova relazione
    let nuovaRelazione = await relazionePersonaggi.createRelazionePersonaggi(dati);
    if(nuovaRelazione !== null){
        return nuovaRelazione;
    }
    else{
        return Promise.reject("Creazione relazione tra personaggi fallita");
    }
}

relazionePersonaggiService.getByContesto = async (idContesto) =>{
    if(!utils.checkId(idContesto)){
        return Promise.reject("ID Contesto non valido");
    }

    let relazioni = await relazionePersonaggi.getByContesto(idContesto);
    if(relazioni !== null){
        return relazioni;
    }
    else{
        return Promise.reject("Nessuna Relazione tra personaggi trovata nel contesto")
    }
}

module.exports=relazionePersonaggiService;