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

conversazione.Conversazione=Conversazione;

module.exports=conversazione;