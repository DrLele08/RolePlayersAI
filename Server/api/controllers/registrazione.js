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

    try {
        const nuovoUtente = registrazioneService.createUtente(data);
        json.Ris = 1;
        json.NuovoUtente = nuovoUtente;
    } catch (error) {
        json.Ris = 0;
        json.Mess = error.message || "Errore generico";
    } finally {
        res.json(json);
    }

};
