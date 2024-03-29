const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const db = require('./database');
const utente = require('./utente');

const PAGE_SIZE = 15;

const creazione = {};

const Creazione = db.define('Creazione', {
  idCreazione: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fkUtente: { // Bisogna creare il model Utente
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: utente.Utente,
      key: 'idUtente',
    },
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  immagine: {
    type: DataTypes.STRING(255),
    default: 'default.jpg',
  },
  descrizione: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
  isPubblico: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Personaggio', 'Ambiente'),
    allowNull: false,
  },
  sesso: {
    type: DataTypes.ENUM('Uomo', 'Donna', 'Altro'),
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

/**
 * Restituisce la creazione con l'id dato in input.
 *
 * @function
 *
 * @param {Number} idCreazione Identificativo della creazione
 */
creazione.getById = (idCreazione) => Creazione.findByPk(idCreazione);

/**
 * Restituisce tutte le creazioni create nel DB
 *
 * @function
 * @returns {Promise<Array<creazione>>} - Promise che si risolve con un array di istanze,
 * oppure un array vuoto se non sono presenti
 */
creazione.getAll = () => creazione.findAll();
/**
 * Crea e inserisce un nuovo Personaggio all`interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del nuovo personaggio
 * @param {Number} dati.fkUtente - Id dell`utente che ha creato il Personaggio
 * @param {String} dati.nome - Nome del Personaggio
 * @param {String} dati.immagine - Percorso immagine del personaggio
 * @param {String} dati.descrizione - Descrizione del personaggio
 * @param {Boolean} dati.isPubblico - Indica se il personaggio è pubblico o privato
 * @param {String} dati.sesso - Enum che rappresenta il sesso del personaggio {Uomo, Donna o Altro}
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del personaggio appena creato
 */
creazione.createPersonaggio = async (dati) => Creazione.create({
  fkUtente: dati.fkUtente,
  nome: dati.nome,
  descrizione: dati.descrizione,
  isPubblico: dati.isPubblico,
  tipo: 'Personaggio',
  sesso: dati.sesso,
});

/**
 * Crea e inserisce un nuovo Ambiente all`interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del nuovo ambiente
 * @param {Number} dati.fkUtente - Id dell`utente che ha creato l'ambiente
 * @param {String} dati.nome - Nome ambiente
 * @param {String} dati.immagine - Percorso immagine ambiente
 * @param {String} dati.descrizione - Descrizione ambiente
 * @param {Boolean} dati.isPubblico - Indica se l'ambiente è pubblico o privato
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del'ambiente appena creato
 */
creazione.createAmbiente = async (dati) => Creazione.create({
  fkUtente: dati.fkUtente,
  nome: dati.nome,
  descrizione: dati.descrizione,
  isPubblico: dati.isPubblico,
  tipo: 'Ambiente',
});
// verifica
creazione.updateImg = async (dati) => Creazione.update(
  { immagine: dati.immagine },
  {
    where: {
      idCreazione: dati.idCreazione,
    },

  },
);

/**
 * Elimina una creazione presente nel DB
 *
 * @function
 * @param {Number} id - ID della creazione
 *
 * @returns {Promise<Number>} - Promise che si risolve con il numero
 * dell'id della creazione eliminata
 */
creazione.deleteById = async (id) => creazione.destroy({
  where: {
    idCreazione: id,
  },
});

/**
 * Restituisce una lista di creazioni filtrate e paginate in base ai criteri specificati
 *
 * @async
 * @function
 *
 * @param {Object} filters - Oggetto contenente i criteri di filtraggio per la query
 * @param {String} [filters.nome] - Nome della creazione da cercare
 * (la ricerca avverrà in base ad una corrispondenza parziale)
 * @param {Number} filters.tipo - Tipo della creazione da cercare (0=Personaggio, 1=Ambiente)
 * @param {Number} page - Numero di pagina desiderato per la visualizzazione dei risultati
 * @param {Object} dati - Contiene ruolo e idUtente
 * @return {Promise<{
 *      totalItems: Number,
 *      totalPages: Number,
 *      currentPage: Number,
 *      pageSize: Number,
 *      creazioni: Creazione[]
 *      }>} - Promise che si risolve con un oggetto contenente
 *      informazioni sulla paginazione e la lista di creazioni
 */
creazione.getByFilter = async (filters, page, dati) => {
  const offset = (page - 1) * PAGE_SIZE;

  if (filters.nome) {
    filters.nome = { [Op.substring]: filters.nome };
  }

  let result = await Creazione.findAll({
    where:
            filters,
  });

  if (dati.idRuolo === 1) {
    const creazioniPubbliche = result.filter((c) => c.isPubblico === true);
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].fkUtente === dati.idUtente && result[i].isPubblico === false) {
        creazioniPubbliche.push(result[i]);
      }
    }
    result = creazioniPubbliche;
  }
  const totalItems = result.length;
  result = result.slice(offset, (PAGE_SIZE * page));

  // Calcola il numero totale di pagine per visualizzare tutti i risultati (arrotondato per eccesso)
  const totalPages = Math.ceil((result.length) / PAGE_SIZE);

  return {
    totalItems,
    totalPages,
    currentPage: page,
    PAGE_SIZE,
    creazioni: result,
  };
};

creazione.getByUtenteAndFilters = async (idUtente, filters, page = 1, pageSize = 16) => {
  const tipiFiltrati = filters.tipo ? filters.tipo.split(',').map((tipo) => tipo.trim()) : ['ambiente', 'personaggio'];

  const result = await Creazione.findAndCountAll({
    where: {
      fkUtente: idUtente,
      nome: filters.nome ? { [Op.substring]: filters.nome } : { [Op.ne]: null },
      [Op.or]: tipiFiltrati ? tipiFiltrati.map((tipo) => ({ tipo })) : { [Op.ne]: null },
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const creazioni = [];
  result.rows.forEach((row) => {
    creazioni.push(row.dataValues);
  });

  const totalCount = result.count;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Ritorna l'oggetto con l'array di creazioni e le informazioni sulla paginazione
  return {
    creazioni,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    },
  };
};

/**
 * Restituisce le creazioni più popolari in base ai parametri forniti
 *
 * @function
 *
 * @param {Number} limit - Limite di creazioni da restituire
 * @param {String} tipo - tipo della creazione ('Personaggio' || 'Ambiente')
 *
 * @return {Promise<Creazione[]>} Promise che si risolve con un array
 * di oggetti Creazione che soddisfano i criteri specificati
 */
creazione.getCreazioniPopolari = (limit, tipo) => {
  const whereClause = {
    isPubblico: true,
  };
  if (tipo !== undefined && tipo !== null) {
    whereClause.tipo = tipo;
  }

  return Creazione.findAll({
    attributes: [
      'idCreazione',
      'nome',
      'immagine',
      'descrizione',
      [db.fn('COUNT', db.col('Utentes->InventarioCreazione.idUtente')), 'utentiCount'],
    ],
    include: [
      {
        model: utente.Utente,
        attributes: [],
        through: { attributes: [] },
      },
    ],
    where: whereClause,
    group: ['Creazione.idCreazione'],
    order: [['utentiCount', 'DESC']],
  })
    .then((results) => results.slice(0, limit));
};

creazione.Creazione = Creazione;

module.exports = creazione;
