const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const db = require('./database');
const sessione = require('./sessione');
const creazione = require('./creazione');

const conversazione = {};

// TODO: Gestire la data di creazione e ultimo avvio con timestamps?
const Conversazione = db.define('Conversazione', {
  idConversazione: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fkSessione: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: sessione.Sessione,
      key: 'idSessione',
    },
  },
  fkPersonaggio: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: creazione.Creazione,
      key: 'idCreazione',
    },
  },
  dataAvvio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      const value = this.getDataValue('dataAvvio');
      return moment(value).format();
    },
  },
  ultimoAvvio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      const value = this.getDataValue('ultimoAvvio');
      return moment(value).format();
    },
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

/**
 * Restituisce la conversazione con l`ID dato in input
 *
 * @function
 * @param {Number} idConversazione - ID della conversazione richiesta
 * @return {Promise<>} Promise contenente l`istanza della conversazione
 * trovata oppure null se non è stata trovata
 */
conversazione.getById = (idConversazione) => Conversazione.findByPk(idConversazione);

/**
 * Restituisce la conversazione corrispondente alla sessione e al personaggio dati in input
 *
 * @function
 * @param {Number} idSessione - ID della sessione
 * @param {Number} idPersonaggio - ID del personaggio
 * @return {Promise<>} Promise contenente l`istanza della conversazione trovata
 * oppure null se non è stata trovata
 */
conversazione.getBySessioneAndPersonaggio = async (
  idSessione,
  idPersonaggio,
) => Conversazione.findAll({
  where: {
    fkSessione: idSessione,
    fkPersonaggio: idPersonaggio,
  },
});

/**
 * Crea e salva un nuova conversazione nel database.
 *
 * @function
 * @param {Object} dati - I dati della conversazione da salvare.
 * @param {Number} dati.fkSessione - L'ID della sessione a cui appartiene la conversazione.
 * @param {Number} dati.fkPersonaggio - L`ID del personaggio a cui è legata la conversazione.
 * @returns {Promise<Object>} Un oggetto rappresentante la conversazione appena creata.
 */
conversazione.createConversazione = (dati) => Conversazione.create({
  fkSessione: dati.fkSessione,
  fkPersonaggio: dati.fkPersonaggio,
});

conversazione.Conversazione = Conversazione;

module.exports = conversazione;
