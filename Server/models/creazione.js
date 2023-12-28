const db=require("./database");
const DataTypes=require("sequelize").DataTypes;
const utente = require("./utente"); //bisogna crearlo

const creazione = {};


const Creazione = db.define('Creazione', {
    idCreazione: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkUtente: {    //Bisogna creare il model Utente
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: utente.Utente,
            key: 'idUtente'
        }
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    immagine:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descrizione:{
        type: DataTypes.STRING(512),
        allowNull: false
    },
    is_pubblico:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('Personaggio', 'Ambiente'),
        allowNull: false
    },
    sesso:{
        type: DataTypes.ENUM('Uomo', 'Donna', 'Altro'),
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Associazioni
Creazione.belongsTo(utente.Utente, { //Bisogna creare il model Utente
    foreignKey: 'fkUtente',
    as: 'Creatore'
});

/**
 * Restituisce la creazione con l'id dato in input.
 * @function
 * @param {Number} idCreazione Identificativo della creazione
 */
creazione.getById=(idCreazione)=>{
    return Creazione.findByPk(idCreazione);
};


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
 * @param {Boolean} dati.is_pubblico - Indica se il personaggio è pubblico o privato
 * @param {String} dati.sesso - Enum che rappresenta il sesso del personaggio {Uomo, Donna o Altro}
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del personaggio appena creato
 */
creazione.createPersonaggio = (dati)=>{
    return Creazione.create({
        fkUtente: dati.fkUtente,
        nome: dati.nome,
        immagine: dati.immagine,
        descrizione: dati.descrizione,
        is_pubblico: dati.is_pubblico,
        tipo: 0,
        sesso: dati.sesso
    });
};



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
 * @param {Boolean} dati.is_pubblico - Indica se l'ambiente è pubblico o privato
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del'ambiente appena creato
 */
creazione.createAmbiente = (dati)=>{
    return Creazione.create({
        fkUtente: dati.fkUtente,
        nome: dati.nome,
        immagine: dati.immagine,
        descrizione: dati.descrizione,
        is_pubblico: dati.is_pubblico,
        tipo: 1
    });
};
module.exports=creazione;