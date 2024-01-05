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
        let creazioneEliminata = await creazione.deleteById(dati.idCreazione);
        if (creazioneEliminata !== null) {

            if (dati.idRuolo === 2 || dati.idRuolo === 3) {
                return creazioneEliminata;
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

                fs.writeFileSync(nuovaCreazione.immagine,dati.img.buffer); //todo (errore) path sbagliato???
                nuovaCreazione.immagine = baseUrl +nuovaCreazione.immagine;
            }
            else {
                nuovaCreazione.immagine = baseUrl + fotoUrl;
            }
            console.log("Percorso: "+nuovaCreazione.immagine);
            console.log("Creazione: "+nuovaCreazione.immagine);
            return creazione.updateImg(nuovaCreazione);
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        console.log(dati);
        return Promise.reject("Dati non validi");
    }
}

creazioneService.getByFilter = async (nome, tipo, page)=>{
    if(page > 0){
        let filters = {};

        if(nome !== undefined){
            nome = nome.trim();
            if(nome.length > 0){
                filters.nome = nome;
            }
        }
        if(!isNaN(tipo)){
            filters.tipo = tipo;
        }

        return creazione.getByFilter(filters, page);
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
