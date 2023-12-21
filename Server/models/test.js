const test={};

const sql=require("../models/database")

test.getById=async(id)=>{
  return new Promise((resolve,reject)=>{
      let query="SELECT * FROM Test WHERE idTest=?";
      sql.query(query,[id],(errQ,risQ)=>{
          if(errQ)
          {
              reject("Errore DB: "+errQ);
          }
          else
          {
              if(risQ.length>0)
              {
                  resolve(risQ[0]);
              }
              else
              {
                  reject("Nessun ID trovato");
              }
          }
      });
  });
};

module.exports=test;
