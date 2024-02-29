const express=require("express");
const app=express();
var io = require("socket.io")

// dotenv setup
const dotenv=require("dotenv");
dotenv.config();

// importing PORT
const PORT=process.env.PORT;

// Importing router 
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');

// connecting db.js
require('./config/db')

const path=require("path");

// router middleware 
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)



// ----------------Deployment--------------------


const __dirname1 = path.resolve();

if(process.env.NODE_ENV==="production"){

    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })

}else{
    app.get("/",(req,res)=>{
        res.send("Hello World!");
    })
}

// ----------------Deployment--------------------

// server is created
const server = app.listen(PORT, (err)=>{
    if(err) {
        console.log(`Server failed to response, ${err}`);
        return;
    }
    console.log(`Server is running on PORT, ${PORT}`)
} )


io =io(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    },
})

io.on("connection", (socket)=>{
    console.log("connected to socket.io");
    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat", (room)=>{
        socket.join(room);
        console.log("User Joined Room: "+ room);
    });

    socket.on('typing', (room)=> socket.in(room).emit("typing"));
    socket.on('stop typing', (room)=> socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived)=>{
        var chat=newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined in the chat");

        chat.users.forEach(user =>{
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })
    socket.off("setup", ()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    })
})