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
        json.stato = "Utente registato correttamente!";
        json.utente = utente;
    }).catch(error => {
        res.status(400);
        json.stato = "Si è verificato un errore!";
        json.errore = error;
    }).finally(() => res.json(json));

};
