const utenteModel = require("../models/utente");

module.exports=  (ruoli)=> {
    return  (req, res, next) => {
        let json = {}
       let authPlatoform = req.session;
        if(authPlatoform!==undefined) {
            let authParams = authPlatoform.split(".");
            if(authParams.length===2) {
                let id = authParams[0];
                let token = authParams[1];
                const utenteModel = require("../models/utente");
                utenteModel.getByIdandTokenAuth(id,token).then((utente)=>{
                    let idRuolo = 0;
                    if(utente.length>0){
                        let r = utente[0].ruolo;
                        if(r==='Utente'){
                            idRuolo = 1;
                        }
                        else if (r === 'Moderatore'){
                            idRuolo= 2;
                        }
                        else if (r === 'Admin')
                        {
                            idRuolo = 3;
                        }

                        if(ruoli.includes(idRuolo))
                        {
                            req.idUtente=utente[0].idUtente;
                            req.idRuolo=idRuolo;
                            next();
                        }
                        else {
                            res.render("error",{errore:"Non hai i permessi"});
                        }
                    }
                    else {
                        res.render("error",{errore:"Non hai i permessi"});
                    }


                }).catch((errore)=>{
                    res.render("error",{errore:"Non hai i permessi"});
                });
            }
            else {
                res.render("error",{errore:"Non hai i permessi"});
            }
        }
        else {
            res.render("error",{errore:"Non hai i permessi"});
        }
    };
};

