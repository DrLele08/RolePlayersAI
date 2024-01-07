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