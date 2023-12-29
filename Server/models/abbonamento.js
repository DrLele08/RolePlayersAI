const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const utente = require("./utente");

const abbonamento = {};

const Abbonamento = db.define('Abbonamento', {
    idAbbonamento: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomeTier: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    prezzo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    maxMsg: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

//Associazioni
Abbonamento.hasMany(utente.Utente, {
    foreignKey: 'fkAbbonamento',
    as: 'UtentiAbbonati'
});

//TODO scrivere le query


module.exports=abbonamento;