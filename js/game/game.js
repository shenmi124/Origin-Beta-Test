function gameDiff(){
	player.game.time = player.game.time.add(n(1).mul(DIFF))
    getGametime()

    if(player.resource.food.lte(0) && player.resource.citizens.gte(1)){
        let leave = n(Math.random() * 10000).round()
        if(leave.lte(n(1).mul(player.resource.citizens))){
            player.resource.citizens = player.resource.citizens.sub(1)
            CitizensFix()
            GameCraftFix()
            addLog('一位居民因为饥饿离开了你','#888')
        }
    }
}

function gameGetPower(){
    let power = n(0)
    if(player.workshop.knife){power = power.add(3)}
    if(player.workshop.armor){power = power.add(2)}
    if(player.workshop.lance){power = power.add(2)}
    return power
}

function gameOpenMaking(id){
    for(let i in MAIN['action']){
        if(MAIN['action'][i]['data']?.['make']!==undefined){
            if(i==id){
                player['action'][i]['make'] = !player['action'][i]['make']
            }else{
                player['action'][i]['make'] = false
            }
        }
    }
}

function gameGetBuildingHappiness(){
    let happy = n(0)
    for(let i in MAIN['building']){
        if(MAIN['building'][i]['effect']?.['other']?.['happiness']!==undefined){
            happy = happy.add(n(MAIN['building'][i]['effect']['other']['happiness']['effect']()).mul(player['building'][i+'Allocation'] ?? player['building'][i]))
        }
    }
    return happy
}

function gameGetJobHappiness(){
    let happy = n(0)
    for(let i in CIVICS['citizens']){
            if(CIVICS['citizens'][i]['effect']?.['other']?.['happiness']!==undefined){
                happy = happy.add(n(CIVICS['citizens'][i]['effect']['other']['happiness']['effect']()).mul(player['citizens'][i]))
            }
        }
    return happy
}

function gameGetForging(){
    let forging = n(0)
    for(let i in MAIN['building']){
        if(MAIN['building'][i]['effect']?.['other']?.['forging']!==undefined){
            forging = forging.add(n(MAIN['building'][i]['effect']['other']['forging']['effect']()).mul(player['building'][i+'Allocation'] ?? player['building'][i]))
        }
    }
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['other']?.['forging']!==undefined){
            if(player['workshop'][i]){
                forging = forging.add(CIVICS['workshop'][i]['effect']['other']['forging']['effect']())
            }
        }
    }
    return n(forging).div(100).add(1)
}

function gameGetWorkshopAction(){
    let action = n(0)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['other']?.['action']!==undefined){
            if(player['workshop'][i]){
                action = action.add(CIVICS['workshop'][i]['effect']['other']['action']['effect']())
            }
        }
    }
    return action
}

function gameGetWorkshopHappiness(){
    let happy = n(0)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['other']?.['happiness']!==undefined){
            if(player['workshop'][i]){
                happy = happy.add(CIVICS['workshop'][i]['effect']['other']['happiness']['effect']())
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
		addLog('这是一个新的存档,要<u style="cursor: pointer; color: #000" onclick="importSave()">导入</u>吗?','#888')
		addLog('点击<u style="cursor: pointer; color: #000" onclick="player.setting.darkTheme = !player.setting.darkTheme; loadSetting()">此处</u>切换深色模式','#888')
		addLog('此版本为测试版,请自行备份存档','#888')
	}
}

function GameCraftFix(){
    for(let i in MAIN['action']['explore']['gain']){
        if(!MAIN['action']['explore']['gain'][i]['instant']()){
            player['action']['explore'][i] = player['action']['explore'][i].min(MAIN['craft'][i]['capped']())
        }
    }
}