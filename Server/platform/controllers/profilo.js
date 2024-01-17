const profilo = require("../../services/profiloService");
const utente = require("../../services/utenteService");
const utils = require("../../models/utils");

exports.GetAreaProfilo = async(req,ris)=>{

    const idUtente = req.idUtente;

    try{
        let infoProfilo = await profilo.getInfoProfilo(idUtente);
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();
        ris.render("personal_area", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento),
            infoProfilo: infoProfilo
        });
    }
    catch(error){
        ris.render("error", {errore: error});
    }
}