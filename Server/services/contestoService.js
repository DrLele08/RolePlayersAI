const contesto = require("../models/contesto");
const utils = require("../models/utils");

const contestoService = {};

const requiredFields = ['nome','fkUtente', 'fkAmbiente','descrizione', 'isPubblico'];

contestoService.createContesto = async (dati) =>{
    if(utils.checkParameters(dati, requiredFields)){

        //Verifica nome
        dati.nome = dati.nome.trim();
        if(dati.nome < 1 || dati.nome > 50){
             return Promise.reject("Nome non valido");
        }

        //Verifica descrizione
        dati.descrizione = dati.descrizione.trim();
        if(dati.descrizione < 20 || dati.descrizione > 512){
            return Promise.reject("Descrizione non valida");
        }

        //Verifica id Utente
        if(!utils.checkId(dati.fkUtente)){
            return Promise.reject("Id Utente non valido");
        }

        //Verifica id Ambiente
        if(!utils.checkId(dati.fkAmbiente)){
            return Promise.reject("Id Ambiente non valido");
        }

        //Creazione Nuovo Contesto
        let nuovoContesto = await contesto.createContesto(dati);
        if(nuovoContesto !== null){
            return nuovoContesto;
        }
    }
    else{
        return Promise.reject("Creazione Contesto fallita");
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
        let contestoEliminata = await contesto.deleteContesto(idContesto);

        if (contestoEliminata !== null) {
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