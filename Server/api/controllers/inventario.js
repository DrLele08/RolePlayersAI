const inventarioService = require("../../services/inventarioService")

exports.getInventario = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        filters: {
            nome: req.query.nome,
            tipo: req.query.tipo
        },
        pagina: req.query.pagina
    }

    await inventarioService.getInventario(data).then(result => {
        res.status(200);
        json = result;
        json.Ris = 1;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));

}

exports.addContenuto = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        idCreazione: req.body.idCreazione
    }

    await inventarioService.addContenuto(data).then(result => {
        res.status(200);
        json.Ris = 1;
        json.Aggiunto = result;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}

exports.removeContenuto = async(req, res) => {
    let json = {};

    let data = {
        idUtente: req.idUtente,
        idCreazione: req.body.idCreazione
    }

    await inventarioService.removeContenuto(data).then(result => {
        res.status(200);
        json.Ris = 1;
        json.CreazioniRimosse = result;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico";
    }).finally(() => res.json(json));
}