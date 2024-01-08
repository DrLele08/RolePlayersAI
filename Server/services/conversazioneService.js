const conversazione=require("../models/conversazione");
const messaggio=require("../models/messaggio");
const utils = require("../models/utils");

const conversazioneService={};

const requiredFields = ['fkSessione', 'fkPersonaggio'];

conversazioneService.getById = async (idConversazione, idUtente) =>{
    if(!utils.checkId(idConversazione) || !utils.checkId(idUtente)){
        return Promise.reject("ID non valido");
    }

    const conv = await conversazione.getById(idConversazione);
    if(conv === null){
        return Promise.reject("Conversazione non trovata")
    }

    if(!await checkUtente(conv, idUtente)){
        return Promise.reject("La conversazione appartiene ad un altro utente");
    }
    else{
        return conv;
    }
};

conversazioneService.getMessages = async (idConversazione, idUtente) =>{
    if(!utils.checkId(idConversazione) || !utils.checkId(idUtente)){
        return Promise.reject("ID non valido");
    }

    const conv = await conversazione.getById(idConversazione);
    if(conv === null){
        return Promise.reject("Conversazione non trovata")
    }

    if(!await checkUtente(conv, idUtente)){
        return Promise.reject("La conversazione appartiene ad un altro utente");
    }

    return await messaggio.getByConversazione(idConversazione);
};

conversazioneService.createConversazione = async (dati)=>{
    if(!utils.checkParameters(dati, requiredFields)){
        return Promise.reject("Dati non validi");
    }

    if(!utils.checkId(dati.fkSessione) || !utils.checkId(dati.fkPersonaggio)){
        return Promise.reject("ID non validi");
    }

    //Prima di crearla controlla se esiste già una conversazione con quel personaggio in quella sessione
    const conv = await conversazione.getBySessioneAndPersonaggio(dati.fkSessione, dati.fkPersonaggio);
    if(conv !== null){
        return Promise.reject("Conversazione gia esistente");
    }
    else{
        return await conversazione.createConversazione(dati);
    }
};


//Controlla se la conversazione appartiene ad una sessione dell`utente
async function checkUtente(conversazione, idUtente) {
    let sessione = await conversazione.getSessione();
    return sessione.fkUtente === idUtente;
}

module.exports=conversazioneService;