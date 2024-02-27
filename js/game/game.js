function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(diff))
}

function gameLoader(){
    loader(['game','time'],n(0))
}