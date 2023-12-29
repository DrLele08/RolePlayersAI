const creazione=require("../models/creazione");
const utils = require("../models/utils");


const creazioneService={};

creazioneService.getById=async(idCreazione)=>{
    if(idCreazione>0)
    {
        let creazioneCercata = await creazione.getById(idCreazione);
        if(creazioneCercata !== null)
        {
            return creazioneCercata;
        }
        else
        {
            return Promise.reject("Creazione non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

creazioneService.DeleteById=async(idCreazione)=>{
    if(idCreazione>0)
    {
        let creazioneEliminata = await creazione.deleteById(idCreazione);
        if(creazioneEliminata !== null)
        {
            return creazioneEliminata;
        }
        else
        {
            return Promise.reject("Creazione non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};


creazioneService.createAmbiente = async (dati) =>{
    if(isValidDatiAmbiente(dati)){
        if(utils.checkId(dati.fkUtente)){
            return creazione.createAmbiente(dati);
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        return Promise.reject("Dati non validi");
    }
}

//Controlla la validità dei dati per la creazione di un ambiente
function isValidDatiAmbiente(dati){
    if(!dati){
        return false;
    }

    const requiredFields = ['fkUtente', 'nome', 'immagine', 'descrizione', 'is_pubblico', 'tipo'];
    for(const field of requiredFields){
        if(!(field in dati) || dati[field] === undefined || dati[field] === null){
            return false;
        }
    }

    return true;
}

creazioneService.GetByName=async(nome)=>{
    if(!nome || nome ==='' || nome.length >50) {
        return Promise.reject("Nome non valido");
    }
    else {
        let Lista = await creazione.getByName(nome);
        if (Lista !== null) {
            return Lista;
        } else {
            return Promise.reject("Nessun risultato trovato");
        }
    }

};

creazioneService.GetByType=async(t)=>{
    if(!t || t !=='Personaggio' || t!=='Ambiente') {
        return Promise.reject("Nome non valido");
    }
    else {
        let Lista = await creazione.getByType(t);
        if (Lista !== null) {
            return Lista;
        } else {
            return Promise.reject("Nessun risultato trovato");
        }
    }

};

module.exports=creazioneService;
