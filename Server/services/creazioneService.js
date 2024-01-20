const fs = require('fs');
const creazione = require('../models/creazione');
const utils = require('../models/utils');

const creazioneService = {};
const requiredFields = ['fkUtente', 'nome', 'descrizione', 'isPubblico', 'tipo'];

creazioneService.getById = async (dati) => {
  if (dati.idCreazione > 0) {
    const creazioneCercata = await creazione.getById(dati.idCreazione);

    if (creazioneCercata !== null) {
      if (creazioneCercata.isPubblico) {
        return creazioneCercata;
      }
      if (creazioneCercata.fkUtente === dati.idUtente || dati.idRuolo === 2 || dati.idRuolo === 3) {
        return creazioneCercata;
      }

      return Promise.reject('Non hai i permessi');
    }

    return Promise.reject('Creazione non trovata');
  }

  return Promise.reject('ID minore di 0');
};

creazioneService.DeleteById = async (dati) => {
  if (dati.idCreazione > 0) {
    const creation = await creazione.getById(dati.idCreazione);
    if (creation !== null) {
      if (dati.idRuolo === 2 || dati.idRuolo === 3) {
        return creazione.deleteById(dati.idCreazione);
      }
      return Promise.reject('Non hai i permessi');
    }

    return Promise.reject('Creazione non trovata');
  }

  return Promise.reject('ID minore di 0');
};

creazioneService.createCreazione = async (dati) => {
  if (utils.checkParameters(dati, requiredFields)) {
    if (utils.checkId(dati.fkUtente)) {
      dati.nome = dati.nome.trim();
      dati.descrizione = dati.descrizione.trim();
      dati.tipo = dati.tipo.trim().toLowerCase();

      if (dati.nome.length < 1) { return Promise.reject('Nome troppo corto'); }

      if (dati.nome.length > 50) { return Promise.reject('Nome troppo lungo'); }

      if (dati.descrizione.length < 1) { return Promise.reject('Descrizione troppo corta'); }

      if (dati.descrizione.length > 512) { return Promise.reject('Descrizione troppo lunga'); }

      if (isNaN(dati.isPubblico)) { return Promise.reject('Il valore di isPubblico deve essere numerico'); }

      dati.isPubblico = parseInt(dati.isPubblico);

      if (dati.isPubblico !== 0 && dati.isPubblico !== 1) { return Promise.reject('Valore di isPubblico non ammesso'); }

      if (dati.tipo !== 'personaggio' && dati.tipo !== 'ambiente') {
        return Promise.reject('Tipo non valido');
      }
      if (dati.tipo === 'personaggio' && dati.sesso !== undefined) {
        dati.sesso = dati.sesso.trim().toLowerCase();
        if (dati.sesso !== 'uomo' && dati.sesso !== 'donna' && dati.sesso !== 'altro') {
          return Promise.reject('Sesso non valido');
        }
      } else if (dati.tipo === 'personaggio' && dati.sesso === undefined) {
        return Promise.reject('Sesso non specificato');
      }

      let nuovaCreazione;

      if (dati.tipo === 'personaggio') // se è un personaggio
      {
        nuovaCreazione = await creazione.createPersonaggio(dati);
      } else // se è un ambiente
      {
        nuovaCreazione = await creazione.createAmbiente(dati);
      }

      const fotoUrl = '/img/creazione/default.jpg';
      const baseUrl = process.env.BASE_URL;

      if (dati.img !== undefined) {
        if (dati.img.mimetype.includes('image')) {
          nuovaCreazione.immagine = `/img/creazione/creazione_${nuovaCreazione.idCreazione}.jpeg`;

          fs.writeFileSync(`./public${nuovaCreazione.immagine}`, dati.img.buffer);
          nuovaCreazione.immagine = baseUrl + nuovaCreazione.immagine;
        } else {
          nuovaCreazione.immagine = baseUrl + fotoUrl;
        }
      } else {
        nuovaCreazione.immagine = baseUrl + fotoUrl;
      }

      await creazione.updateImg(nuovaCreazione);
      return nuovaCreazione;
    }

    return Promise.reject('ID utente non valido');
  }

  return Promise.reject('Dati non validi');
};

creazioneService.getByFilter = async (nome, tipo, page, dati) => {
  if (page > 0) {
    const filters = {};

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
    // tipo errore ...

    return creazione.getByFilter(filters, page, dati);
  }

  return Promise.reject('Pagina non valida');
};

/**
 * Ottiene un elenco di creazioni popolari.
 *
 * @param {number} limit - Limite di creazioni da ottenere (deve essere un numero positivo).
 * @param {string} tipo - Tipo di creazione ("Personaggio" o "Ambiente"). Se non specificato o non valido, otterrà entrambi i tipi.
 * @returns {Promise<Array>} Una Promise che si risolve con un array di creazioni popolari.
 */
creazioneService.getCreazioniPopolari = async (limit, tipo) => {
  const DEFAULT_LIMIT = 8;
  if (limit < 1) {
    limit = DEFAULT_LIMIT;
  }

  if (tipo !== undefined && tipo !== null) {
    if (tipo !== 'Personaggio' && tipo !== 'Ambiente') {
      tipo = null;
    }
  }

  return creazione.getCreazioniPopolari(limit, tipo);
};

module.exports = creazioneService;
