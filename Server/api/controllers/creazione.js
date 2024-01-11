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
        json.Mess = error || "Errore Generico";
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
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};

exports.GetByFilter = async (req,res)=>{
    let json = {};
    let nome = req.query.Nome;
    let tipo = req.query.Tipo;
    let pagina = req.query.Pagina;
    let idUtente= req.idUtente;
    let idRuolo= req.idRuolo;


    try{
        const risCreazione = await creazioneService.getByFilter(nome,tipo,pagina,{
            idUtente: idUtente,
            idRuolo: idRuolo
        });
        json.Ris = 1;
        json.Creazione = risCreazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};


exports.CreateCreazione = async (req, res)=>{
    let json = {};

    const nome = req.body.nome;
    const descrizione = req.body.descrizione;
    const isPubblico = req.body.isPubblico;
    const tipo = req.body.tipo;
    const img = req.file;
    const fkUtente = req.idUtente;
    const sesso = req.body.sesso;


    try{
        const nuovaCreazione = await creazioneService.createCreazione({
            fkUtente: fkUtente,
            nome: nome,
            isPubblico: isPubblico,
            tipo: tipo,
            descrizione: descrizione,
            img:img,
            sesso: sesso
        });
        json.Ris = 1;
        json.NuovaCreazione = nuovaCreazione;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
    }
}
