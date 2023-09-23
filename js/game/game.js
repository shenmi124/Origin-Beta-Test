function gameDiff(){
	if(player.data.startGame==false){
		player.data.startGame = true
		addLog('你在一片草原醒来...<br><li-log>四周什么都没有...<br><li-log>除了脚下的烂泥和碧绿的草...','#000')
	}

	player.resource.devSpeed = n(player.data.devSpeed)
}

function gameLoader(){
    loader(['game','actionDirt'],[])
}