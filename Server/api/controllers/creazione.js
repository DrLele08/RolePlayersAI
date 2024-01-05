const creazioneService = require("../../services/creazioneService")

exports.GetById = async (req,res)=>{
    let json = {};
    let idCreazione = req.params.idCreazione;
    let idUtente = req.idUtente;
    let idRuolo = req.idRuolo;
    try{
        const creazione = await creazioneService.getById({
            idCreazione: idCreazione,
            idUtente: idUtente,
            idRuolo: idRuolo
        });
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
    let idUtente = req.idUtente;
    let idRuolo = req.idRuolo;

    try{
        const creazione = await creazioneService.DeleteById({
            idCreazione: idCreazione,
            idUtente: idUtente,
            idRuolo: idRuolo
        });
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
    let pagina = req.query.Pagina;

    try{
        const risCreazione = await creazioneService.getByFilter(nome,tipo,pagina);
        json.Ris = 1;
        json.Creazione = risCreazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};


exports.CreateCreazione = async (req, res)=>{
    let json = {};

    const fkUtente = req.body.fkUtente;
    const nome = req.body.nome;
    const immagine = req.body.immagine;
    const descrizione = req.body.descrizione;
    const isPubblico = req.body.isPubblico;
    const tipo = req.body.tipo;
    const img = req.file;

    try{
        const nuovaCreazione = creazioneService.createCreazione({
            fkUtente: fkUtente,
            nome: nome,
            immagine: immagine,
            isPubblico: isPubblico,
            tipo: tipo,
            descrizione: descrizione,
            img:img
        });
        json.Ris = 1;
        json.NuovaCreazione = nuovaCreazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
    }
}
