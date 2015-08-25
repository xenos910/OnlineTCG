"use strict"
function testTap()
{
	let myCard = createCard(0,0);
	tapCard(myCard)
	if(myCard.dataset.isTapped = 'true' || myCard.dataset.isTapped = true) 
		console.log("testTapPassed");
	else
		console.log("testTapFailed");
}


$( document ).ready(function() { // Make sure the DOM has loaded before we start adding things to it. 
	testTap();
}