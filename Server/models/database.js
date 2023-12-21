const mysql=require("mysql");
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 500
});
module.exports=connection;
