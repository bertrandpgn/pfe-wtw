//'use strict';
const router = require('./routes');
const mongoose =require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

const connections = [];
const MONGO_PORT = '27017'
const BACK_PORT = '4001';
const DOMAIN = 'wtw.francecentral.cloudapp.azure.com';

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${DOMAIN}:${MONGO_PORT}`, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database`);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router);

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(BACK_PORT);

console.log('Server is running');

io.sockets.on('connection',(socket) => {
   connections.push(socket);
   console.log(' %s sockets is connected', connections.length);

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
   });
});

app.get('/', (req, res) => {
    res.send('Backend wtw v1.0.3' );
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
