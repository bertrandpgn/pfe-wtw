//'use strict';
const router = require('./routes');
const mongoose =require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

const connections = [];

//mongoose setup
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/pfetest', { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router);

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 4001;
server.listen(PORT);

console.log('Server is running');

io.sockets.on('connection',(socket) => {
   connections.push(socket);
   console.log(' %s sockets is connected', connections.length);

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
   });
});

app.get('/', (req, res) => {
    res.send('SocketIO backend for wtw');
 });

app.get('/poids',(req,res)=>{
    console.log("Poids: " + req.query.value);
    io.sockets.emit('nouveau poids', {poids: req.query.value});
    res.json({success:"ok"});
});

app.get('/angle',(req,res)=>{
    console.log("Angle: "+ req.query.value);
    io.sockets.emit('nouvel angle', {angle: req.query.value});
    res.json({success:"ok"});
});


module.exports = app;
