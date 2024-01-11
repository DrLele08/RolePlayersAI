const utenteService = require("../../services/utenteService");

exports.LoginControl = async(req, res) => {
    let json = {};
  /*

    Non devo fare nessun controllo visto che posso accedere con un nuovo account?

     if (req.session.idUtente !== undefined)
     {
         let r = req.body.ricordami;
        json.Ris = 0;
        json.Mess = "Hai già effettuato l'accesso!";
        res.json(json);
     }
     else {


 */
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
            json.Mess = error
            res.json(json);
        }
    //}
}
