function getStage(num){
	if(num!==null){
		player.data.stage = player.data.stage.max(num)
	}
	if(player.data.stage>=1){
		document.getElementById("rightColumn").style.opacity = 1
	}
	if(player.data.stage>=2){
		document.getElementById("leftColumn").style.opacity = 1
		document.getElementById("leftColumn").style.visibility = ''
	}
	if(player.data.stage>=3){
		document.getElementById("tab_button").style.opacity = 1
		document.getElementById("leftColumn").style.visibility = ''
	}
}

function actionEfficient(){
    let base = n(100)
	for(i in efficient['action']){
		if(efficient['action'][i]['active']()){
			base = base.add(efficient['action'][i]['effect']())
		}
	}
    return base.max(5).div(100)
}