const contesto = require("../models/contesto");
const creazione = require("../models/creazione");
const utils = require("../models/utils");

const contestoService = {};

const requiredFields = ['nome','fkUtente','listaPersonaggi', 'fkAmbiente','descrizione', 'isPubblico'];

contestoService.createContesto = async (dati) =>{
    if(utils.checkParameters(dati, requiredFields)){
        if(utils.checkId(dati.fkUtente)) {
            if (utils.checkId(dati.fkAmbiente)) {
                dati.nome = dati.nome.trim();
                dati.descrizione = dati.descrizione.trim();

                if (dati.nome.length > 1 && dati.nome.length < 50) {

                    if (dati.descrizione.length > 20 && dati.descrizione.length < 512) {

                        if(dati.isPubblico.toString().length > 0 && !isNaN(dati.isPubblico)) {
                            let isPubblico = parseInt(dati.isPubblico);
                            if (isPubblico === 0 || isPubblico === 1) {

                                if (Array.isArray(dati.listaPersonaggi)) {
                                    const contestoCreato = await contesto.createContesto(dati);
                                    for (const personaggio of dati.listaPersonaggi) {
                                        const personaggioTrovato = await creazione.getById(personaggio);
                                        if (personaggioTrovato.tipo === "Personaggio") {
                                            if (utils.checkId(personaggio)) {
                                                await contestoCreato.addCreazione(personaggio);
                                            }
                                        }
                                    }
                                    return contestoCreato;
                                }
                                else{
                                    return Promise.reject("Array listaPersonaggi non valido");
                                }
                            }
                            else {
                                return Promise.reject("Parametro isPubblico non valido");
                            }
                        }
                    }
                    else{
                        return Promise.reject("Descrizione non valida");
                    }
                }
                else{
                    return Promise.reject("Nome non valido")
                }
            }
            else {
                return Promise.reject("Id Ambiente non valido");
            }
        }
        else{
            return Promise.reject("Id Utente non valido");
        }
    }

    else{
        return Promise.reject("Creazione Contesto fallita");
    }
}

contestoService.getContestoById = async(dati) =>{
    if(dati.idContesto > 0)
    {
        let contestoCercato = await contesto.getContestoById(dati.idContesto);
        if(contestoCercato !== null)
        {
            if(contestoCercato.isPubblico){
                return contestoCercato;
            }
            else if (contestoCercato.fkUtente===dati.idUtente || dati.idRuolo ===2 || dati.idRuolo===3){
                return contestoCercato;
            }
            else {
                return Promise.reject("Non hai i permessi");
            }
        }
        else
        {
            return Promise.reject("Contesto non trovato");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

contestoService.getAll = async()=>{
    let listaContesti = await contesto.getAll();

    if(listaContesti !== null){
        return listaContesti;
    }
    else{
        return Promise.reject("Lista dei Contesti Vuota");
    }
}

contestoService.deleteContesto = async(dati) =>{
    if(dati.idContesto) {
        let contestoEliminata = await contesto.deleteContesto(dati.idContesto);

        if (contestoEliminata !== null) {
            if (dati.idRuolo === 2 || dati.idRuolo === 3) {
                return contesto.deleteContesto(dati.idContesto);
            } else {
                return Promise.reject("Non hai i permessi");
            }
        } else {
            return Promise.reject("Contesto non trovato");
        }
    }
    else{
        return Promise.reject("ID minore di 0");
    }
}

contestoService.getByFilter = async (nome, page, dati)=>{
    if(page > 0) {
        let filters = {};
        if (nome !== undefined) {
            nome = nome.trim();
            if (nome.length > 0) {
                filters.nome = nome;
            }

        }
        return contesto.getByFilter(filters, page,dati);
    }
    else{
        return Promise.reject("Pagina non valida");
    }
}

module.exports=contestoService;