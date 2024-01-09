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
    fkUtente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: utente.Utente,
            key: 'id'
        }
    },

    fkAmbiente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: ambiente.Creazione,
            key: 'id'
        }
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
    }
},{
    freezeTableName: true,
    timestamps: false
});


/**
 *Restituisce il Contesto con l`ID dato in input.
 *
 * @function
 * @param {Number} idContesto - ID del Contesto
 * @returns {Promise<Contesto | null>} - Promise che si risolve con l`istanza di Contesto corrispondente all ID, o null se non trovato
 */
contesto.getContestoById = async(idContesto)=> {
    return await Contesto.findByPk(idContesto);
}


/**
 * Restituisce tutti contesti creati nel DB
 *
 * @function
 * @returns {Promise<Array<Contesto>>} - Promise che si risolve con un array di istanze, oppure un array vuoto se non sono presenti
 */
contesto.getAll = async()=> {
    return await Contesto.findAll();
};


/**
 * Crea e inserisce un nuovo Contesto all'interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del Contesto
 * @param {Number} dati.fkUtente - Id dell'utente che ha creato il contesto
 * @param {Number} dati.fkAmbiente - Id dell'ambiente in cui è stato definito il contesto
 * @param {String} dati.nome - Nome del Contesto
 * @param {String} dati.descrizione - Descrizione del Contesto
 * @param {Boolean} dati.isPubblico - Indica se il Contesto è pubblico o privato
 *
 * @returns {Promise<Contesto>} - Promise che si risolve con l'istanza del contesto creato
 */

contesto.createContesto = async(dati) =>{
    return await Contesto.create({
        fkUtente: dati.fkUtente,
        fKAmbiente: dati.fkAmbiente,
        nome: dati.nome,
        descrizione: dati.descrizione,
        isPubblico: dati.isPubblico
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
contesto.deleteContesto = async(idContesto) =>{
     return await Contesto.destroy({
        where: {
            idContesto: idContesto
        }
    })
}

contesto.Contesto=Contesto;

module.exports=contesto;
