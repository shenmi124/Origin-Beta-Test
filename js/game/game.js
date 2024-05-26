function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))
    getGametime()

    if(player.resource.food.lte(0) && player.resource.citizens.gte(1)){
        let leave = n(Math.random() * 100000).round()
        if(leave.lte(10)){
            player.resource.citizens = player.resource.citizens.sub(1)
            CitizensFix()
            GameCraftFix()
            addLog('一位居民因为饥饿离开了你','#888')
        }
    }
}

function gameGetJobHappiness(){
    let happy = n(0)
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['effect']!==undefined){
            if(civics['citizens'][i]['effect']['other']!==undefined){
                if(civics['citizens'][i]['effect']['other']['happiness']!==undefined){
                    happy = happy.add(n(civics['citizens'][i]['effect']['other']['happiness']['effect']()).mul(player['citizens'][i]))
                }
            }
        }
    }
    return happy
}

function gameGetWorkshopHappiness(){
    let happy = n(0)
    for(let i in civics['workshop']){
        if(civics['workshop'][i]['effect']!==undefined){
            if(civics['workshop'][i]['effect']['other']!==undefined){
                if(civics['workshop'][i]['effect']['other']['happiness']!==undefined){
                    if(player['workshop'][i]){
                        happy = happy.add(civics['workshop'][i]['effect']['other']['happiness']['effect']())
                    }
                }
            }
        }
    }
    return happy
}

function calcGame(){
    loader(['game','stage'],n(0))
    loader(['game','time'],n(0))

    loader(['events','time'],n(0))

    loader(['research','conducted'],undefined)
}

function gameLoader(){
	getStage(null)
	if(player.game.stage.lte(2)){
		addLog('这是一个新的存档,要<u style="color: #000" onclick="importSave()">导入</u>吗?','#888')
		addLog('此版本为测试版,数值并未平衡,同时有可能出现存档损坏的问题','#888')
		addLog('无论你从哪里发现了这个游戏,请勿大范围外传','#888')
	}
}

function GameCraftFix(){
    for(let i in main['action']['explore']['gain']){
        if(!main['action']['explore']['gain'][i]['instant']()){
            player['action']['explore'][i] = player['action']['explore'][i].min(main['craft'][i]['capped']())
        }
    }
}