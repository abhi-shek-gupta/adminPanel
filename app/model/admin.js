const  mongoose  =  require('mongoose');
var Schema=mongoose.Schema;

var adminAuthSchema = new Schema({
    email :{
        type : String,
        required: "email is required.", 
    },
    password : {
        type : String,
        required: "Password  is required.", 
    }
});
module.exports=mongoose.model('Admin',adminAuthSchema);