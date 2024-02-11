let efficient = {
    action:{
        tooltip(){return '决定了探索以及行动的速度'},
        food:{
            name(){return '缺少食物'},
            effect(){return n(-25)},
            active(){return player.resource.food.lte(0)}
        },
        home:{
            name(){return '缺少定居地'},
            effect(){return n(-25)},
            active(){return player.building.civics.eq(0)}
        },
        citizens:{
            name(){return '安定度'},
            effect(){return n(0).sub(player.resource.citizens.mul(3))},
            active(){return player.resource.citizens.gte(1)}
        },
    }
}

function getEfficient(id){
    let base = n(100)
	for(i in efficient[id]){
		if(i=="tooltip"){
			continue
		}
		if(efficient[id][i]['active']()){
			base = base.add(efficient[id][i]['effect']())
		}
	}
    return base.max(5).div(100)
}