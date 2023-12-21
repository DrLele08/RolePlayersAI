const utils={};

utils.checkParameter=(req,vettParam)=>{
    for(let i=0;i<vettParam.length;i++)
    {
        if(req[vettParam[i]] === undefined)
            return false;
    }
    return true;
};

module.exports=utils;
