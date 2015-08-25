	"use strict";

	function updateTapped(card)
	{
		var deg = (card.dataset.isTapped=='true') ? 90 : 0;

		card.style.webkitTransform = 'rotate('+deg+'deg)'; 
		card.style.mozTransform    = 'rotate('+deg+'deg)'; 
		card.style.msTransform     = 'rotate('+deg+'deg)'; 
		card.style.oTransform      = 'rotate('+deg+'deg)'; 
		card.style.transform       = 'rotate('+deg+'deg)'; 
	}
	
	function tapCard(card)
	{
		card.dataset.isTapped = (card.dataset.isTapped=='false');
		updateTapped(card);
	}
	
	function testTap()
	{}
		let myCard = createCard(0,0);
		tapCard(myCard)
		if(myCard.dataset.isTapped = 'true' || myCard.dataset.isTapped = true) 
			console.log("testTapPassed");
		else
			console.log("testTapFailed");
	}
	
	
	
	var socket = io.connect('http://igallacher.com/');

	socket.on('cardmove', function (data) {

	//var scope = angular.element($("#mainchat")).scope();
	console.log(data); 
	document.getElementById(data.cardID.toString()).style.left = data.xpos;
	document.getElementById(data.cardID.toString()).style.top = data.ypos;
	document.getElementById(data.cardID.toString()).style.top = data.ypos;
	
	document.getElementById(data.cardID.toString()).dataset.isTapped = data.isTapped;
	updateTapped();
	//scope.$apply(function(){
	//    scope.MyChat.push(data);
	//	})
	//var 
	});
	
	socket.on('updategamestate', function (data) {
		console.log('loadingnewgame');
		//var scope = angular.element($("#mainchat")).scope();
		for(var i = 0; i < data.length; i++)
		{
			var div = document.getElementById(i.toString());
			if(data[i] != null)
			{
			div.style.top = data[i].ypos;
			div.style.left = data[i].xpos;
			div.dataset.isTapped = data[i].isTapped;
			updateTapped(div);
			}
			
		}
	});

function updatescrollbar()
{
$("#chatlog").scrollTop($("#chatlog")[0].scrollHeight+10);
}

function updatechatlog(data)
{
    var scope = angular.element($("#mainchat")).scope();
    scope.$apply(function(){
        scope.MyChat.push(data);
    })
    setTimeout(updatescrollbar(), 2);
}
	
  socket.on('news', function (data) {
    updatechatlog(data);
  });
 socket.on('chatlog', function(chatlog) { var scope = angular.element($("#mainchat")).scope(); console.log(scope.MyChat);
                                              scope.$apply(function(){
scope.MyChat = chatlog.chatlog;
console.log(scope.MyChat);
});
                                         });
  function sendMessage() {
      socket.emit('message', { username: $('#username').val(), message: $('#textentry').val() } );
      MyChat.push(name);
      name = '';
  }
$('body').keyup(function(event){
console.log('asdfasdfasdfasdfa');
    if(event.keyCode == 13){
console.log('enterkey');
        $("#submitbutton").click();
    }
});
function switchRoom(room) 
{
   socket.emit('switchRoom',room);
}

function createCard(x, y)
{
	let newDivThingy = document.createElement("img");
	newDivThingy.id  = x.toString();  // I want each newly created div to have a      numeric value concatenated to it's ID. IE newDivThingy1 newDivThingy2 newDivThingy3
	newDivThingy.draggable = "true";
	newDivThingy.style.position = "absolute";
	newDivThingy.style.left = (x*120).toString() + "px";
	newDivThingy.style.width = "100px";
	newDivThingy.style.height = "140px";
	//newDivThingy.style.backgroundColor = "#f00";
	newDivThingy.src = "http://media.wizards.com/legacy/global/images/cardback.jpg";
	document.getElementById('hometab').appendChild(newDivThingy);

	document.getElementById(x.toString()).addEventListener('mousedown', mouseDown, false);
	var div = newDivThingy;
	document.getElementById(x.toString()).onclick = function() 
	{
	tapCard(document.getElementById(this.id.toString()));
	/*
	console.log(div.dataset.isTapped);
	var deg = (div.dataset.isTapped=='true') ? 0 : 90;
	console.log(deg);
	div.style.webkitTransform = 'rotate('+deg+'deg)';
	div.style.mozTransform    = 'rotate('+deg+'deg)';
	div.style.msTransform     = 'rotate('+deg+'deg)';
	div.style.oTransform      = 'rotate('+deg+'deg)';
	div.style.transform       = 'rotate('+deg+'deg)';
	console.log(div.dataset.isTapped);
	div.dataset.isTapped = (div.dataset.isTapped=='false');
	*/
	socket.emit('updateCard', { cardID: div.id, xpos: div.style.left, ypos: div.style.top, isTapped: div.dataset.isTapped } );
	}
}

socket.on('news', function (data) {
    var scope = angular.element($("#mainchat")).scope();
    console.log('news');
    console.log(data);
    scope.$apply(function(){
        scope.MyChat.push(data);
    })
  });

$( document ).ready(function() {
	
	window.onload = addListeners;

	var dragme;

	function addListeners(){
		var applicationArea = document.getElementById("applicationArea");
		for(var x = 0; x < 10; x++) 
		{
			createCard(x,y*120);
		}

		window.addEventListener('mouseup', mouseUp, false);
	}



	// UI CODE
	$('#maintabs a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})

	function mouseUp()
	{
		window.removeEventListener('mousemove', divMove, true);
		if(dragme != null) {
		socket.emit('updateCard', { cardID: dragme.id, xpos: dragme.style.left, ypos: dragme.style.top, isTapped: dragme.dataset.isTapped } );
		
			//socket.emit('testme', {} );
		}
	}

	function mouseDown(e){
	  dragme = document.getElementById(e.target.id);
	  window.addEventListener('mousemove', divMove, true);
	}

	function divMove(e){
	//  div = document.getElementById(e.target.id);
	//    var div = document.getElementById('draggable');
	  var div = dragme;
	  div.style.position = 'absolute';

	  div.style.top = e.clientY + 'px';
	  div.style.left = e.clientX + 'px';
	}

});

