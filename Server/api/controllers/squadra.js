const squadraService = require("../../services/squadraService");

exports.GetById=(req,ris)=>{
    let json={};
    let idSquadra=req.params.idSquadra;

    squadraService.getById(idSquadra)
        .then((squadra)=>{
            json.Ris=1;
            json.Mess="Fatto";
            json.Squadra=squadra;
            ris.json(json);
        })
        .catch((errore)=>{
            json.Ris=0;
            json.Mess=errore;
            ris.json(json);
        });
};
