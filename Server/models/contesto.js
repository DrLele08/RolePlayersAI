const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const utente = require("./utente");
const ambiente = require("./creazione");

const contesto = {};

const Contesto = db.define('Contesto',{
    idContesto: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fkUtente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: utente.Utente,
            key: 'id'
        }
    },

    fkAmbiente: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: ambiente.Creazione,
            key: 'id'
        }
    },
    nome: {
        type: DataTypes.STRING(25),
        allowNull: false
    },

    descrizione: {
        type: DataTypes.STRING(512),
        allowNull: false
    },

    isPubblico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
});


/**
 *Restituisce il Contesto con l`ID dato in input.
 *
 * @function
 * @param {Number} idContesto - ID del Contesto
 * @returns {Promise<Contesto | null>} - Promise che si risolve con l`istanza di Contesto corrispondente all ID, o null se non trovato
 */
contesto.getContestoById = async(idContesto)=> {
    return await Contesto.findByPk(idContesto);
}


/**
 * Restituisce tutti contesti creati nel DB
 *
 * @function
 * @returns {Promise<Array<Contesto>>} - Promise che si risolve con un array di istanze, oppure un array vuoto se non sono presenti
 */
contesto.getAll = async()=> {
    return await Contesto.findAll();
};


/**
 * Crea e inserisce un nuovo Contesto all'interno del DB
 *
 * @function
 *
 * @param {Object} dati - Dati del Contesto
 * @param {Number} dati.fkUtente - Id dell'utente che ha creato il contesto
 * @param {Number} dati.fkAmbiente - Id dell'ambiente in cui è stato definito il contesto
 * @param {String} dati.nome - Nome del Contesto
 * @param {String} dati.descrizione - Descrizione del Contesto
 * @param {Boolean} dati.isPubblico - Indica se il Contesto è pubblico o privato
 *
 * @returns {Promise<Contesto>} - Promise che si risolve con l'istanza del contesto creato
 */

contesto.createContesto = async(dati) =>{
    return await Contesto.create({
        fkUtente: dati.fkUtente,
        fKAmbiente: dati.fkAmbiente,
        nome: dati.nome,
        descrizione: dati.descrizione,
        isPubblico: dati.isPubblico
    });
};


/**
 * Elimina un Contesto presente nel DB
 *
 * @function
 * @param {Number} idContesto - ID del Contesto
 *
 * @return {Promise<Number>}
 */
contesto.deleteContesto = async(idContesto) =>{
     return await Contesto.destroy({
        where: {
            idContesto: idContesto
        }
    })
}

/**
 * Restituisce una lista di contesti filtrate
 *
 * @async
 * @function
 *
 * @param {Object} filters - Oggetto contenente i criteri di filtraggio per la query
 * @param {String} [filters.nome] - Nome del contesto da cercare (la ricerca avverrà in base ad una corrispondenza parziale)
 * @param {Number} page - Numero di pagina desiderato per la visualizzazione dei risultati
 * @param {Object} dati - Contiene ruolo e idUtente
 * @return {Promise<{
 *      totalItems: Number,
 *      totalPages: Number,
 *      currentPage: Number,
 *      pageSize: Number,
 *      contesti: Contesto[]
 *      }>} - Promise che si risolve con un oggetto contenente informazioni sulla paginazione e la lista di contesti
 */
contesto.getByFilter = async (filters, page,dati) => {
    const Op = require("sequelize").Op;
    const offset = (page - 1) * pageSize;

    if (filters.nome) {
        filters.nome = {[Op.substring]: filters.nome}
    }

    let result = await Contesto.findAll({
        where:
        filters,
    });

    if (dati.idRuolo === 1) {
        let contestiPubblici = result.filter(c => c.isPubblico === true);
        for (let i = 0; i < result.length; i++) {
            if (result[i].fkUtente === dati.idUtente && result[i].isPubblico === false) {
                contestiPubblici.push(result[i]);
            }
        }
        result = contestiPubblici;
    }
    let totalItems = result.length
    result = result.slice(offset, (pageSize * page));

    //Calcola il numero totale di pagine per visualizzare tutti i risultati (arrotondato per eccesso)
    let totalPages = Math.ceil((result.length)/pageSize);


    return {
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
        creazioni: result
    };
}

contesto.Contesto=Contesto;

module.exports=contesto;
