const sessioneService = require("../../services/sessioneService");

exports.getByUtente = async(req, res) => {
    let json = {};

    let idUtente = req.params.idUtente;

    sessioneService.getByUtente(idUtente).then((sessioni) => {
        res.status(200);
        json.Ris = 1;
        json.Sessioni = sessioni;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}

exports.createSessione = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        idContesto: req.body.idContesto,
        titolo: req.body.titolo
    };

    sessioneService.createSessione(data).then((sessione) => {
        res.status(201);
        json.Ris = 1;
        json.Sessione = sessione;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}

exports.accessoSessione = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        idSessione: req.params.idSessione
    }

    sessioneService.accessoSessione(data).then(result => {
        res.status(200);
        json.Ris = 1;
        json.Sessione = result;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}

exports.deleteById = async (req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        idSessione: req.params.idSessione
    }

    sessioneService.deleteById(data).then(() => {
        res.status(200);
        json.Ris = 1;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}