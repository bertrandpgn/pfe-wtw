'use strict';

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 4001;
server.listen(PORT);

console.log('Server is running');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const connections = [];

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
