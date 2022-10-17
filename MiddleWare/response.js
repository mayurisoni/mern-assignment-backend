module.exports=(req,res,next)=>{
   
  return res.status(statuscode).json({error:error,message:msg,response:response})
    }