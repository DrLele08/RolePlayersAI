const squadra=require("../models/squadra");

const squadraService={};

squadraService.getById=async(idSquadra)=>{
    if(idSquadra>0)
    {
        let squadraCercata=await squadra.getById(idSquadra);
        if(squadraCercata !== null)
        {
            return squadraCercata;
        }
        else
        {
            return Promise.reject("Squadra non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

module.exports=squadraService;
