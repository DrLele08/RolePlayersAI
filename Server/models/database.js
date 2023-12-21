const seq=require("sequelize").Sequelize;

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
            raw: true
        },
        logging: process.env.DEBUG_DB>0
    },
);

sequelize.authenticate().then(() => {
    console.log('Connessione con il DB riuscita.');
}).catch((error) => {
    console.error("Errore durante il collegamento con il DB: "+error);
});

module.exports=sequelize;
