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
        let creation = await creazione.getById(dati.idCreazione);
        if (creation !== null) {

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
    if(utils.checkParameters(dati, requiredFields)) {
        if (utils.checkId(dati.fkUtente)) {

            dati.nome = dati.nome.trim();
            dati.descrizione = dati.descrizione.trim();
            dati.tipo = dati.tipo.trim();


            if (dati.nome.length <= 0 || dati.nome.length >= 51) {
                return Promise.reject("Dati non validi");
            }
            if (dati.isPubblico !== 0 || dati.isPubblico !== 1) {
                return Promise.reject("Dati non validi");
            }
            if (dati.descrizione.length < 1 || dati.descrizione.length >= 513) {
                return Promise.reject("Dati non validi");
            }
            if (dati.tipo !== 'Personaggio' || dati.tipo !== 'Ambiente') {
                return Promise.reject("Dati non validi");
            }
            if (dati.tipo === 'Personaggio' && dati.sesso !== undefined) {
                dati.sesso = dati.sesso.trim();
                if (dati.sesso !== 'Uomo' || dati.sesso !== 'Donna' || dati.sesso !== 'Altro') {
                    return Promise.reject("Dati non validi");
                }
            } else if (dati.tipo === 'Personaggio' && dati.sesso === undefined) {
                return Promise.reject("Dati non validi");

            }



            let nuovaCreazione;

            if ('Personaggio' === dati.tipo) // se è un personaggio
            {
                nuovaCreazione = await creazione.createPersonaggio(dati);

            }
            else  // se è un ambiente
            {
                nuovaCreazione = await creazione.createAmbiente(dati);
            }

            let fotoUrl="/img/creazione/default.jpg"
            let baseUrl = process.env.BASE_URL;

            if(dati.img !== undefined)
            {
                if (dati.img.mimetype.includes("image")) {
                    nuovaCreazione.immagine="/img/creazione/creazione_"+nuovaCreazione.idCreazione+".jpeg";

                    fs.writeFileSync("./public"+nuovaCreazione.immagine,dati.img.buffer);
                    nuovaCreazione.immagine = baseUrl +nuovaCreazione.immagine;
                }
                else {
                    nuovaCreazione.immagine = baseUrl + fotoUrl;
                }
            }
            else {
                nuovaCreazione.immagine = baseUrl + fotoUrl;
            }

            await creazione.updateImg(nuovaCreazione);
            return nuovaCreazione;
        }
        else{
            return Promise.reject("ID non valido");
        }
    }
    else{
        return Promise.reject("Parametri non validi");
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

        if (isNaN(tipo)) {
            if (tipo === 'Personaggio' || tipo === 'Ambiente') {
                filters.tipo = tipo;
            }
        }
        //tipo errore ...

        return creazione.getByFilter(filters, page,dati);

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
        if(tipo !== "Personaggio" && tipo !== "Ambiente"){
            tipo = null;
        }
    }

    return creazione.getCreazioniPopolari(limit, tipo);
}

module.exports=creazioneService;
