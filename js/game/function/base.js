function getNumberByID(id,id2){
	document.getElementById(id+"ID").innerHTML = format(id2);
}

function getByID(id,id2){
	document.getElementById(id).innerHTML = id2;
}

function addByID(id,id2){
	document.getElementById(id).innerHTML += id2;
}

function getTooltipDoc(id){
	document.getElementById('tooltip').innerHTML = id;
}

function Close(id){
	if(document.getElementById(id)!=null){
		document.getElementById(id).style.display = "none"
	}
}

function Open(id){
	if(document.getElementById(id)!=null){
    	document.getElementById(id).style.display = ""
	}
}

function addedCss(id,id2){
	document.getElementById(id).classList.add(id2)
}

function removeCss(id,id2){
	document.getElementById(id).classList.remove(id2)
}