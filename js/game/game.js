function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(diff))

	if(player.resource.food.lte(0) && player.resource.citizens.gte(1)){
		let leave = Math.random() * 100
		if(leave<=0.1){
			player.resource.citizens = player.resource.citizens.sub(1)
			addLog('一位村民离开了你','#888')
		}
	}
}

function gameLoader(){
    loader(['game','time'],n(0))
}