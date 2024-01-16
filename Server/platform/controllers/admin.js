const utente = require("../../services/utenteService");
const utils = require("../../models/utils");

exports.GetAdminPage = async (req, ris) => {
    try{
        const idUtente = req.idUtente;

        const users = await utente.getAll();
        for(let i=0; i<users.length; i++){
            let abbonamento = await users[i].getAbbonamento();
            users[i].dataValues.tierAbbonamento = abbonamento.nomeTier;
        }

        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();

        ris.render("admin_area", {
            Utenti: utils.convertToNormalObject(users),
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento)
        });
    }catch(error){
        ris.render("error", {errore: error});
    }
};