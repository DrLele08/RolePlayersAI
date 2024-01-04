module.exports=  (ruoli)=> {
    return  (req, res, next) => {
        let json = {}
        // 1.fnsodnfsodfdoqpj
        let authApi = req.headers.authorization;
        if(authApi!==undefined) {
            let authParams = authApi.split(".");
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
                                json.Ris = 0;
                                json.Mess = "Non hai i permessi (ruolo non incluso)";
                                res.json(json);
                            }
                        }
                        else {
                            json.Ris = 0;
                            json.Mess = "Non hai i permessi (utente non trovato)";
                            res.json(json);
                        }


                }).catch((errore)=>{
                    json.Ris = 0;
                    json.Mess = errore;
                    res.json(json);
                });
            }
            else {
                json.Ris = 0;
                json.Mess = "Lunghezza parametri non corretta";
                res.json(json);
            }
        }
        else {
                json.Ris = 0;
                json.Mess = "Non hai i permessi (auth undefinied) ";
                res.json(json);
        }
    };
};


