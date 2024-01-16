const sessione = require("../../services/sessioneService");
const utils = require("../../models/utils");
const utente = require("../../services/utenteService");

exports.GetConversazione = async (req, res) => {
    try{
        const idUtente = req.idUtente;
        const idSessione = req.params.idSessione;
        let data = {
            idUtente: idUtente,
            idSessione: idSessione
        }
        const session = await sessione.accessoSessione(data);
        const conversazioni = await session.getConversazioni();
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();

        let conversazioniPersonaggi = [];

        for(let i=0; i<conversazioni.length; i++){
            const personaggio = await conversazioni[i].getPersonaggio();

            conversazioniPersonaggi.push({
                idConversazione: conversazioni[i].idConversazione,
                personaggio: personaggio
            });
        }

        res.render("conversazione", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento),
            Sessione: utils.convertToNormalObject(session),
            Conversazioni: utils.convertToNormalObject(conversazioniPersonaggi)
        });
    }catch(error){
        res.render("error", {errore: error});
    }
};

exports.GetSessioni = async (req, res)=>{
    try{
        const idUtente = req.idUtente;
        const sessioni = await sessione.getByUtente(idUtente);
        const user = await utente.getById(idUtente);
        const abbonamento = await user.getAbbonamento();
        const contesti = await user.getContestos();

        res.render("gestionesessione", {
            Utente: utils.convertToNormalObject(user),
            Abbonamento: utils.convertToNormalObject(abbonamento),
            Sessioni: utils.convertToNormalObject(sessioni),
            Contesti: utils.convertToNormalObject(contesti)
        });
    }catch(error){
        res.render("error", {errore: error});
    }
};