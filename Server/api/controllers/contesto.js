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
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
}

exports.GetContestoById= async (req,res)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    let idUtente = req.idUtente;
    let idRuolo = req.idRuolo;
    try{
        const contesto = await contestoService.getContestoById({
            idContesto: idContesto,
            idUtente: idUtente,
            idRuolo: idRuolo
        });
        json.Ris = 1;
        json.Contesto = contesto;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};

exports.DeleteContesto= async (req,res)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    let idUtente = req.idUtente;
    let idRuolo = req.idRuolo;

    try {
        const contesto = await contestoService.deleteContesto({
            idContesto: idContesto,
            idUtente: idUtente,
            idRuolo: idRuolo
        });
        json.Ris = 1;
        json.Contesto = contesto;
        res.json(json);
    } catch (error) {
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};

exports.GetByFilter = async (req,res)=>{
    let json = {};
    let nome = req.query.Nome;
    let pagina = req.query.Pagina;
    let idUtente= req.idUtente;
    let idRuolo= req.idRuolo;


    try{

        const risContesto = await contestoService.getByFilter(nome,pagina,{
            idUtente: idUtente,
            idRuolo: idRuolo
        });
        json.Ris = 1;
        json.Contesto = risContesto;
        res.json(json);
    }catch (error){
        json.Ris = 0;
        json.Mess = error || "Errore Generico";
        res.json(json);
    }
};