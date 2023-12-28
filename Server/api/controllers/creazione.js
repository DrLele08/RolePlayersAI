const creazioneService = require("../../services/creazioneService")

exports.GetById=(req,ris)=>
{
    let json = {};
    let id =  req.params.id;

    creazioneService.getById(id)
        .then((creazione) =>
        {
            json.Ris=1;
            json.Mess="Fatto";
            json.Creazione=creazione;
            ris.json(json);
        })
        .catch((errore)=>
        {
            json.Ris=0;
            json.Mess=errore;
            ris.json(json);
        });

};