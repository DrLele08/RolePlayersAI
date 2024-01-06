const messaggioService = require("../../services/messaggioService");

exports.InviaMessaggio = async(req, res) =>{
    let json = {};

    const messaggio = req.body.messaggio;
    const idConversazione = req.body.idConversazione;

    try{
        const risposta = await messaggioService.inviaMessaggio({
            messaggio: messaggio,
            idConversazione: idConversazione
        });
        json.Ris = 1;
        json.risposta = risposta;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json)
    }
}