const creazione=require("../models/creazione");
const utils = require("../models/utils");
const fs = require('fs');

const creazioneService={};
const requiredFields = ['fkUtente', 'nome', 'descrizione', 'isPubblico', 'tipo'];

creazioneService.getById=async(dati)=>{
    if(dati.idCreazione>0)
    {
        let creazioneCercata = await creazione.getById(dati.idCreazione);

        if(creazioneCercata !== null)
        {
            if(creazioneCercata.isPubblico)
            {
                return creazioneCercata;
            }
            else if (creazioneCercata.fkUtente===dati.idUtente || dati.idRuolo ===2 || dati.idRuolo===3){
                return creazioneCercata;
            }
            else {
                return Promise.reject("Non hai i permessi");
            }

        }

        else
        {
            return Promise.reject("Creazione non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

creazioneService.DeleteById=async(dati)=>{
    if(dati.idCreazione>0) {
        let creazione = await creazione.getById(dati.idCreazione);
        if (creazione !== null) {

            if (dati.idRuolo === 2 || dati.idRuolo === 3) {
                return creazione.deleteById(dati.idCreazione);
            } else {
                return Promise.reject("Non hai i permessi");
            }
        }
        else
        {
            return Promise.reject("Creazione non trovata");
        }
    }
    else
    {
        return Promise.reject("ID minore di 0");
    }
};

creazioneService.createCreazione = async (dati) =>{
    if(utils.checkParameters(dati, requiredFields)){
        if(utils.checkId(dati.fkUtente)){
            let err = 0;
            dati.nome = dati.nome.trim();
            dati.descrizione = dati.descrizione.trim();
            dati.tipo = dati.tipo.trim();

            if (dati.nome.length > 0 && dati.nome.length < 51 ) {

                }
            else {
                err = 1;
            }
            if(dati.idUtente!==dati.fkUtente)
            {
                err = 1;
            }
            if (dati.descrizione.length > 0 && dati.descrizione.length < 513) {

            }
            else{
                err = 1;
            }
            if (dati.tipo !== 'Personaggio' || 'Ambiente') {
                err = 1;
            }

            if(err)
            {
                return Promise.reject("Dati non validi");
            }

            let nuovaCreazione;

            if (0 === dati.tipo) // se è un personaggio
            {
                nuovaCreazione = await creazione.createPersonaggio(dati);

            }
            else  // se è un ambiente
            {
                nuovaCreazione = await creazione.createAmbiente(dati);
            }

            let fotoUrl="/img/creazione/default.jpeg"
            let baseUrl = process.env.BASE_URL;

            if (dati.img.mimetype.includes("image")) {
                nuovaCreazione.immagine="/img/creazione/creazione_"+nuovaCreazione.idCreazione+".jpeg";

                fs.writeFileSync("./public"+nuovaCreazione.immagine,dati.img.buffer);
                nuovaCreazione.immagine = baseUrl +nuovaCreazione.immagine;
            }
            else {
                nuovaCreazione.immagine = baseUrl + fotoUrl;
            }

            return creazione.updateImg(nuovaCreazione);
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        return Promise.reject("Dati non validi");
    }
}

creazioneService.getByFilter = async (nome, tipo, page, dati)=>{
    if(page > 0) {
        let filters = {};

        if (nome !== undefined) {
            nome = nome.trim();
            if (nome.length > 0) {
                filters.nome = nome;
            }
        }


        if (!isNaN(tipo)) {
            if (tipo === 'Personaggio' || 'Ambiente') {
                filters.tipo = tipo;
            }

        }

        let result = await creazione.getByFilter(filters, page);

        for (let i = 0; i < result.totalItems; i++) {
            if (!result.creazioni[i].isPubblico) {

                result.creazioni.splice(i, 1); //rimuove elemento dall'array
                result.totalItems--;
            }
            else if (dati.idUtente !== result.creazioni[i].fkUtente || dati.idRuolo !== 2 || dati.idRuolo !== 3) {
                result.creazioni.splice(i, 1); //rimuove elemento dall'array
                result.totalItems--;
            }
        }

        result.totalPages = (result.totalItems + result.pageSize - 1)/result.pageSize;

        return result;


    }
    else{
        return Promise.reject("Pagina non valida");
    }
}

creazioneService.getCreazioniPopolari = async (limit, tipo)=>{
    const DEFAULT_LIMIT = 8;
    if(limit < 1){
        limit = DEFAULT_LIMIT
    }

    if(tipo!==undefined && tipo!==null){
        if(tipo !== "Personaggio" || tipo !== "Ambiente"){
            tipo = null;
        }
    }

    return creazione.getCreazioniPopolari(limit, tipo);
}

module.exports=creazioneService;
