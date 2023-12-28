const utils={};

utils.checkParameter=(req,vettParam)=>{
    for(let i=0;i<vettParam.length;i++)
    {
        if(req[vettParam[i]] === undefined)
            return false;
    }
    return true;
};

//Controlla la validità dell`ID
utils.checkId=(id)=>{
    return id > 0;
}

module.exports=utils;
