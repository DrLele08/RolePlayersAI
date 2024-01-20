const { DataTypes } = require('sequelize');
const db = require('./database');

const abbonamento = {};

const Abbonamento = db.define('Abbonamento', {
  idAbbonamento: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nomeTier: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  prezzo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  maxMsg: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

/**
 * Restituisce l'abbonamento con l'ID dato in input.
 *
 * @function
 * @param {Number} idAbbonamento - ID dell'Abbonamento
 * @returns {Promise<Abbonamento>} - Promise che si risolve con
 * un array di istanze, oppure un array vuoto se non sono presenti
 */

abbonamento.getAbbonamentoById = (idAbbonamento) => Abbonamento.findByPk(idAbbonamento);

/**
 * Restituisce tutti gli abbonamenti creati nel DB
 *
 * @function
 * @returns {Promise<Array<Abbonamento>>} - Promise che si risolve
 * con un array di istanze, oppure un array vuoto se non sono presenti
 */

abbonamento.getAll = () => Abbonamento.findAll();

abbonamento.Abbonamento = Abbonamento;

module.exports = abbonamento;
