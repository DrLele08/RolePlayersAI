const { DataTypes } = require('sequelize');
const db = require('./database');
const contesto = require('./contesto');
const personaggio = require('./creazione');

const relazionePersonaggi = {};

const RelazionePersonaggi = db.define('RelazionePersonaggi', {
  idRelazionePersonaggi: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fkContesto: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: contesto.Contesto,
      key: 'idContesto',
    },
  },
  fkPersonaggio1: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: personaggio.Creazione,
      key: 'idCreazione',
    },
  },
  fkPersonaggio2: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: personaggio.Creazione,
      key: 'idCreazione',
    },
  },
  descrizione: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

/**
 *Restituisce la relazione tra personaggi con l`ID dato in input.
 *
 * @function
 * @param {Number} id - ID della relazione
 * @returns {Promise<RelazionePersonaggi | null>} - Promise che si risolve con l`istanza
 * di RelazionePersonaggio corrispondente all ID, o null se non trovato
 */
relazionePersonaggi.getById = (id) => RelazionePersonaggi.findByPk(id);

/**
 * Crea e inserisce una nuova relazione tra personaggi all`interno dell DB
 *
 * @function
 *
 * @param {Object} dati - Dati della nuova relazione
 * @param {String} dati.descrizione - Descrizione della relazione
 * @param {Number} dati.fkContesto - ID del contesto in cui è definita la relazione
 * @param {Number} dati.fkPersonaggio1 - ID del primo personaggio che partecipa alla relazione
 * @param {Number} dati.fkPersonaggio2 - ID del secondo personaggio che partecipa alla relazione
 *
 * @returns {Promise<RelazionePersonaggi>} - Promise che si risolve con l`istanza di
 * RelazionePersonaggi appena creata e inserita nel DB
 */
relazionePersonaggi.createRelazionePersonaggi = (dati) => RelazionePersonaggi.create({
  descrizione: dati.descrizione,
  fkContesto: dati.fkContesto,
  fkPersonaggio1: dati.fkPersonaggio1,
  fkPersonaggio2: dati.fkPersonaggio2,
});

/**
 * Restituisce tutte le relazioni tra personaggi definite all`interno del contesto dato in input
 *
 * @function
 * @param {Number} idContesto - ID del contesto di cui si vogliono
 * recuperare le relazioni tra personaggi
 * @returns {Promise<Array<RelazionePersonaggi>>} - Promise che si risolve con un array di istanze
 * corrispondenti al contesto, oppure un array vuoto se non sono presenti
 */
relazionePersonaggi.getByContesto = (idContesto) => RelazionePersonaggi.findAll({
  where: {
    fkContesto: idContesto,
  },
});

relazionePersonaggi.RelazionePersonaggi = RelazionePersonaggi;

module.exports = relazionePersonaggi;
