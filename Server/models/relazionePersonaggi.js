const db= require("./database");
const DataTypes= require("sequelize").DataTypes;
const contesto = require("./contesto"); //Bisogna creare il model contesto
const personaggio = require("./creazione");

const relazionePersonaggi = {};

const RelazionePersonaggi = db.define('RelazionePersonaggi', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descrizione: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contesto_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references:{
            model: contesto.Contesto, //bisogna creare il model contesto
            key: 'id'
        }
    },
    personaggio1_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: personaggio.Creazione,
            key: 'id'
        }
    },
    personaggio2_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: personaggio.Creazione,
            key: 'id'
        }
    }
},{
    freezeTableName: true,
    timestamps: false
});


//Associazioni
RelazionePersonaggi.belongsTo(Contesto, { //bisogna creare il model contesto
    foreignKey: 'contesto_id',
    as: 'Contesto'
});
RelazionePersonaggi.belongsTo(Personaggio, {
    foreignKey: 'personaggio1_id',
    as: 'Personaggio1'
});
RelazionePersonaggi.belongsTo(Personaggio, {
    foreignKey: 'personaggio2_id',
    as: 'Personaggio2'
});


/**
 *Restituisce la relazione tra personaggi con l`ID dato in input.
 *
 * @function
 * @param {Number} id - ID della relazione
 * @returns {Promise<RelazionePersonaggi | null>} - Promise che si risolve con l`istanza di RelazionePersonaggio corrispondente all ID, o null se non trovato
 */
relazionePersonaggi.getById=(id)=>{
    return RelazionePersonaggi.findByPk(id);
};

/**
 * Crea e inserisce una nuova relazione tra personaggi all`interno dell DB
 *
 * @function
 *
 * @param {Object} dati - Dati della nuova relazione
 * @param {String} dati.descrizione - Descrizione della relazione
 * @param {Number} dati.contesto_id - ID del contesto in cui è definita la relazione
 * @param {Number} dati.personaggio1_id - ID del primo personaggio che partecipa alla relazione
 * @param {Number} dati.personaggio2_id - ID del secondo personaggio che partecipa alla relazione
 *
 * @returns {Promise<RelazionePersonaggi>} - Promise che si risolve con l`istanza di RelazionePersonaggi appena creata e inserita nel DB
 */
relazionePersonaggi.createRelazionePersonaggi = (dati)=>{
    return RelazionePersonaggi.create({
        descrizione: dati.descrizione,
        contesto_id: dati.contesto_id,
        personaggio1_id: dati.personaggio1_id,
        personaggio2_id: dati.personaggio2_id
    });
};

/**
 * Restituisce tutte le relazioni tra personaggi definite all`interno del contesto dato in input
 *
 * @function
 * @param {Number} idContesto - ID del contesto di cui si vogliono recuperare le relazioni tra personaggi
 * @returns {Promise<Array<RelazionePersonaggi>>} - Promise che si risolve con un array di istanze corrispondenti al contesto, oppure un array vuoto se non sono presenti
 */
relazionePersonaggi.getByContesto = (idContesto)=>{
    return RelazionePersonaggi.findAll({
        where: {
            contesto: idContesto
        }
    });
};

module.exports=relazionePersonaggi;