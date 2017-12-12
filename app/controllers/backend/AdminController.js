
const    mongoose   =   require('mongoose'),
         jwt        =   require('jsonwebtoken'),
         Path       =   require('path'),
         async      = require('async'),
         config     =   require(Path.resolve('./app/config/config')),
         admin      =   require(Path.resolve('./app/model/admin'));
         blog       =   require(Path.resolve('./app/model/blog'));
         


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

    addBlog(req,res){
        console.log("in addBlog function");
        console.log(req.body);
        let d=req.body//fields sent in body

        var data = new blog(d);
        data.save((err,result)=>{
            if(err) res.status(412).json({type:"error",message:"Oops something went wrong!",error:err});
            return res.json({type:"success", message:"Blog Added succesfully ", data:result});
        })

    }//addBlog
    
    getBlogs(req, res){
        let obj = req.query;
        console.log("in getblogs");
    
        var limit=obj.limit?parseInt(obj.limit):5;//results per page
        var page=(obj.page)?parseInt(obj.page):1;//offset
        var offset = (page-1)*limit;
        
        async.waterfall([
            (_callback) => {
                blog.aggregate([
                    {
                        $project :{
                            "title":1,
                            "content":1,
                            "status" :1
                        }
                    },
                    { 
                        $skip : offset
                    },
                    { 
                        $limit : limit 
                    }
                    
                ]).then(response => _callback(null, response))
                .catch(err=>_callback(err));
            }
        ], (err, results) => {
            if(err) res.status(412).json({type:"error",message:"Oops something went wrong!",error:err});
            return res.json({type:"success", message:"blogs returned", data:results});
        });
    }//getBlogs()

    getABlog(req,res){
        console.log("in getABlog");
        console.log(req.query)
        let _id=req.query._id;
        
        console.log(_id);
        if(_id){
            async.waterfall([
                (_callback)=>{
                    blog.findOne({"_id" : _id},(err,result)=>{
                        if(err) _callback(err);
                        return _callback(null, result);
                    })
                }
            ], (err, result) => {
                if(err) res.status(412).json({type:"error",message:"something went wrong !",error:err});
                else if(result){return res.json({type:"success", message:"blog data ", data:result});}
    
            })
           
        }//if
        else{
            res.status(412).json({type:"error",message:"error in getABlog"});  
              
        }
    }//getABlog()

   
    editBlog(req,res){
        console.log("in editBlog");
        console.log(req.query)
        let _id=req.query._id;
        let d=req.body//fields sent in body to update
        console.log(_id);
        if(_id){
            async.waterfall([
                (_callback)=>{
                    blog.updateOne({"_id" : _id},{$set :d
                },(err,result)=>{
                        if(err) _callback(err);
                        return _callback(null, result);
                    })
                }
            ], (err, result) => {
                if(err) res.status(412).json({type:"error",message:"something went wrong !",error:err});
                else if(result){return res.json({type:"success", message:"blog data ", data:result});}
    
            })
           
        }//if
        else{
            res.status(412).json({type:"error",message:"Plaese slect the blog to edit"});  
              
        }
    }//editBlog()

    deleteBlog(req, res) {
        console.log("in deleteBlog");
        console.log(req.query)
        let _id = req.query._id;
    
        if (_id) {
            blog.updateOne({ _id: _id }, {
                $set: {
                    status:"denied",
                    trash: true
                }
            }, (err, result) => {
                if (err) res.status(412).json({ type: "error", message: "something went wrong !", error: err });
                return res.json({ type: "success", message: "blog deleted ", data: result });
            })
        }//if
        else {
            res.status(412).json({ type: "error", message: "Plaese slect the blog to delete" });
        }
    
    }
    
}//AdminController


module.exports = AdminController;