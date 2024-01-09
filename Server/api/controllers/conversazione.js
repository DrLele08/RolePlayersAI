const messaggioService = require("../../services/messaggioService");
const conversazioneService = require("../../services/conversazioneService");

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

exports.GetMessages = async(req, res) =>{
    let json = {};

    const idConversazione = req.params.idConversazione;
    const idUtente = req.idUtente;

    try{
        const conv = await conversazioneService.getMessages(idConversazione, idUtente);
        json.Ris = 1;
        json.Conversazione = conv;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json)
    }
};