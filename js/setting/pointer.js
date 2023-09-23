document.oncontextmenu = function(event){
	event.preventDefault()
}

function mouseMove(ev) {
	var mousePos = mouseCoords(ev); 
	document.getElementById("tooltip").style.top = Math.min(mousePos.y+20,window.innerHeight-$("#tooltip").height()-17)
	document.getElementById("tooltip").style.left = Math.min(mousePos.x+20,window.innerWidth-$("#tooltip").width()-12)
} 
function mouseCoords(ev) { 
	if(ev.pageX || ev.pageY){ 
		return{x:ev.pageX, y:ev.pageY}; 
	}else{
		return{ 
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
			y:ev.clientY + document.body.scrollTop - document.body.clientTop 
		};
	}
}
document.onmousemove = mouseMove;