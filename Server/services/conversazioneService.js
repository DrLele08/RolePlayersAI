const conversazione=require("../models/conversazione");
const messaggio=require("../models/messaggio");
const utils = require("../models/utils");

/**
 * Oggetto contenente funzioni per la gestione delle conversazioni.
 * @namespace
 * @property {Function} getById - Ottiene una conversazione dal database tramite il suo ID.
 * @property {Function} getMessages - Ottiene i messaggi di una conversazione paginati.
 * @property {Function} createConversazione - Crea una nuova conversazione nel database.
 */
const conversazioneService={};

const requiredFields = ['fkSessione', 'fkPersonaggio'];

/**
 * Ottiene una conversazione dal database tramite il suo ID verificando che appartenga all`utente specificato.
 * @async
 * @function
 * @param {number} idConversazione - Identificativo univoco della conversazione.
 * @param {number} idUtente - Identificativo univoco dell'utente.
 * @returns {Promise<Object>} La conversazione se trovata e appartenente all'utente, altrimenti viene restituito un errore.
 * @throws {Error} se l'ID della conversazione o dell'utente non è valido
 * @throws {Error} se la conversazione non è stata trovata.
 * @throws {Error} se la conversazione appartiene ad un altro utente
 */
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

/**
 * Ottiene i messaggi di una conversazione paginati verificando che la conversazione appartenga all`utente specificato.
 * @async
 * @function
 * @param {number} idConversazione - Identificativo univoco della conversazione.
 * @param {number} pagina - Numero di pagina per la paginazione.
 * @param {number} idUtente - Identificativo univoco dell'utente.
 * @returns {Promise<Array<Object>>} Un array contenente i messaggi paginati della conversazione.
 * @throws {Error} se l'ID della conversazione o dell'utente non è valido.
 * @throws {Error} se la conversazione non è stata trovata.
 * @throws {Error} Viene lanciato un errore se la conversazione appartiene ad un altro utente.
 */
conversazioneService.getMessages = async (idConversazione, pagina, idUtente) =>{
    if(!utils.checkId(idConversazione) || !utils.checkId(idUtente)){
        return Promise.reject("ID non valido");
    }

    if(pagina < 1){
        pagina = 1;
    }

    const conv = await conversazione.getById(idConversazione);
    if(conv === null){
        return Promise.reject("Conversazione non trovata")
    }

    if(!await checkUtente(conv, idUtente)){
        return Promise.reject("La conversazione appartiene ad un altro utente");
    }

    return await messaggio.getByConversazionePaginated(idConversazione, pagina);
};

/**
 * Crea una nuova conversazione nel database verificando i dati e l'esistenza di conversazioni duplicate.
 * @async
 * @function
 * @param {Object} dati - Oggetto contenente i dati per la creazione della conversazione.
 * @param {number} dati.fkSessione - Chiave esterna che collega la conversazione a una sessione.
 * @param {number} dati.fkPersonaggio - Chiave esterna che collega la conversazione a un personaggio.
 * @returns {Promise<Object>} La conversazione appena creata e salvata nel db.
 * @throws {Error} Viene lanciato un errore se i dati non sono validi.
 * @throws {Error} se gli ID non sono validi.
 * @throws {Error} Viene lanciato un errore se esiste già una conversazione duplicata.
 */
conversazioneService.createConversazione = async (dati)=>{
    if(!utils.checkParameters(dati, requiredFields)){
        return Promise.reject("Dati non validi");
    }

    if(!utils.checkId(dati.fkSessione) || !utils.checkId(dati.fkPersonaggio)){
        return Promise.reject("ID non validi");
    }

    //Prima di crearla controlla se esiste già una conversazione con quel personaggio in quella sessione
    const conv = await conversazione.getBySessioneAndPersonaggio(dati.fkSessione, dati.fkPersonaggio);
    if(conv.length !== 0){
        return Promise.reject("Conversazione gia esistente");
    }
    else{
        return await conversazione.createConversazione(dati);
    }
};


/**
 * Controlla se una conversazione appartiene a una sessione dell'utente.
 * @async
 * @function
 * @param {Object} conversazione - Oggetto rappresentante la conversazione.
 * @param {number} idUtente - Identificativo univoco dell'utente.
 * @returns {Promise<boolean>} True se la conversazione appartiene all'utente, altrimenti False.
 */
async function checkUtente(conversazione, idUtente) {
    let sessione = await conversazione.getSessione();
    return sessione.fkUtente === idUtente;
}

module.exports=conversazioneService;