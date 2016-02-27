var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/server', function(req, res){
  res.sendFile(__dirname + '/server.html');
});

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
  	socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3500, function(){
  console.log('listening on *:3500');
});