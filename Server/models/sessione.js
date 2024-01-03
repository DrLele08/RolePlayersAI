const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const utente = require("./utente");
const contesto = require("./contesto");

const sessione = {}

//TODO: Gestire la data di creazione e ultimo avvio con timestamps?
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
    }
},{
    freezeTableName: true,
    timestamps: false
});

sessione.Sessione=Sessione;

module.exports=sessione;