const creazione=require("../models/creazione");

const creazioneService={};

creazioneService.getById=async(id)=>{
    if(id>0)
    {
        let creazioneCercata = await creazione.getById(id);
        if(creazioneCercata !== null)
        {
            return creazioneCercata;
        }
        else
        {
            return Promise.reject("Creazione non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

module.exports=creazioneService;
