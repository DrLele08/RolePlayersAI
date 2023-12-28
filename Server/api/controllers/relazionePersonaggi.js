const relazionePersonaggiService = require("../../services/relazionePersonaggiService");

exports.GetById = async (req,res)=>{
    let json = {};
    let idRelazione = req.params.idRelazione;

    try{
        const relazione = await relazionePersonaggiService.getById(idRelazione);
        json.Ris = 1;
        json.Mess = "OK";
        json.relazionePersonaggi = relazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};