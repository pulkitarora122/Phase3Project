const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MessageSchema=new Schema({
    message:{
        type:String
    },
    user:{
        type:String
    }
})
const message=mongoose.model('message',MessageSchema);
module.exports=message;