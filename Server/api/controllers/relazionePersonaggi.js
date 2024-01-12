const relazionePersonaggi = require("../../services/relazionePersonaggiService");

/**
 * Controller per ottenere una relazione tra personaggi dato l`id
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Number} req.params.idRelazionePersonaggi - ID della relazione
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.GetById = async (req,res)=>{
    let json = {};
    let idRelazionePersonaggi = req.params.idRelazionePersonaggi;

    try{
        const relazione = await relazionePersonaggi.getById(idRelazionePersonaggi);
        json.Ris = 1;
        json.RelazionePersonaggi = relazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};

/**
 * Controller per ottenere le relazioni tra personaggi in un contesto
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Number} req.params.idContesto - ID del contesto
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.GetByContesto = async (req,res)=>{
    let json = {};
    let idContesto = req.params.idContesto;

    try{
        const relazioni = await relazionePersonaggi.getByContesto(idContesto);
        json.Ris = 1;
        json.RelazioniPersonaggi = relazioni;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};

/**
 * Controller per creare una nuova relazione
 * @async
 * @function
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {String} req.body.descrizione - descrizione della relazione
 * @param {Number} req.body.fkContesto - ID del contesto
 * @param {Number} req.body.fkPersonaggio1 - ID del primo personaggio
 * @param {Number} req.body.fkPersonaggio2 - ID del secondo personaggio
 * @param {Object} res - Oggetto della risposta HTTP.
 * @throws {Error} Viene lanciato un errore se le informazioni richieste non sono fornite correttamente nella richiesta.
 */
exports.CreateRelazionePersonaggi = async (req, res)=>{
    let json = {};

    const descrizione = req.body.descrizione;
    const fkContesto = req.body.fkContesto;
    const fkPersonaggio1 = req.body.fkPersonaggio1;
    const fkPersonaggio2 = req.body.fkPersonaggio2;

    try{
        const nuovaRelazione = await relazionePersonaggi.createRelazionePersonaggi({
            descrizione: descrizione,
            fkContesto: fkContesto,
            fkPersonaggio1: fkPersonaggio1,
            fkPersonaggio2: fkPersonaggio2
        });
        json.Ris = 1;
        json.NuovaRelazionePersonaggi = nuovaRelazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json)
    }
}