
const    mongoose   =   require('mongoose'),
         jwt        =   require('jsonwebtoken'),
         Path       =   require('path'),
         config  =   require(Path.resolve('./app/config/config')),
         admin      =   require(Path.resolve('./app/model/admin'));


class AdminController{

    login(req,res){
        console.log("in login function");
        let obj = req.body;
         console.log("obj :",obj);
         console.log("req.body :",obj);

        if((!obj.email) && (!obj.password)){
           return res.status(412).json({ type: "error", message: "Insufficent Data"});
        }//if
        else{
         admin.findOne({email : obj.email},(err,data) =>{
             if(err){
               return  res.status(412).json({ type: "error", message: "something went wrong !",err:err});
             }//if
             
             if (!data){
                res.status(412).json({ type: "error", message: "Athentication failed,NO such user"});
             }//if
             else{
                 if(data.password != obj.password){
                   return  res.status(412).json({ type: "error", message: "Invalid Password"});
                 }
                 else {
                     //generate token 
                     let id ={_id:data._id};
                     var token = jwt.sign({id},config.secretKey,{
                         expiresIn:86400//expire in 24hours 
                        });

                        return  res.status(200).json({ type: "success", message: "token genertaed", token : token});
                 }//else
             }
            
         })  
        }//else


    }//login()

    
    
}//AdminController


module.exports = AdminController;