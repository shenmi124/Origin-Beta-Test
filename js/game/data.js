function gameStage(num){
	if(num!==null){
		player.data.stage = n(num)
	}
	if(player.data.stage>=1){
		document.getElementById("rightColumn").style.opacity = 1
	}
	if(player.data.stage>=2){
		document.getElementById("leftColumn").style.opacity = 1
		document.getElementById("leftColumn").style.visibility = ''
	}
}

function actionEfficient(){
    let base = n(100)
    if(player.resource.food.lte(0)){
        base = base.sub(50)
    }
    return base.max(5).div(100)
}