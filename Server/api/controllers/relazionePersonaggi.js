const relazionePersonaggiService = require("../../services/relazionePersonaggiService");

exports.GetById = async (req,res)=>{
    let json = {};
    let idRelazionePersonaggi = req.params.idRelazionePersonaggi;

    try{
        const relazione = await relazionePersonaggiService.getById(idRelazionePersonaggi);
        json.Ris = 1;
        json.Mess = "OK";
        json.RelazionePersonaggi = relazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};

exports.GetByContesto = async (req,res)=>{
    let json = {};
    let idContesto = req.params.idContesto;

    try{
        const relazioni = await relazionePersonaggiService.getByContesto(idContesto);
        json.Ris = 1;
        json.Mess = "OK";
        json.RelazioniPersonaggi = relazioni;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};

exports.CreateRelazionePersonaggi = async (req, res)=>{
    let json = {};

    const descrizione = req.body.descrizione;
    const fkContesto = req.body.fkContesto;
    const fkPersonaggio1 = req.body.fkPersonaggio1;
    const fkPersonaggio2 = req.body.fkPersonaggio2;

    try{
        const nuovaRelazione = relazionePersonaggiService.createRelazionePersonaggi({
            descrizione: descrizione,
            fkContesto: fkContesto,
            fkPersonaggio1: fkPersonaggio1,
            fkPersonaggio2: fkPersonaggio2
        });
        json.Ris = 1;
        json.Mess = "OK";
        json.NuovaRelazionePersonaggi = nuovaRelazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess
    }
}