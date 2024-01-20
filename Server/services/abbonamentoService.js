const abbonamento = require('../models/contesto');
const utils = require('../models/utils');

const abbonamentoService = {};

abbonamentoService.getById = async (idAbbonamento) => {
  if (utils.checkId(idAbbonamento)) {
    const abbonamentoCercato = await abbonamento.getById(idAbbonamento);
    if (abbonamentoCercato !== null) {
      return abbonamentoCercato;
    }

    return Promise.reject('Abbonamento non trovato');
  }
};

abbonamentoService.getAll = async () => {
  const listaAbbonamenti = abbonamento.getAll();

  if (listaAbbonamenti !== null) {
    return listaAbbonamenti;
  }

  return Promise.reject('Lista degli Abbonamenti vuota');
};
