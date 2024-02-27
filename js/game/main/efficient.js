let efficient = {
    action:{
        name(){return '效率'},
        tooltip(){return '效率是基础的行动速度<hr><grey></grey>'},
        unlocked(){return true},
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
            name(){return '幸福度'},
            effect(){return n(getEfficient('citizens')).sub(1).mul(100)},
            active(){return player.data.stage.gte(4)}
        },
    },
    citizens:{
        name(){return '幸福度'},
        tooltip(){return '<hr><grey></grey>'},
        unlocked(){return player.data.stage.gte(4)},
        citizens:{
            name(){return '人口'},
            effect(){return n(0).sub(player.resource.citizens)},
        },
    }
}

function getEfficient(id){
    let base = n(100)
	for(i in efficient[id]){
		if(i=="tooltip" || i=="name" || i=="unlocked"){
			continue
		}
        let act = true
        if(efficient[id][i]['active']!==undefined){
            act = efficient[id][i]['active']()
        }
		if(act){
			base = base.add(efficient[id][i]['effect']())
		}
	}
    return base.max(5).div(100)
}