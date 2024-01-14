const utils = require("../models/utils");
const utente = require("../models/utente" );
const sessione = require ("../models/sessione");
const creazione = require("../models/creazione");

const profiloService = {};

profiloService.getInfoProfilo = async(idUtente) =>{
        if(utils.checkId(idUtente)){

            const user = await utente.getById(idUtente);
            const session = await sessione.getByUtente(idUtente);
            const personaggi = await creazione.getByUtenteAndFilters(idUtente, {tipo:"Personaggio"},1);
            const ambienti = await creazione.getByUtenteAndFilters(idUtente, {tipo:"Ambiente"},1);

            return {
                name: user.nome,
                username: user.username,
                numeroPersonaggi: personaggi.pagination.totalCount,
                numeroAmbienti: ambienti.pagination.totalCount,
                numeroSessioni: session.length,
                personaggi: personaggi,
                ambienti: ambienti
            }

        }
}

module.exports=profiloService;
