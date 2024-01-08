const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const sessione = require("./sessione");
const creazione = require("./creazione");

const conversazione = {}

//TODO: Gestire la data di creazione e ultimo avvio con timestamps?
const Conversazione = db.define('Conversazione', {
    idConversazione: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkSessione: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: sessione.Sessione,
            key: 'idSessione'
        }
    },
    fkPersonaggio: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: creazione.Creazione,
            key: 'idCreazione'
        }
    },
    dataAvvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.literal('NOW()')
    },
    ultimoAvvio: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

/**
 * Restituisce la conversazione con l`ID dato in input
 *
 * @function
 * @param {Number} idConversazione - ID della conversazione richiesta
 * @return {Promise<>} Promise contenente l`istanza della conversazione trovata oppure null se non è stata trovata
 */
conversazione.getById = (idConversazione)=>{
    return Conversazione.findByPk(idConversazione);
};

/**
 * Restituisce la conversazione corrispondente alla sessione e al personaggio dati in input
 *
 * @function
 * @param {Number} idSessione - ID della sessione
 * @param {Number} idPersonaggio - ID del personaggio
 * @return {Promise<>} Promise contenente l`istanza della conversazione trovata oppure null se non è stata trovata
 */
conversazione.getBySessioneAndPersonaggio = (idSessione, idPersonaggio)=>{
    return Conversazione.findAll({
        where: {
            fkSessione: idSessione,
            fkPersonaggio: idPersonaggio
        }
    });
};

/**
 * Crea e salva un nuova conversazione nel database.
 *
 * @function
 * @param {Object} dati - I dati della conversazione da salvare.
 * @param {Number} dati.fkSessione - L'ID della sessione a cui appartiene la conversazione.
 * @param {Number} dati.fkPersonaggio - L`ID del personaggio a cui è legata la conversazione.
 * @returns {Promise<Object>} Un oggetto rappresentante la conversazione appena creata.
 */
conversazione.createConversazione = (dati) =>{
    const currentDate = new Date();
    return conversazione.create({
        fkSessione: dati.fkSessione,
        fkPersonaggio: dati.fkPersonaggio,
        dataAvvio: currentDate,
        ultimoAvvio: currentDate
    });
};

conversazione.Conversazione=Conversazione;

module.exports=conversazione;