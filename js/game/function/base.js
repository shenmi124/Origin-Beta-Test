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

function unlockedLoad(id,unlocked,type=''){
	if(unlocked){
		document.getElementById(id).style.display = type
	}else{
		document.getElementById(id).style.display = 'none'
	}
}

function showTab(id){
	for(let i in mainButton){
		Close('tab_'+i)
		document.getElementById(i+"MainTabID").style.color = '#000'
		document.getElementById(i+"MainTabID").style.opacity = ''
	}
	Open('tab_'+id)
	document.getElementById(id+"MainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById(id+"MainTabID").style.opacity = '0.8'
}