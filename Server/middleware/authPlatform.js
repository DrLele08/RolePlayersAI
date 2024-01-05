
module.exports=  (ruoli)=> {
    return (req, res, next) => {
        let authPlatoform = req.session;
        if (authPlatoform !== undefined) {
            let id = authPlatoform.idUtente;
            let token = authPlatoform.tokenAuth;
            const utenteModel = require("../models/utente");
            utenteModel.getByIdandTokenAuth(id, token).then((utente) => {
                let idRuolo = 0;
                if (utente.length > 0) {
                    let r = utente[0].ruolo;
                    if (r === 'Utente') {
                        idRuolo = 1;
                    } else if (r === 'Moderatore') {
                        idRuolo = 2;
                    } else if (r === 'Admin') {
                        idRuolo = 3;
                    }

                    if (ruoli.includes(idRuolo)) {
                        req.idUtente = utente[0].idUtente;
                        req.idRuolo = idRuolo;
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

