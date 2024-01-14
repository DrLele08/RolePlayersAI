const utenteService = require("../../services/utenteService");

exports.LoginControl = async(req, res) => {
    let json = {};

    if (req.session && req.session.idUtente !== undefined) {
        delete req.session.idUtente;
        delete req.session.authToken;
    }

    if (req.cookies && req.cookies.idUtente !== undefined) {
        res.clearCookie('idUtente');
        res.clearCookie('tokenAuth');
    }


        let filters = {
            username: req.body.username,
            email: req.body.email,
        };
        let password = req.body.password;
        try {
            let u = await utenteService.Login(filters, password);

            // salva ID e auth-token dell'utente nella sessione
            req.session.idUtente = u.idUtente;
            req.session.authToken = u.authToken;

            let ricordami = req.body.ricordami;
            if (ricordami === 1) {
                res.cookie('idUtente', u.idUtente, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                res.cookie('tokenAuth', u.authToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            }

            json.Ris = 1;
            json.Utente = u;
            res.json(json);
        } catch (error){
            json.Ris = 0;
            json.Mess = error.message
            res.json(json);
        }
}
