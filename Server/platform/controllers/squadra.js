const utils=require("../../models/utils")
const squadra=require("../../services/squadraService");

exports.GetById=(req,ris)=>{
    let idSquadra=req.params.idSquadra;

    squadra.getById(idSquadra)
        .then((squadra)=>{
            ris.render("test",{squadra:squadra})
        })
        .catch((errore)=>{
            ris.render("error",{errore:errore})
        });
};
