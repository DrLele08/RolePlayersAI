const seq=require("sequelize").Sequelize;
const utilsDB=require("./utilsDB");

const sequelize = new seq(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 500,
            min: 0,
            idle: 10000
        },
        query:{
            raw: false
        },
        logging: process.env.DEBUG_DB>0
    },
);

sequelize.authenticate().then(() => {
    console.log('Connessione con il DB riuscita.');
    utilsDB.SetRelationships();
    console.log('Associazioni create.');
}).catch((error) => {
    console.error("Errore durante il collegamento con il DB: "+error);
});

module.exports=sequelize;
