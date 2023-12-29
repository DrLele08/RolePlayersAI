const contesto = require("../models/contesto");
const utils = require("../models/utils");

const contestoService = {};

contestoService.createContesto = async (dati) =>{
    if(utils.isValidDatiContesto(dati)){
        if(utils.checkId(dati.fkUtente) && utils.checkId(dati.fkAmbiente)){
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

module.exports=contestoService;