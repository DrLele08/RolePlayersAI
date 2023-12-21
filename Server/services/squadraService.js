const squadra=require("../models/squadra");

const squadraService={};

squadraService.getById=(idSquadra)=>{
    if(idSquadra>0)
    {
        return squadra.getById(idSquadra);
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

module.exports=squadraService;
