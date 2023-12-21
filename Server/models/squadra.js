const db=require("./database");
const DataTypes=require("sequelize").DataTypes;

const squadra={};

const Squadra = db.define('Squadra', {
    idSquadra: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});


/**
 * Restituisce la squadra con l'ID dato in input.
 * @param {Number} id Identificativo della squadra
 */
squadra.getById=(id)=>{
    return Squadra.findByPk(id);
};

module.exports=squadra;
