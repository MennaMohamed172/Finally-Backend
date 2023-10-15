const checkRole=(...roleTitles)=>{
  return(req,res,next)=>{
    const currentUser = req?.user;
    // see if one of the required roles is the same as the current user role
    const hasAccess= roleTitles.some(roleTitle=>currentUser?.role?.toLowerCase() === roleTitle.toLowerCase())


    // if the user has access pass the request to the next middllware
    if(hasAccess) return next();

    // if the user doesnot have the access send an error message 
    res
    .status(403)
    .send({error:"you don't have the right permisions"})
    .end();
 
  }
}
module.exports= checkRole;
