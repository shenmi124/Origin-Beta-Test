function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))
}

function gameLoader(){
    loader(['game','time'],n(0))
}