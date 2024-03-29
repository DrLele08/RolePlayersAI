const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const db = require('./database');
const abbonamento = require('./abbonamento');
const utils = require('./utils');

const utente = {};

const Utente = db.define('Utente', {
  idUtente: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fkAbbonamento: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: abbonamento.Abbonamento,
      key: 'idAbbonamento',
    },
  },
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  cognome: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  dataNascita: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  ruolo: {
    type: DataTypes.ENUM('Utente', 'Moderatore', 'Amministratore'),
    allowNull: false,
    defaultValue: 'Utente',
  },
  msgRimanenti: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  scadenzaAbbonamento: {
    type: DataTypes.DATE,
  },
  authToken: {
    type: DataTypes.CHAR(64),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

/**
 *Restituisce l`utente con l`ID dato in input escludendo le informazioni
 * riguardanti password e auth token.
 *
 * @function
 * @param {Number} id - ID dell'utente
 * @returns {Promise} - Promise che si risolve con l'istanza dell'utente
 * corrispondente all'ID, o null se non trovato
 */
utente.getById = async (id) => Utente.findByPk(id, {
  attributes: { exclude: ['password', 'authToken'] },
});

/**
 *Restituisce l`utente con l`ID dato in input escludendo le informazioni
 * riguardanti password e auth token.
 *
 * @function
 * @param {Number} id - ID dell'utente
 * @param {String} tokenAuth - token Autenticazione
 * @returns {Promise} - Promise che si risolve con l'istanza dell'utente
 * corrispondente all'ID, o null se non trovato
 */
utente.getByIdandTokenAuth = async (id, tokenAuth) => Utente.findAll({
  where: {
    idUtente: id,
    authToken: tokenAuth,
  },
  attributes: { exclude: ['password', 'authToken'] },
});

utente.getByEmailorUsername = async (filters) => Utente.findOne({
  where:
           filters,
});

utente.getByFilters = async (filters, page = 1, pageSize = 16) => {
  const result = await Utente.findAndCountAll({
    where: {
      fkAbbonamento: filters.fkAbbonamento ? filters.fkAbbonamento : { [Op.ne]: null },
      username: filters.username ? { [Op.substring]: filters.username } : { [Op.ne]: null },
      ruolo: filters.ruolo ? filters.ruolo : { [Op.ne]: null },
    },
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const utenti = [];
  result.rows.forEach((row) => {
    delete row.dataValues.password;
    delete row.dataValues.authToken;
    utenti.push(row.dataValues);
  });

  const totalCount = result.count;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Ritorna l'oggetto con l'array di utenti e le informazioni sulla paginazione
  return {
    utenti,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
    },
  };
};

/**
 *Restituisce l`abbonamento con l`ID dato in input.
 *
 * @function
 * @param {Number} idUtente - ID dell'utente
 * @returns {Promise<Abbonamento>} - Promise che si risolve con l'istanza dell'utente
 * corrispondente all'ID, o null se non trovato
 */
utente.getActualAbbonamento = async (idUtente) => {
  const utenteCercato = await utente.findByPk(idUtente);
  return utenteCercato.getAbbonamento();
};

/**
 *Restituisce l`abbonamento cambiato con l`ID dato in input.
 *
 * @function
 * @param {Number} idUtente - ID dell'utente
 * @param {Number} idAbbonamento - ID dell'abbonamento che si intende
 * cambiare con quello attuale
 * @returns {Promise<Abbonamento>} - Promise che si risolve con l'oggetto
 * Abbonamento, o null se non trovato
 */
utente.cambiaAbbonamento = async (idUtente, idAbbonamento) => {
  const utenteCambio = await utente.getById(idUtente);
  const Abbonamento = await abbonamento.getAbbonamentoById(idAbbonamento);

  const nuovaScadenza = new Date();
  nuovaScadenza.setDate(nuovaScadenza.getDate() + 30);

  const messaggiRimanenti = Abbonamento.maxMsg;
  if (parseFloat(Abbonamento.prezzo) === 0.0) {
    return Utente.update({
      fkAbbonamento: idAbbonamento,
      scadenzaAbbonamento: null,
      msgRimanenti: messaggiRimanenti,
    }, {
      where: {
        idUtente: utenteCambio.idUtente,
      },
    });
  }
  return Utente.update({
    fkAbbonamento: idAbbonamento,
    scadenzaAbbonamento: nuovaScadenza,
    msgRimanenti: messaggiRimanenti,
  }, {
    where: {
      idUtente: utenteCambio.idUtente,
    },
  });
};

/**
 * Aggiorna il ruolo di un utente nel database.
 *
 * @param {Number} idUtente - L'ID dell'utente da aggiornare.
 * @param {String} ruolo - Il nuovo ruolo da assegnare all'utente.
 *
 * @returns {Promise} - Una promise che risolve quando l'aggiornamento è completato.
 */
utente.setRuolo = async (idUtente, ruolo) => Utente.update({
  ruolo,
}, {
  where: {
    idUtente,
  },
});

/**
 * Crea un nuovo Utente e lo inserisce nel database.
 *
 * @param {Object} data - Dati del nuovo utente.
 * @param {String} data.username - Username del nuovo utente.
 * @param {String} data.nome - Nome del nuovo utente.
 * @param {String} data.cognome - Cognome del nuovo utente.
 * @param {String} data.email - Email del nuovo utente.
 * @param {String} data.password - Password del nuovo utente.
 * @param {Date} data.dataNascita - Data di nascita del nuovo utente.
 * @param {String} data.telefono - Numero di telefono del nuovo utente.
 * @param {String} data.authToken - Token di autenticazione per il nuovo utente.
 *
 * @returns {Promise<Utente>} - Istanza di Utente appena creata.
 */
utente.createUtente = async (data) => {
  const nuovoUtente = await Utente.create({
    username: data.username,
    nome: data.nome,
    cognome: data.cognome,
    email: data.email,
    password: utils.sha256(data.password),
    dataNascita: utils.toMySQLDate(data.dataNascita),
    telefono: data.telefono,
    authToken: data.authToken,
  });
  delete nuovoUtente.dataValues.password;
  return nuovoUtente;
};

/**
 * Aggiorna il numero di messaggi rimanenti per un utente nel database.
 *
 * @async
 * @function
 * @param {number} idUtente - L'ID dell'utente.
 * @param {number} msgAggiornati - Il nuovo numero di messaggi rimanenti da assegnare all'utente.
 * @returns {Promise<Array<number>>} Un array contenente il numero di righe modificate nel database.
 */
utente.updateMsgRimanenti = async (idUtente, msgAggiornati) => Utente.update({
  msgRimanenti: msgAggiornati,
}, {
  where: {
    idUtente,
  },
});

utente.getAll = async () => Utente.findAll({
  attributes: { exclude: ['password', 'authToken'] },
});

utente.hasCreazione = async (idUtente, idCreazione) => {
  const user = await Utente.findByPk(idUtente);
  const creazioni = await user.getCreaziones();
  for (let i = 0; i < creazioni.length; i += 1) {
    if (creazioni[i].idCreazione === idCreazione) {
      return true;
    }
  }
  return false;
};

utente.hasContesto = async (idUtente, idContesto) => {
  const user = await Utente.findByPk(idUtente);
  const contesti = await user.getContestos();
  for (let i = 0; i < contesti.length; i += 1) {
    if (contesti[i].idContesto === idContesto) {
      return true;
    }
  }
  return false;
};

utente.Utente = Utente;

module.exports = utente;
