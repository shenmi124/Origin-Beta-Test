function getStage(num){
	if(num!==null){
		player.data.stage = player.data.stage.max(num)
	}
	if(player.data.stage.gte(1)){
		document.getElementById("rightColumn").style.opacity = 1
	}
	if(player.data.stage.gte(2)){
		document.getElementById("leftColumn").style.visibility = ''
        setTimeout(function(){
			document.getElementById("leftColumn").style.opacity = 1
        },100)
	}
	if(player.data.stage.gte(3)){
		document.getElementById("tab_button").style.visibility = ''
        setTimeout(function(){
			document.getElementById("tab_button").style.opacity = 1
        },100)

		document.getElementById("bottomTab").style.visibility = ''
        setTimeout(function(){
			document.getElementById("bottomTab").style.opacity = 1
        },100)
	}
}