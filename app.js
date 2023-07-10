var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require("socket.io")(http)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

io.on('connection',(socket)=>{
    console.log("user is connected");
    socket.on("disconnect",function(){
        console.log("a user is disconnected");
    })
})
http.listen(3000,()=>{
    console.log("app listening at http://localhost:3000");
})