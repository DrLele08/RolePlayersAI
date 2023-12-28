const creazione=require("../models/creazione");

const creazioneService={};

creazioneService.getById=async(idCreazione)=>{
    if(idCreazione>0)
    {
        let creazioneCercata = await creazione.getById(idCreazione);
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

creazioneService.DeleteById=async(idCreazione)=>{
    if(idCreazione>0)
    {
        let creazioneEliminata = await creazione.deleteById(idCreazione);
        if(creazioneEliminata !== null)
        {
            return creazioneEliminata;
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
