const utente = require("../../services/utenteService");
const utils = require("../../models/utils");

exports.PaginaContenuti = async(req, ris)=> {
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();

        ris.render("gestionecreazione", {
        Utente: utils.convertToNormalObject(user),
        Abbonamento: utils.convertToNormalObject(abbonamento),
        });
    }catch(error){
    ris.render("error", {errore: error});
    }
};