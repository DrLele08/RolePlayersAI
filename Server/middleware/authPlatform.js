/*const utenteModel = require("../models/utente");
module.exports=  (ruoli)=> {
    return  (req, res, next) => {
        let json = {}
       // let authPlatoform = req.; //todo come ricavare la sessione
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

                            next();
                        }
                        else {
                            json.Ris = 0;
                            json.Mess = "Non hai i permessi";
                            res.json(json);
                        }
                    }
                    else {
                        json.Ris = 0;
                        json.Mess = "Non hai i permessi";
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
            json.Mess = "Non hai i permessi";
            res.json(json);
        }
    };
};

*/
