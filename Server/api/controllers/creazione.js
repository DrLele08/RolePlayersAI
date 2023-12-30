const creazioneService = require("../../services/creazioneService")

exports.GetById = async (req,res)=>{
    let json = {};
    let idCreazione = req.params.idCreazione;//TODO da chiedere

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
    let idCreazione = req.params.idCreazione;//TODO da chiedere

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

exports.GetByFilter = async (req,res)=>{
    let json = {};
    let nome = req.query.Nome;
    let tipo = req.query.Tipo;
    let isPublic = req.query.isPubblico;
    let pagina = req.query.Pagina;

    try{
        const risCreazione = await creazioneService.GetByFilter(nome,tipo,isPublic,pagina);
        json.Ris = 1;
        json.Creazione = risCreazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};


exports.CreateAmbiente = async (req, res)=>{
    let json = {};

    const fkUtente = req.body.fkUtente;
    const nome = req.body.nome;
    const immagine = req.body.immagine;
    const descrizione = req.body.descrizione;
    const is_pubblico = req.body.is_pubblico;
    const tipo = 1;

    try{
        const nuovoAmbiente = creazioneService.createAmbiente({
            fkUtente: fkUtente,
            nome: nome,
            immagine: immagine,
            is_pubblico: is_pubblico,
            tipo: tipo,
            descrizione: descrizione
        });
        json.Ris = 1;
        json.NuovoAmbiente = nuovoAmbiente;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
    }
}
