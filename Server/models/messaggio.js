const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const conversazione = require("./conversazione");
const moment = require("moment-timezone");

const PAGE_SIZE = 16;

/**
 * Oggetto contenente funzioni per la gestione dei messaggi nel database.
 * @namespace
 * @property {Function} getById - Ottiene un messaggio dal database tramite il suo ID.
 * @property {Function} getByConversazione - Ottiene tutti i messaggi di una conversazione dal database.
 * @property {Function} getByConversazionePaginated - Ottiene i messaggi paginati di una conversazione dal database.
 * @property {Function} createMessaggio - Crea un nuovo messaggio nel database.
 * @property {Messaggio} Messaggio - Modello Sequelize del messaggio.
 */
const messaggio = {}

/**
 * Oggetto rappresentante un messaggio nel sistema.
 * @typedef {Object} Messaggio
 * @property {number} idMessaggio - Identificativo univoco del messaggio (autoincrementato).
 * @property {number} fkConversazione - Chiave esterna che collega il messaggio a una conversazione.
 * @property {string} corpo - Contenuto del messaggio.
 * @property {string} dataInvio - Data e ora di invio del messaggio (formattata secondo il fuso orario corrente).
 * @property {boolean} isUtente - Indica se il messaggio è stato inviato dall`utente.
 */
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
        defaultValue: DataTypes.NOW,
        get(){
            const value = this.getDataValue('dataInvio');
            return moment(value).format();
        }
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
 * @function
 * @param {Number} idMessaggio - ID del messaggio da cercare
 * @return {Promise<Messaggio>} Promise che restituisce il messaggio trovato o null se non è stato trovato
 */
messaggio.getById = (idMessaggio)=>{
    return Messaggio.findByPk(idMessaggio);
};

/**
 * Ottiene tutti i messaggi di una conversazione ordinati per data di invio
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
 * Restituisce i messaggi di una conversazione paginati e ordinati per data di invio
 * @function
 * @async
 * @param {Number} idConversazione - ID della conversazione per cui ottenere i messaggi
 * @param {Number} page - Numero di pagina desiderato
 * @return {Promise<{
 *      messaggi: Messaggio[],
 *      totalMessages: Number,
 *      totalPages: Number,
 *      pageSize: Number,
 *      currentPage: Number
 *      }>} - un oggetto contenente informazioni sulla paginazione e i messaggi della pagina richiesta
 */
messaggio.getByConversazionePaginated = async (idConversazione, page) => {
    const offset = (page - 1) * PAGE_SIZE;

    const result = await Messaggio.findAndCountAll({
        where: {
            fkConversazione: idConversazione
        },
        order: [['dataInvio', 'DESC']],
        limit: PAGE_SIZE,
        offset: offset
    });

    const totalPages = Math.ceil(result.count/PAGE_SIZE);
    return {
        totalMessages: result.count,
        totalPages: totalPages,
        currentPage: page,
        pageSize: PAGE_SIZE,
        messaggi: result.rows
    };
};


/**
 * Crea e salva un nuovo messaggio nel database.
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
        isUtente: dati.isUtente
    });
};

messaggio.Messaggio=Messaggio;

module.exports=messaggio;