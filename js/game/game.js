function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))

    if(player.resource.food.lte(0) && player.resource.citizens.gte(1)){
        let leave = n(Math.random() * 100000).round()
        if(leave.lte(10)){
            player.resource.citizens = player.resource.citizens.sub(1)
            CitizensFix()
            addLog('一位居民因为饥饿离开了你','#888')
        }
    }
}

function gameLoader(){
    loader(['game','time'],n(0))
}