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
}

conversazione.Conversazione=Conversazione;

module.exports=conversazione;