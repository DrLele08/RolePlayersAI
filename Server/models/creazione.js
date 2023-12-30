const db= require("./database");
const DataTypes=require("sequelize").DataTypes;
const utente = require("./utente"); //TODO bisogna crearlo

const pageSize = 16;

const creazione = {};


const Creazione = db.define('Creazione', {
    idCreazione: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkUtente: {    //Bisogna creare il model Utente
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: utente.Utente,
            key: 'idUtente'
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
    isPubblico:{
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
    foreignKey: 'fkUtente',
    as: 'Creatore'
});

/**
 * Restituisce la creazione con l'id dato in input.
 *
 * @function
 *
 * @param {Number} idCreazione Identificativo della creazione
 */
creazione.getById=(idCreazione)=>{
    return Creazione.findByPk(idCreazione);
};


/**
 * Crea e inserisce un nuovo Personaggio all`interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del nuovo personaggio
 * @param {Number} dati.fkUtente - Id dell`utente che ha creato il Personaggio
 * @param {String} dati.nome - Nome del Personaggio
 * @param {String} dati.immagine - Percorso immagine del personaggio
 * @param {String} dati.descrizione - Descrizione del personaggio
 * @param {Boolean} dati.isPubblico - Indica se il personaggio è pubblico o privato
 * @param {String} dati.sesso - Enum che rappresenta il sesso del personaggio {Uomo, Donna o Altro}
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del personaggio appena creato
 */
creazione.createPersonaggio = (dati)=>{
    return Creazione.create({
        fkUtente: dati.fkUtente,
        nome: dati.nome,
        immagine: dati.immagine,
        descrizione: dati.descrizione,
        isPubblico: dati.isPubblico,
        tipo: 0,
        sesso: dati.sesso
    });
};



/**
 * Crea e inserisce un nuovo Ambiente all`interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del nuovo ambiente
 * @param {Number} dati.fkUtente - Id dell`utente che ha creato l'ambiente
 * @param {String} dati.nome - Nome ambiente
 * @param {String} dati.immagine - Percorso immagine ambiente
 * @param {String} dati.descrizione - Descrizione ambiente
 * @param {Boolean} dati.isPubblico - Indica se l'ambiente è pubblico o privato
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del'ambiente appena creato
 */
creazione.createAmbiente = (dati)=>{
    return Creazione.create({
        fkUtente: dati.fkUtente,
        nome: dati.nome,
        immagine: dati.immagine,
        descrizione: dati.descrizione,
        isPubblico: dati.isPubblico,
        tipo: 1
    });
};

/**
 * Elimina una creazione presente nel DB
 *
 * @function
 * @param {Number} id - ID della creazione
 *
 * @returns {Promise<Number>} - Promise che si risolve con il numero dell'id della creazione eliminata
 */
creazione.deleteById = async (id) =>{
 return creazione.destroy({
    where: {
        idCreazione: id,
    },
});
}

/**
 * Restituisce una lista di creazioni filtrate e paginate in base ai criteri specificati
 *
 * @async
 * @function
 *
 * @param {Object} filters - Oggetto contenente i criteri di filtraggio per la query
 * @param {String} [filters.nome] - Nome della creazione da cercare (la ricerca avverrà in base ad una corrispondenza parziale)
 * @param {Number} filters.tipo - Tipo della creazione da cercare (0=Personaggio, 1=Ambiente)
 * @param {Boolean} isPubblico - Indica se la creazione da cercare è pubblica o privata
 * @param {Number} page - Numero di pagina desiderato per la visualizzazione dei risultati
 * @return {Promise<{
 *      totalItems: Number,
 *      totalPages: Number,
 *      currentPage: Number,
 *      pageSize: Number,
 *      creazioni: Creazione[]
 *      }>} - Promise che si risolve con un oggetto contenente informazioni sulla paginazione e la lista di creazioni
 */
creazione.getByFilter = async (filters, page) =>{
    const Op = require("sequelize").Op;
    const offset = (page-1) * pageSize;

    if(filters.nome){
        filters.nome = {[Op.substring]: filters.nome}
    }

    //restituisce i risultati della findAll con filtri combinati ai risultati della Count
    const result = await Creazione.findAndCountAll({
        where: filters,
        limit: pageSize,
        offset: offset
    });

    //Calcola il numero totale di pagine per visualizzare tutti i risultati (arrotondato per eccesso)
    const totalPages = (result.count + pageSize - 1)/pageSize;

    return {
        totalItems: result.count,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
        creazioni: result.rows
    };
}



module.exports=creazione;

