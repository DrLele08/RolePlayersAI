const contestoService = require("../../services/contestoService");

exports.GetById= async (req,ris)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    try {
        const contesto = await contestoService.getById(idContesto);
        json.Ris = 1;
        json.Contesto = contesto;
        ris.json(json);
    } catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        ris.json(json);
    }
};

exports.DeleteContesto= async (req,ris)=> {
    let json = {};
    let idContesto = req.params.idContesto;
    try {
        const contesto = await contestoService.deleteContesto(idContesto);
        json.Ris = 1;
        json.Contesto = contesto;
        ris.json(json);
    } catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore Generico";
        ris.json(json);
    }
};