const utenteService = require("../../services/utenteService");

exports.getUtenti = async(req, res) => {
    let json = {};

    let data = {
        filters: {
            fkAbbonamento: req.query.abbonamento,
            username: req.query.username,
            ruolo: req.query.ruolo
        },
        pagina: req.query.pagina
    }

    await utenteService.getByFilters(data).then(result => {
        res.status(200);
        json.Ris = 1;
        json.Utenti = result.utenti;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}

exports.setRuolo = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.body.idUtente,
        ruolo: req.body.ruolo
    }

    await utenteService.setRuolo(data).then(result => {
        res.status(200);
        json.Ris = 1;
        json.AggiornamentiEffettuati = result[0];
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));

}