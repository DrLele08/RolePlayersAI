const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const utente = require("./utente"); //Bisogna creare il model utente
const ambiente = require("./creazione");

const contesto = {};

const Contesto = db.define('Contesto',{
    id: {
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

    is_pubblico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    utente_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: utente.Utente,
            key: 'id'
        }
    },

    ambiente_id: {
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
    foreignKey: 'utente_id',
    as: 'Utente'
});
Contesto.belongsTo(Ambiente, {
    foreignKey: 'ambiente_id',
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
Contesto.getList = ()=> {
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
 * @param {Number} id - ID del Contesto
 *
 * @returns {Promise<Number>} - Promise che si risolve con il numero dell'id del contesto eliminato
 */
//Elimina Contesto



module.exports=contesto;
