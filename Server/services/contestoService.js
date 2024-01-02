const contesto = require("../models/contesto");
const utils = require("../models/utils");



const contestoService = {};

const requiredFields = ['nome','fkUtente', 'fkAmbiente','descrizione', 'isPubblico'];

contestoService.createContesto = async (dati) =>{
    if(utils.checkParameters(dati, requiredFields)){
        dati.nome = dati.nome.trim();
        dati.descrizione = dati.descrizione.trim();
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

contestoService.getAll = async()=>{
    let listaContesti = await contesto.getAll();

    if(listaContesti !== null){
        return listaContesti;
    }
    else{
        return Promise.reject("Lista dei Contesti Vuota");
    }
}

contestoService.deleteContesto = async(idContesto) =>{
    if(utils.checkId(idContesto)) {
        let contestoCercato = await contesto.deleteContesto(idContesto);

        if (contestoCercato !== null) {
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