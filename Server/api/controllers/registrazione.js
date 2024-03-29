const utenteService = require("../../services/utenteService");

exports.createUtente = async(req, res) => {
    let json = {};

    if (req.session.idUtente != null) {
        json.Ris = 0;
        json.Mess = "Hai già effettuato l'accesso!";
        res.json(json);
    } else {
        let data = {
            username: req.body.username,
            nome: req.body.nome,
            cognome: req.body.cognome,
            email: req.body.email,
            password: req.body.password,
            dataNascita: req.body.dataNascita,
            telefono: req.body.telefono
        };

        utenteService.createUtente(data).then((utente) => {

            // salva ID e auth-token dell'utente nella sessione
            req.session.idUtente = utente.idUtente;
            req.session.authToken = utente.authToken;

            res.cookie('idUtente', utente.idUtente, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.cookie('tokenAuth', utente.authToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            if (req.cookies && req.cookies.idUtente !== undefined) {
                res.clearCookie('idUtente');
                res.clearCookie('tokenAuth');
            }

            json.Ris = 1;
            json.Utente = utente;
        }).catch(error => {
            json.Ris = 0;
            json.Mess = error || "Errore generico";
        }).finally(() => res.json(json));
    }
};
