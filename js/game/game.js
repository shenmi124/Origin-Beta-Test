function gameDiff(){
	

	player.game.time = player.game.time.add(n(1).mul(diff))
}

function gameLoader(){
    loader(['game','actionDirt'],[])
    loader(['game','time'],n(0))
}

function abilityCraft(){
	return player.research.m52
}