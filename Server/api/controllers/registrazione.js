const registrazioneService = require("../../services/registrazioneService");

exports.CreateUtente = async(req, res) => {
    let json = {};

    let data = {
        username: req.body.username,
        nome: req.body.nome,
        cognome: req.body.cognome,
        email: req.body.email,
        password: req.body.password,
        dataNascita: req.body.dataNascita,
        telefono: req.body.telefono
    };

    registrazioneService.createUtente(data).then((utente) => {
        res.status(201);
        json.Ris = 1;
        json.Utente = utente;
    }).catch(error => {
        res.status(400);
        json.Ris = 0;
        json.Mess = error || "Errore generico!";
    }).finally(() => res.json(json));

};
