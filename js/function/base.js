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
	for(let i in mainButton){
		Close('tab_'+i)
		document.getElementById(i+"MainTabID").style.color = ''
		document.getElementById(i+"MainTabID").style.opacity = ''
		document.getElementById(i+"MainTabID").style.cursor = 'pointer'
	}
	Open('tab_'+tab)
	document.getElementById(tab+"MainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById(tab+"MainTabID").style.opacity = '0.8'
	document.getElementById(tab+"MainTabID").style.cursor = 'default'
}

function showSubTab(tab, subTab){
	for(let i in mainButton[tab]['subTab']){
		Close('subtab_'+tab+'_'+i)
		document.getElementById(tab+'_'+i+"SubMainTabID").style.color = ''
		document.getElementById(tab+'_'+i+"SubMainTabID").style.opacity = ''
		document.getElementById(tab+'_'+i+"SubMainTabID").style.cursor = 'pointer'
	}
	Open('subtab_'+tab+'_'+subTab)
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.color = 'rgb(0 145 255)'
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.opacity = '0.8'
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.cursor = 'default'
}