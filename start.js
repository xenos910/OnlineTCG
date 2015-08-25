var express = require('express');
var path = require('path');
var app = express();
var server = app.listen(80);
var io = require('socket.io').listen(server);

app.use('/socket.io', express.static(path.join(__dirname,'/node_modules/socket.io/lib/')));
app.use('/bootstrap', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/')));
app.use('/', express.static(__dirname));

 
 
 
 
var Card = function (firstName,xpos,ypos) {
  this.picture = firstName;
  
  this.xpos = firstName;
  
  this.ypos = firstName;
  console.log('Card instantiated');
};

var Player = function () {
  this.Deck = firstName;
  this.Hand = [];
  this.Graveyard = [];
  this.Exile = [];
};

var Game = function() {
	this.Playerlist = [];
}

var Server = function() {
	this.Games = [];
}
 
 

app.get('/', function (req, res) {
  console.log('asdfasdfa');
  res.sendFile('./index.html', {root: __dirname });
});

var connectedusers = [];

var chatlog = [{ username: "Admin", message: "Hello, new user! Type in a username and start chatting!" }];

var battlefield = [{ cardID: 0, xpos: '10px', ypos: '10px'},{ cardID: 1, xpos: '10px', ypos: '10px'},{ cardID: 2, xpos: '10px', ypos: '10px'}];

var gamestates = { 'room1': battlefield,'room2': [{ cardID: 0, xpos: '10px', ypos: '10px'},{ cardID: 1, xpos: '10px', ypos: '10px'},{ cardID: 2, xpos: '10px', ypos: '10px'}]};

io.sockets.on('connection', function(socket) {
 console.log('Connection from user: ' + socket.id);
 socket.room = 'room1'; 
 connectedusers[socket.id] = socket.id;
 socket.join('room1');

 socket.emit('updategamestate', battlefield);
 socket.on('refresh', function() { 
    console.log('Refresh received from ID: ' + socket.id);

	//eventually use this to connect to server using custom event.
  });

  socket.on('disconnect', function() { 
    console.log('Disconnect received from ID: ' +  socket.id);
  });
  if(chatlog.length > 0) { console.log("sending chatlog"); 
    socket.emit('chatlog', {chatlog: chatlog});
  }
	socket.on('switchRoom', function(newroom){

		console.log(newroom);
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		socket.broadcast.to(socket.room).emit('news', 'SERVER', socket.username+' has left this room');
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('news', 'SERVER', socket.username+' has joined this room');
		socket.emit('updategamestate', gamestates[socket.room], newroom);
	});

  
  socket.on('message', function(information) {
    chatlog.push( { username: information.username, message: information.message});
    console.log("user: " + information.username + " said " + information.message);
    socket.broadcast.to(socket.room).emit('news', { username: information.username, message: information.message });
  });

  socket.on('diceroll', function(information) {
    console.log(information);
    var rand = Math.floor(Math.random() * (information.dicesize - 1)) + 1;
    chatlog.push( { username: "GameLog", message: "Player rolled " + rand});
    socket.emit('news', { username: "GameLog", message: "Player rolled " + rand });
  }); 

  //who adds the px? client or server?
	socket.on('updateCard', function(information) {
	battlefield[information.cardID] = information;
    console.log('updateCard was attempted, you puny mortal!');
	console.log(information);
	console.log('data');
	console.log(battlefield);
    socket.broadcast.emit('cardmove', information);
    //})
  });
});
console.log('version 0.1.5');

