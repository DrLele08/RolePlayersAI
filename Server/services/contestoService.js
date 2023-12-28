const contesto = require("../models/contesto");
const utils = require("../models/utils");
const relazionePersonaggi = require("../models/relazionePersonaggi");

const contestoService = {};

contestoService.createContesto = async (dati) =>{
    if(isValidDatiContesto(dati)){
        if(utils.checkId(dati.FkUtente) && utils.checkId(dati.FkAmbiente)){
            return contesto.createContesto(dati);
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        return Promise.reject("Dati non validi");
    }
}

contestoService.getById = async(idContesto) =>{
    if(utils.checkId(idContesto))
    {
        let contestoCercato = await contesto.getById(idContesto);
        if(contestoCercato !== null)
        {
            return contestoCercato;
        }
        else
        {
            return Promise.reject("Contesto non trovato");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

contestoService.deleteContesto = async(idContesto) =>{
    if(utils.checkId(idContesto)) {
        let ContestoCercato = await contesto.deleteContesto(idContesto);

        if (ContestoCercato !== null) {
            return idContesto;
        } else {
            return Promise.reject("Contesto non trovato");
        }
    }
    else{
        return Promise.reject("ID minore di 0");
    }
}



function isValidDatiContesto(dati){
    if(!dati){
        return false;
    }

    const requiredFields = ['nome', 'descrizione', 'isPubblico', 'FkUtente', 'FkAmbiente'];
    for(const field of requiredFields){
        if(!(field in dati) || dati[field] === undefined || dati[field] === null){
            return false;
        }
    }

    return true;
}

module.exports=contestoService;