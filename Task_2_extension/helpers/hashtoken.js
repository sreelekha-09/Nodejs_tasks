const crypto=require('crypto');
module.exports=function generateToken(username)
{
    const hashMD5 = crypto.createHash('md5').update(username).digest('hex');
    return hashMD5;
}