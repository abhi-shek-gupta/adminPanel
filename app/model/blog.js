const  mongoose  =  require('mongoose');
var Schema=mongoose.Schema;

var blogPostSchema = new Schema({
    title :{
        type : String,
        required: "title is required."
    },
    content : {
        type : String,
        required: "Content  is required."
    },
    status : {
        type : String,
        default: "approved"
    }
},{timestamp : true});
module.exports=mongoose.model('blog',blogPostSchema);