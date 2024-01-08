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

exports.createUtente = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.body.idUtente,
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