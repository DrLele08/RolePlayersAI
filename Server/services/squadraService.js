const squadra = require('../models/squadra');

const squadraService = {};

squadraService.getById = async (idSquadra) => {
  if (idSquadra > 0) {
    const squadraCercata = await squadra.getById(idSquadra);
    if (squadraCercata !== null) {
      return squadraCercata;
    }

    return Promise.reject('Squadra non trovata');
  }

  return Promise.reject('ID minore di 0');
};

module.exports = squadraService;
