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
 * @param {Boolean} dati.is_pubblico - Indica se il personaggio è pubblico o privato
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
        is_pubblico: dati.is_pubblico,
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
 * @param {Boolean} dati.is_pubblico - Indica se l'ambiente è pubblico o privato
 *
 * @return {Promise<Creazione>} - Promise che si risolve con l`istanza del'ambiente appena creato
 */
creazione.createAmbiente = (dati)=>{
    return Creazione.create({
        fkUtente: dati.fkUtente,
        nome: dati.nome,
        immagine: dati.immagine,
        descrizione: dati.descrizione,
        is_pubblico: dati.is_pubblico,
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
 * Restituisce la creazione con il nome dato in input.
 * @function
 * @param {String} name nome della creazione
 */
creazione.getByName=(name)=>{
    return Creazione.findAll({
        where: {
            nome: name,
        }
    })
};

/**
 * Restituisce la creazione con il tipo dato in input.
 * @function
 * @param {String} t tipo della creazione
 */
creazione.getByType=(t)=>{
    return Creazione.findAll({
        where: {
            tipo: t,
        }
    })
};


/**
 * Ottiene una lista paginata di creazioni in base al tipo e al numero di pagina
 *
 * @async
 * @function
 *
 * @param {String} tipo - Tipo di creazioni da recuperare ("Personaggio" | "Ambiente")
 * @param {Number} page - Numero di pagina desiderato
 * @return {Promise<{
 *     totalItems: Number,
 *     totalPages: Number,
 *     currentPage: Number,
 *     pageSize: Number,
 *     creazioni: Creazione[]
 * }>} - Promise che si risolve con un oggetto contenente informazioni sulla paginazione e la lista di creazioni
 */
creazione.getCreationsWithPagination = async (tipo, page) =>{
    const offset = (page-1) * pageSize;

    //restituisce i risultati della findAll combinati ai risultati della Count
    const result = await Creazione.findAndCountAll({
        where: {
            tipo: tipo
        },
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