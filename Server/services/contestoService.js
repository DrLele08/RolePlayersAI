const contesto = require('../models/contesto');
const creazione = require('../models/creazione');
const utils = require('../models/utils');

const contestoService = {};

const requiredFields = ['nome', 'fkUtente', 'listaPersonaggi', 'fkAmbiente', 'descrizione', 'isPubblico'];

contestoService.createContesto = async (dati) => {
  if (utils.checkParameters(dati, requiredFields)) {
    if (utils.checkId(dati.fkUtente)) {
      if (utils.checkId(dati.fkAmbiente)) {
        dati.nome = dati.nome.trim();
        dati.descrizione = dati.descrizione.trim();

        if (dati.nome.length > 1 && dati.nome.length < 50) {
          if (dati.descrizione.length > 20 && dati.descrizione.length < 512) {
            if (dati.isPubblico.toString().length > 0 && !isNaN(dati.isPubblico)) {
              const isPubblico = parseInt(dati.isPubblico);
              if (isPubblico === 0 || isPubblico === 1) {
                if (Array.isArray(dati.listaPersonaggi)) {
                  const contestoCreato = await contesto.createContesto(dati);
                  for (const personaggio of dati.listaPersonaggi) {
                    const personaggioTrovato = await creazione.getById(personaggio);
                    if (personaggioTrovato.tipo === 'Personaggio') {
                      if (utils.checkId(personaggio)) {
                        await contestoCreato.addCreazione(personaggio);
                      }
                    }
                  }
                  return contestoCreato;
                }

                return Promise.reject('Array listaPersonaggi non valido');
              }

              return Promise.reject('Parametro isPubblico non valido');
            }
          } else {
            return Promise.reject('Descrizione non valida');
          }
        } else {
          return Promise.reject('Nome non valido');
        }
      } else {
        return Promise.reject('Id Ambiente non valido');
      }
    } else {
      return Promise.reject('Id Utente non valido');
    }
  } else {
    return Promise.reject('Creazione Contesto fallita');
  }
};

contestoService.getContestoById = async (dati) => {
  if (dati.idContesto > 0) {
    const contestoCercato = await contesto.getContestoById(dati.idContesto);
    if (contestoCercato !== null) {
      if (contestoCercato.isPubblico) {
        return contestoCercato;
      }
      if (contestoCercato.fkUtente === dati.idUtente || dati.idRuolo === 2 || dati.idRuolo === 3) {
        return contestoCercato;
      }

      return Promise.reject('Non hai i permessi');
    }

    return Promise.reject('Contesto non trovato');
  }

  return Promise.reject('ID minore di 0');
};

contestoService.getAll = async () => {
  const listaContesti = await contesto.getAll();

  if (listaContesti !== null) {
    return listaContesti;
  }

  return Promise.reject('Lista dei Contesti Vuota');
};

contestoService.deleteContesto = async (dati) => {
  if (dati.idContesto) {
    const contestoEliminata = await contesto.deleteContesto(dati.idContesto);

    if (contestoEliminata !== null) {
      if (dati.idRuolo === 2 || dati.idRuolo === 3) {
        return contesto.deleteContesto(dati.idContesto);
      }
      return Promise.reject('Non hai i permessi');
    }
    return Promise.reject('Contesto non trovato');
  }

  return Promise.reject('ID minore di 0');
};

contestoService.getByFilter = async (nome, page, dati) => {
  if (page > 0) {
    const filters = {};
    if (nome !== undefined) {
      nome = nome.trim();
      if (nome.length > 0) {
        filters.nome = nome;
      }
    }
    return contesto.getByFilter(filters, page, dati);
  }

  return Promise.reject('Pagina non valida');
};

module.exports = contestoService;
