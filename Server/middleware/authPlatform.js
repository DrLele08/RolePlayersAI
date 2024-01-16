
module.exports=  (ruoli)=> {
    return (req, res, next) => {
        let idUtenteCookie=req.cookies.idUtente;
        if(idUtenteCookie !== undefined)
        {
            let tokenAuthCookie=req.cookies.tokenAuth;
            req.session.idUtente=idUtenteCookie;
            req.session.authToken=tokenAuthCookie;
        }

        let id = req.session.idUtente;

        if (id !== undefined) {
            let token = req.session.authToken;
            const utenteModel = require("../models/utente");
            utenteModel.getByIdandTokenAuth(id, token).then((utente) => {
                let idRuolo = 0;
                if (utente.length > 0) {
                    let r = utente[0].ruolo;
                    if (r === 'Utente') {
                        idRuolo = 1;
                    } else if (r === 'Moderatore') {
                        idRuolo = 2;
                    } else if (r === 'Amministratore') {
                        idRuolo = 3;
                    }

                    if (ruoli.includes(idRuolo)) {
                        req.idUtente = utente[0].idUtente;
                        req.idRuolo = idRuolo;
                        res.locals.idUtente=req.session.idUtente;
                        res.locals.authToken=req.session.authToken;
                        next();
                    } else {
                        res.render("error", {errore: "Non hai i permessi"});
                    }
                } else {
                    res.render("error", {errore: "Non hai i permessi"});
                }


            }).catch((errore) => {
                res.render("error", {errore: errore});
            });

        } else {
            res.render("error", {errore: "Non hai i permessi"});
        }
    }
        ;
};

