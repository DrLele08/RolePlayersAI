const db=require("./database");
const DataTypes=require("sequelize").DataTypes;
const utente = require("./utente"); //bisogna crearlo

const creazione = {};


const Creazione = db.define('Creazione', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    utente_id: {    //Bisogna creare il model Utente
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: utente.Utente,
            key: 'id'
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
    foreignKey: 'utente_id',
    as: 'Creatore'
});

/**
 * Restituisce la creazione con l'id dato in input.
 * @param {Number} id Identificativo della creazione
 */
creazione.getById=(id)=>{
    return Creazione.findByPk(id);
};


module.exports=creazione;