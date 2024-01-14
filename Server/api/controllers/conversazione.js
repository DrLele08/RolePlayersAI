const messaggioService = require("../../services/messaggioService");
const conversazioneService = require("../../services/conversazioneService");


/**
 * Controller per l'invio di un messaggio in una conversazione.
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {String} req.body.messaggio - Testo del messaggio
 * @param {Number} req.body.idConversazione - ID della conversazione a cui appartiene il messaggio
 * @param {Number} req.idUtente - ID dell`utente
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.InviaMessaggio = async(req, res) =>{
    let json = {};

    const messaggio = req.body.messaggio;
    const idConversazione = req.body.idConversazione;
    const idUtente = req.idUtente;

    try{
        const risposta = await messaggioService.inviaMessaggio({
            messaggio: messaggio,
            idConversazione: idConversazione,
            idUtente: idUtente
        });
        json.Ris = 1;
        json.Risposta = risposta.risposta;
        json.MsgRimanenti = risposta.msgRimanenti;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json)
    }
};

/**
 * Controller per ottenere una conversazione dato l`ID.
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Number} req.params.idConversazione - ID della conversazione
 * @param {Number} req.idUtente - ID dell`utente
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.GetById = async(req, res) =>{
    let json = {};

    const idConversazione = req.params.idConversazione;
    const idUtente = req.idUtente;

    try{
        const conv = await conversazioneService.getById(idConversazione, idUtente);
        json.Ris = 1;
        json.Conversazione = conv;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json)
    }
};

/**
 * Controller per ottenere i messaggi (paginati) di una conversazione.
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Number} req.query.idConversazione - ID della conversazione
 * @param {Number} req.query.pagina - pagina richiesta
 * @param {Number} req.idUtente - ID dell`utente
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.GetMessages = async(req, res) =>{
    let json = {};

    const idConversazione = req.query.idConversazione;
    const pagina = req.query.pagina;
    console.log(pagina);
    const idUtente = req.idUtente;

    try{
        const conv = await conversazioneService.getMessages(idConversazione, pagina, idUtente);
        json.Ris = 1;
        json.Conversazione = conv;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json)
    }
};