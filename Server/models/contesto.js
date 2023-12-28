const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const utente = require("./utente"); //TODO Bisogna creare il model Utente
const ambiente = require("./creazione");

const contesto = {};

const Contesto = db.define('Contesto',{
    idContesto: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING(25),
        allowNull: false
    },

    descrizione: {
        type: DataTypes.STRING(512),
        allowNull: false
    },

    isPubblico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    FkUtente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: utente.Utente,
            key: 'id'
        }
    },

    FkAmbiente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: ambiente.Creazione,
            key: 'id'
        }
    }
});

//Associazioni

Contesto.belongsTo(utente.Utente, { //Bisogna creare il model Utente
    foreignKey: 'FkUtente',
    as: 'Utente'
});
Contesto.belongsTo(Ambiente, {
    foreignKey: 'FkUtente',
    as: 'Ambiente'
});


/**
 *Restituisce il Contesto con l`ID dato in input.
 *
 * @function
 * @param {Number} id - ID del Contesto
 * @returns {Promise<Contesto | null>} - Promise che si risolve con l`istanza di Contesto corrispondente all ID, o null se non trovato
 */
contesto.getById=(id)=>{
    return Contesto.findByPk(id);
}


/**
 * Restituisce tutti contesti creati nel DB
 *
 * @function
 * @returns {Promise<Array<Contesto>>} - Promise che si risolve con un array di istanze, oppure un array vuoto se non sono presenti
 */
Contesto.getAll = ()=> {
    return Contesto.findAll();
};


/**
 * Crea e inserisce un nuovo Contesto all'interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del Contesto
 * @param {Number} dati.utente_id - Id dell'utente che ha creato il contesto
 * @param {Number} dati.ambiente_id - Id dell'ambiente in cui è stato definito il contesto
 * @param {String} dati.nome - Nome del Contesto
 * @param {String} dati.descrizione - Descrizione del Contesto
 * @param {Boolean} dati.is_pubblico - Indica se il Contesto è pubblico o privato
 *
 * @returns {Promise<Contesto>} - Promise che si risolve con l'istanza del contesto creato
 */

contesto.createContesto = (dati) =>{
    return Contesto.create({
        utente_id: dati.utente_id,
        ambiente_id: dati.ambiente_id,
        nome: dati.nome,
        descrizione: dati.descrizione,
        is_pubblico: dati.is_pubblico
    });
};


/**
 * Elimina un Contesto presente nel DB
 *
 * @function
 * @param {Number} idContesto - ID del Contesto
 *
 * @return {Promise<Number>}
 */
contesto.deleteContesto = (idContesto) =>{
     return Contesto.destroy({
        where: {
            idContesto: idContesto
        }
    })
}

module.exports=contesto;
