var express=require('express');
var Message = require("./models/message.js")
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chat').then((ans)=>{
    console.log("connected successful")
}).catch(err=>{
    console.log(err.Message)
})

var app=express();
var http=require('http').Server(app)

var io = require('socket.io')(http)

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/user.html");
})
var users=[];
io.on('connection',function(socket){
console.log("user is connected")

socket.on("SetUserName",function(data){
    console.log(data);

    if(users.indexOf(data)>-1){
        socket.emit(
        "userExists",
        data + "username is already taken"
)
}
    else{
        users.push(data);
        socket.emit("userSet",{username:data})
    }
})
socket.on('msg',function(data){
   io.sockets.emit('newmsg',data)
   Message.create(data).then(function(data){
    console.log("send create reqbody user")
    console.log(data);
    console.log("send end reqbody user");
    console.log("message object" + data);
   })
    })
})
http.listen(3000,function(){
    console.log("app listening at http://localhost:3000")
})