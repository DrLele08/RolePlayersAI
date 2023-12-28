const creazioneService = require("../../services/creazioneService")



exports.GetById = async (req,res)=>{
    let json = {};
    let idCreazione = req.params.idCreazione;

    try{
        const creazione = await creazioneService.getById(idCreazione);
        json.Ris = 1;
        json.Creazione = creazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};

exports.DeleteById = async (req,res)=>{
    let json = {};
    let idCreazione = req.params.idCreazione;

    try{
        const creazione = await creazioneService.DeleteById(idCreazione);
        json.Ris = 1;
        json.Creazione = creazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};



