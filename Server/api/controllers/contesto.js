const contestoService = require("../../services/contestoService");

exports.CreateContesto = async (req,res) =>{
    let json = {};

    const nome = req.body.nome;
    const fkUtente = req.body.fkUtente;
    const fkAmbiente = req.body.fkAmbiente;
    const descrizione = req.body.descrizione;
    const isPubblico = req.body.isPubblico;

    try{
        const nuovoContesto = contestoService.createContesto({
            nome: nome,
            fkUtente: fkUtente,
            fkAmbiente: fkAmbiente,
            descrizione: descrizione,
            isPubblico: isPubblico
        })
        json.Ris = 1;
        json.nuovoContesto = nuovoContesto;
        res.json(json);
    }
    catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
}

exports.GetById= async (req,res)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    try {
        const contesto = await contestoService.getById(idContesto);
        json.Ris = 1;
        json.Contesto = contesto;
        res.json(json);
    } catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};

exports.GetAll = async (req,res) =>{
    let json = {};

    try{
        const ListaContesti = await contestoService.getAll();
        json.Ris = 1;
        json.Contesto = ListaContesti;
        res.json(json);
    }
    catch(error){
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
}

exports.DeleteContesto= async (req,res)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    try {
        const contesto = await contestoService.deleteContesto(idContesto);
        json.Ris = 1;
        json.Contesto = contesto;
        res.json(json);
    } catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        res.json(json);
    }
};