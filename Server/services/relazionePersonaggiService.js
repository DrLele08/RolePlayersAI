const relazionePersonaggi=require("../models/relazionePersonaggi");
const utils = require("../models/utils");

const relazionePersonaggiService={};

const requiredFields = ['descrizione', 'fkContesto', 'fkPersonaggio1', 'fkPersonaggio2'];


/**
 * Ottiene una relazione tra personaggi dal database tramite il suo ID
 * @async
 * @function
 * @param {number} idRelazione - Identificativo univoco della relazione.
 * @returns {Object} Oggetto contente i dettagli della relazione.
 * @throws {Error} se l'ID della relazione non è valido
 * @throws {Error} se la relazione non è stata trovata
 */
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

/**
 * Crea una nuova relazione tra personaggi e la salva nel DB
 * @async
 * @function
 * @param {Object} dati - Oggetto contenente i dati della nuova relazione
 * @param {String} dati.descrizione - Descrizione della relazione
 * @param {Number} dati.fkContesto - ID del contesto
 * @param {String} dati.fkPersonaggio1 - ID del primo personaggio
 * @param {String} dati.fkPersonaggio2 - ID del secondo personaggio
 * @returns {Object} Oggetto contenente i dettagli della relazione appena creata
 * @throws {Error} se non sono stati forniti tutti i dati necessari
 * @throws {Error} se gli ID non sono validi
 * @throws {Error} se la lunghezza della descrizione non è valida
 * @throws {Error} se la creazione fallisce
 */
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

/**
 * Ottiene le relazioni tra personaggi definite in un contesto tramite l`ID del contesto
 * @async
 * @function
 * @param {number} idContesto - Identificativo univoco del contesto.
 * @returns {Object} Array contenente i dettagli delle relazioni
 * @throws {Error} se l'ID del contesto non è valido
 * @throws {Error} se non è stata trovata nessuna relazione
 */
relazionePersonaggiService.getByContesto = async (idContesto) =>{
    if(!utils.checkId(idContesto)){
        return Promise.reject("ID Contesto non valido");
    }

    let relazioni = await relazionePersonaggi.getByContesto(idContesto);
    if(relazioni !== null && relazioni.length > 0){
        return relazioni;
    }
    else{
        return Promise.reject("Nessuna Relazione tra personaggi trovata nel contesto")
    }
}

module.exports=relazionePersonaggiService;