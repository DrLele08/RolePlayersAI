const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const conversazione = require("./conversazione");

const messaggio = {}

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
    dataInvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.literal('NOW()')
    },
    isUtente: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});

/**
 * Ottiene il messaggio con l`id dato in input
 *
 * @function
 * @param {Number} idMessaggio - ID del messaggio da cercare
 * @return {Promise<Messaggio>} Promise che restituisce il messaggio trovato o null se non è stato trovato
 */
messaggio.getById = (idMessaggio)=>{
    return Messaggio.findByPk(idMessaggio);
};

/**
 * Ottiene tutti i messaggi di una conversazione ordinati per data di invio
 *
 * @function
 * @param {Number} idConversazione - ID della conversazione per cui ottenere i messaggi
 * @return {Promise<Array>} Un array di oggetti rappresentanti i messaggi ordinati per data
 */
messaggio.getByConversazione = (idConversazione)=>{
    return Messaggio.findAll({
        where: {
           fkConversazione: idConversazione
        },
        order: [['dataInvio', 'ASC']]
    });
};


/**
 * Crea e salva un nuovo messaggio nel database.
 *
 * @function
 * @param {Object} dati - I dati del messaggio da salvare.
 * @param {Number} dati.fkConversazione - L'ID della conversazione a cui appartiene il messaggio.
 * @param {String} dati.corpo - Il corpo del messaggio.
 * @param {Boolean} dati.isUtente - Indica se il mittente del messaggio è un utente.
 * @returns {Promise<Object>} Un oggetto rappresentante il messaggio appena salvato.
 */
messaggio.createMessaggio = (dati) =>{
    return Messaggio.create({
        fkConversazione: dati.fkConversazione,
        corpo: dati.corpo,
        dataInvio: new Date(),
        isUtente: dati.isUtente
    });
};

messaggio.Messaggio=Messaggio;

module.exports=messaggio;