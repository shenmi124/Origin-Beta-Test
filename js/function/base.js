function getByID(id,id2){
	document.getElementById(id).innerHTML = id2;
}

function addByID(id,id2){
	document.getElementById(id).innerHTML = id2 + document.getElementById(id).innerHTML;
}

function getTooltipID(id){
	document.getElementById('tooltip').innerHTML = id;
}

function Close(id){
	if(document.getElementById(id)!==null){
		document.getElementById(id).style.display = 'none'
	}
}

function Open(id,id2=''){
	if(document.getElementById(id)!==null){
    	document.getElementById(id).style.display = id2
	}
}

function addedCss(id,id2){
	document.getElementById(id).classList.add(id2)
}

function removeCss(id,id2){
	document.getElementById(id).classList.remove(id2)
}

function unlockedLoad(id,unlocked){
	if(unlocked){
		document.getElementById(id).style.display = ''
        setTimeout(function(){
            document.getElementById(id).style.opacity = 1
        },100)
	}else{
		document.getElementById(id).style.display = 'none'
		document.getElementById(id).style.opacity = 0
	}
}

function showTab(tab){
	for(let i in TABBUTTON){
		Close(i+'Tab')
		Close(i+'SubtabButton')
		document.getElementById(i+"TabButton").style.color = ''
		document.getElementById(i+"TabButton").style.opacity = ''
		document.getElementById(i+"TabButton").style.cursor = 'pointer'
	}
	Open(tab+'Tab')
	Open(tab+'SubtabButton')
	document.getElementById(tab+"TabButton").style.color = '#007bff'
	document.getElementById(tab+"TabButton").style.opacity = '0.8'
	document.getElementById(tab+"TabButton").style.cursor = 'default'
}

function showSubTab(subtab){
	for(let i in TABBUTTON){
		if(subtab in TABBUTTON[i]['subtab']){
			for(let it in TABBUTTON[i]['subtab']){
				Close(it+'Subtab')
				document.getElementById(it+"SubtabID").style.color = ''
				document.getElementById(it+"SubtabID").style.opacity = ''
				document.getElementById(it+"SubtabID").style.cursor = 'pointer'
			}
		}
	}
	Open(subtab+'Subtab')
	document.getElementById(subtab+"SubtabID").style.color = '#007bffaa'
	document.getElementById(subtab+"SubtabID").style.opacity = '0.8'
	document.getElementById(subtab+"SubtabID").style.cursor = 'default'
}