const utente=require("../../services/utenteService");

exports.GetUsername = async (req, ris) => {
    const idUtente = req.idUtente;

    try{
        const user = await utente.getById(idUtente);
        ris.render("header", {username: user.username});
    }catch(error){
        ris.render("error", {errore: error});
    }
};

