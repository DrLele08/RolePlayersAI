const utils = require('../models/utils');
const creazione = require('../models/creazione');
const contesto = require('../models/contesto');
const utente = require('../models/utente');

const inventarioService = {};

inventarioService.checkUtenteAndCreazione=async(data)=>{
  if (!utils.checkParameters(data, ['idUtente', 'idCreazione'])) { return Promise.reject('Dati non validi!'); }

  if (!utils.checkId(data.idUtente)) { return Promise.reject('ID utente non valido!'); }

  if (!utils.checkId(data.idCreazione)) { return Promise.reject('ID creazione non valido!'); }

  const c = await creazione.getById(data.idCreazione);
  if (c == null) { return Promise.reject('Creazione non trovata!'); }

  return c;
}

inventarioService.checkUtenteAndContesto=async (data)=>{
  if (!utils.checkParameters(data, ['idUtente', 'idContesto'])) { return Promise.reject('Dati non validi!'); }

  if (!utils.checkId(data.idUtente)) { return Promise.reject('ID utente non valido!'); }

  if (!utils.checkId(data.idContesto)) { return Promise.reject('ID contesto non valido!'); }

  const c = await contesto.getContestoById(data.idContesto);
  if (c == null) { return Promise.reject('Contesto non trovato!'); }

  return c;
}

inventarioService.getInventario = async (data) => {
  if (!utils.checkId(data.idUtente)) { return Promise.reject('ID utente non valido!'); }

  // se è presente il filtro 'nome' ne effettua il trim
  data.filters.nome && (data.filters.nome = data.filters.nome.trim().toLowerCase());

  // se è presente il filtro 'tipo' divide i valori in un array e effettua il trim di ciascuno di essi
  data.filters.tipo && (data.filters.tipo = data.filters.tipo.split(',').map((str) => str.trim().toLowerCase()));

  // controlla se tutti i tipi inseriti siano validi
  if (data.filters.tipo && !data.filters.tipo.every((tipo) => ['personaggio', 'ambiente', 'contesto'].includes(tipo))) { return Promise.reject('Filtro tipo non valido!'); }

  const u = await utente.getById(data.idUtente);
  const contesti = await getContesti(u, data.filters);
  const creazioni = await getCreazioni(u, data.filters);

  return contesti.concat(creazioni);
};

inventarioService.addContenuto = async (data) => {
  if ((!data.idCreazione && !data.idContesto) || (data.idCreazione && data.idContesto)) {
    return Promise.reject('Devi fornire uno tra idCreazione e idContesto!');
  }

  const u = await utente.getById(data.idUtente);
  let c;
  if (data.idCreazione) {
    c = await inventarioService.checkUtenteAndCreazione(data);

    if (c.fkUtente !== data.idUtente && !c.isPubblico) { return Promise.reject('Non hai i permessi!'); }

    if (await u.hasCreazione(c)) { return Promise.reject("Creazione già presente nell'Inventario!"); }

    return await u.addCreazione(c);
  } if (data.idContesto) {
    c = await inventarioService.checkUtenteAndContesto(data);

    if (c.fkUtente !== data.idUtente && !c.isPubblico) { return Promise.reject('Non hai i permessi!'); }

    if (await u.hasContesto(c)) { return Promise.reject("Contesto già presente nell'Inventario!"); }

    return await u.addContesto(c);
  }
};

inventarioService.removeContenuto = async (data) => {
  if ((!data.idCreazione && !data.idContesto) || (data.idCreazione && data.idContesto)) {
    return Promise.reject('Devi fornire uno tra idCreazione e idContesto!');
  }

  const u = await utente.getById(data.idUtente);
  let c;
  if (data.idCreazione) {
    c = await inventarioService.checkUtenteAndCreazione(data);

    if (!await u.hasCreazione(c)) { return Promise.reject("Creazione non presente nell'Inventario!"); }

    return await u.removeCreazione(c);
  } if (data.idContesto) {
    c = await inventarioService.checkUtenteAndContesto(data);

    if (!await u.hasContesto(c)) { return Promise.reject("Contesto non presente nell'Inventario!"); }

    return await u.removeContesto(c);
  }
};

async function getContesti(u, filters) {
  const contesti = await u.getContestos();

  if (filters.tipo && !filters.tipo.includes('contesto')) { return []; }

  return contesti.map((c) => {
    const { dataValues } = c;
    delete dataValues.InventarioContesto;
    dataValues.tipo = 'Contesto';
    return dataValues;
  }).filter((c) => {
    if (filters.nome) { return c.nome.toLowerCase().includes(filters.nome); }
    return true;
  });
}

async function getCreazioni(u, filters) {
  const creazioni = await u.getCreaziones();
  return creazioni.map((c) => {
    const { dataValues } = c;
    delete dataValues.InventarioCreazione;
    return dataValues;
  }).filter((c) => {
    if (filters.nome) { return c.nome.toLowerCase().includes(filters.nome); }
    return true;
  }).filter((c) => {
    if (filters.tipo) { return filters.tipo.includes(c.tipo.toLowerCase()); }
    return true;
  });
}

module.exports = inventarioService;
