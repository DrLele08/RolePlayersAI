const squadra={};

const sql=require("./database");


squadra.getById=async(id)=>{
  return new Promise((resolve,reject)=>{
      let query="SELECT * FROM Squadra WHERE idSquadra=?";
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

module.exports=squadra;
