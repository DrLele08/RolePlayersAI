const contesto = require("../models/contesto");
const utils = require("../models/utils");

const contestoService = {};

const requiredFields = ['nome','fkUtente', 'fkAmbiente','descrizione', 'isPubblico'];

contestoService.createContesto = async (dati) =>{
    if(utils.checkParameters(dati, requiredFields)){
        if(utils.checkId(dati.fkUtente)) {
            if (utils.checkId(dati.fkAmbiente)) {
                dati.nome = dati.nome.trim();
                dati.descrizione = dati.descrizione.trim();

                if (dati.nome.length > 1 && dati.nome.length < 50) {

                    if (dati.descrizione.length > 20 && dati.descrizione.length < 512) {
                        if(dati.isPubblico === 0 || dati.isPubblico === 1) {
                            return await contesto.createContesto(dati);
                        }
                        else{
                            return Promise.reject("Parametro isPubblico non valido");
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