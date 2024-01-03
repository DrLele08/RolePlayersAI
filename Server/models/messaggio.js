const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const conversazione = require("./conversazione");

const messaggio = {}

//TODO: Gestire la data di invio con timestamps?
const Messaggio = db.define('Messaggio', {
    idMessaggio: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkConversazione: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: conversazione.Conversazione,
            key: 'idConversazione'
        }
    },
    corpo: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    isUtente: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

messaggio.Messaggio=Messaggio;

module.exports=messaggio;