const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const abbonamento = require("./abbonamento"); //TODO creare model Abbonamento

const utente = {};


const Utente = db.define('Utente', {
    idUtente: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkAbbonamento: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: abbonamento.Abbonamento,
            key: 'idAbbonamento'
        }
    },
    username:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    nome:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    cognome:{
        type: DataTypes.STRING(25),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password:{
        type: DataTypes.CHAR(256),
        allowNull: false
    },
    dataNascita:{
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono:{
        type: DataType.STRING(9),
        allowNull: true
    },
    ruolo:{
        type: DataTypes.ENUM('Utente', 'Moderatore', 'Admin'),
        allowNull: false
    },
    msgRimanenti:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authToken:{
        type: DataTypes.CHAR(64),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

//Associazioni
Utente.belongsTo(abbonamento.Abbonamento, {
    foreignKey: 'fkAbbonamento',
    as: 'Abbonamento'
});

//TODO aggiungere tutte le altre associazioni

//TODO aggiungere le query


module.exports=utente;