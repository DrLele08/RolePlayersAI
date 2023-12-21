const utils=require("../../models/utils")
const test=require("../../models/test");

exports.Test=(req,ris)=>{
    let idSquadra=req.params.idSquadra;

    test.getById(idSquadra)
        .then((squadra)=>{
            ris.render("test",{squadra:squadra})
        })
        .catch((errore)=>{
            ris.render("error",{errore:errore})
        });
};
