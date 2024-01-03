const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const abbonamento = require("./abbonamento");

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
        allowNull: false,
        unique: true
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
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(256),
        allowNull: false
    },
    dataNascita:{
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING(10),
        allowNull: true
    },
    ruolo:{
        type: DataTypes.ENUM('Utente', 'Moderatore', 'Amministratore'),
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

/**
 *Restituisce l`utente con l`ID dato in input escludendo le informazioni riguardanti password e auth token.
 *
 * @function
 * @param {Number} id - ID dell'utente
 * @returns {Promise} - Promise che si risolve con l'istanza dell'utente corrispondente all'ID, o null se non trovato
 */
utente.getById=(id)=>{
    return Utente.findByPk(id, {
        attributes: {exclude: ['password', 'authToken']}
    });
};



/**
 *Restituisce l`utente con l`ID dato in input escludendo le informazioni riguardanti password e auth token.
 *
 * @function
 * @param {Number} id - ID dell'utente
 * @param {String} tokenAuth - token Autenticazione
 * @returns {Promise} - Promise che si risolve con l'istanza dell'utente corrispondente all'ID, o null se non trovato
 */
utente.getByIdandTokenAuth=(id,tokenAuth)=>{
return Utente.findAll({
    where:{
        idUtente : id,
        authToken : tokenAuth,
    },
        attributes: {exclude: ['password', 'authToken']}
    });
};




/**
 *Restituisce l`abbonamento con l`ID dato in input.
 *
 * @function
 * @param {Number} idUtente - ID dell'utente
 * @returns {Promise<Abbonamento>} - Promise che si risolve con l'istanza dell'utente corrispondente all'ID, o null se non trovato
 */
utente.getActualAbbonamento=async(idUtente) => {
    const utenteCercato = await utente.findByPk(idUtente);
    return utenteCercato.getAbbonamento();
};


utente.Utente=Utente;

module.exports=utente;