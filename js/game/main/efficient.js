let efficient = {
    action: {
        name(){return '效率'},
        tooltip(){return '效率是基础的行动速度<hr><grey>效率影响行动与采集的基础速度</grey>'},
        unlocked(){return true},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-20)},
            active(){return player.resource.food.lte(0) && player.game.stage.lte(3)}
        },
        home: {
            name(){return '缺少定居地'},
            effect(){return n(-20)},
            active(){return player.building.civics.eq(0)}
        },
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(gameGetWorkshopAction())}
        },
        citizens: {
            name(){return '幸福度'},
            effect(){return n(getEfficient('happiness')).sub(1).mul(100)},
            active(){return player.game.stage.gte(4)}
        },
    },
    happiness: {
        name(){return '幸福度'},
        tooltip(){return '居民的幸福度决定了他们的行动能力<hr><grey>幸福度会影响村民的基础效率<br>幸福度大于100%时居民会食用更多的食物<br>幸福度与效率都会影响村民的行动速度</grey>'},
        unlocked(){return player.game.stage.gte(4)},
        food: {
            name(){return '缺少食物'},
            effect(){return n(-20)},
            active(){return player.resource.food.lte(0) && player.game.stage.gte(4)}
        },
        citizens: {
            name(){return '人口过剩'},
            effect(){return n(0).sub(player.resource.citizens)},
        },
        resource: {
            name(){return '资源影响'},
            effect(){return player.resource.stardust.mul(2).add(player.resource.bloodStone.mul(2))},
        },
        building: {
            name(){return '建筑影响'},
            effect(){return n(gameGetBuildingHappiness())}
        },
        jobs: {
            name(){return '职业影响'},
            effect(){return n(gameGetJobHappiness())}
        },
        workshop: {
            name(){return '工坊影响'},
            effect(){return n(gameGetWorkshopHappiness())}
        }
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
    return base.max(1).div(100)
}