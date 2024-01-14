const profilo = require("../../services/profiloService");

exports.GetAreaProfilo = async(req,ris)=>{

    const idUtente = req.idUtente;

    try{
        let infoProfilo = await profilo.getInfoProfilo(idUtente);
        ris.render("personal_area", infoProfilo);
    }
    catch(error){
        ris.render("error", {errore: error});
    }
}