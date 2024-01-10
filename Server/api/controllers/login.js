const utenteService = require("../../services/utenteService");

exports.LoginControl = async(req, res) => {
    let json = {};

    if (req.session.idUtente != null)
     {
        res.status(400);
        json.Ris = 0;
        json.Mess = "Hai già effettuato l'accesso!";
        res.json(json);
     }
     else {
        let filters = {
            username: req.body.username,
            email: req.body.email,
        };
        let password = req.body.password;

        let u = await utenteService.Login(filters,password);

        res.status(201)

        // salva ID e auth-token dell'utente nella sessione
        req.session.idUtente = u.idUtente;
        req.session.authToken = u.authToken;

        json.Ris = 1;
        json.Utente = u;

    }
}
