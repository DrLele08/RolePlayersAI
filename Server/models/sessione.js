const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const utente = require("./utente");
const utils = require("../models/utils");
const contesto = require("./contesto");
const {Sequelize} = require("sequelize");

const sessione = {}

const Sessione = db.define('Sessione', {
    idSessione: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkUtente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: utente.Utente,
            key: 'idUtente'
        }
    },
    fkContesto: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: contesto.Contesto,
            key: 'idContesto'
        }
    },
    titolo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    dataCreazione: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: utils.getCurrentDateTime()
    },
    ultimoAvvio: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    freezeTableName: true,
    timestamps: false
});

/**
 * Ottiene la Sessione relativa ad un ID dato in input.
 *
 * @param {Number} id - ID della Sessione da cercare.
 *
 * @returns {Promise<Sessione>} - Promise che si risolve con l'istanza della Sessione corrispondente, o null se non trovato.
 */
sessione.getById = async (id) => {
    return await Sessione.findByPk(id);
}

/**
 * Ottiene tutte le sessioni di un utente, ordinate in base all'ultimo avvio (ordine discendente).
 *
 * @param {Number} idUtente - ID dell'utente da cercare.
 *
 * @returns {Promise<Array>} - Array di tutte le sessioni trovate, ordinate in base all'ultimo avvio.
 */
sessione.getByUtente = async (idUtente) => {
    return await Sessione.findAll({
        where: {
            fkUtente: idUtente
        },
        order: [['ultimoAvvio', 'DESC']]
    });
}

/**
 * Crea una nuova Sessione e la inserisce nel database.
 *
 * @param {Object} data - I dati della nuova sessione.
 * @param {Number} data.idUtente - ID del creatore della sessione.
 * @param {Number} data.idContesto - ID del Contesto su cui viene avviata la sessione.
 * @param {String} data.titolo - Nome della sessione.
 *
 * @returns {Promise<Sessione>} - Istanza della Sessione appena creata.
 */
sessione.createSessione = async (data) => {
    return await Sessione.create({
        fkUtente: data.idUtente,
        fkContesto: data.idContesto,
        titolo: data.titolo
    });
}

/**
 * Imposta la data di ultimo avvio di una Sessione all'istante attuale.
 *
 * @param {Number} id - L'ID della Sessione.
 * @returns {Promise<Boolean>} - Promise che risolve a `true` se l'aggiornamento ha avuto successo, altrimenti a `false`.
 */
sessione.setUltimoAvvioToNow = async (id) => {
    const result = await Sessione.update({
        ultimoAvvio: utils.getCurrentDateTime()
    }, {
        where: {
            idSessione: id
        }
    });

    // verifica se l'aggiornamento è avvenuto con successo
    return result[0] === 1;
}

/**
 * Elimina una Sessione dal database.
 *
 * @param {Number} id - ID della sessione da eliminare.
 * @returns {Promise<Boolean>} - Promise che risolve a `true` se l'eliminazione ha avuto successo, altrimenti a `false`.
 */
sessione.deleteById = async (id) => {
    const result = await Sessione.destroy({
        where: {
            idSessione: id
        }
    });

    return result === 1;
}

sessione.Sessione = Sessione;

module.exports = sessione;