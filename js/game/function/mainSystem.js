function getActionClick(id){
	if(getActionCanClick(id)){
		player['action'][id+'Click'] = true
	}
	componentAction(id)
}

function getCraftClick(id){
	if(getCraftCanClick(id)){
		player['craft'][id+'Click'] = true
	}
	componentCraft(id)
}

function Build(id){
    let canbuy = true
    let logs = '*缺少资源:'
    for(i in main['building'][id]['cost']){
        let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
        if(n(player['resource'][i]).lt(res)){
            canbuy = false
            logs += '<br><li-hid>*'+format(n(res).sub(player['resource'][i]))+colorText(i)[1]
        }
    }
    if(canbuy){
        for(i in main['building'][id]['cost']){
            let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
            player['resource'][i] = player['resource'][i].sub(res)
        }
        player['building'][id] = player['building'][id].add(1)
    }else{
        addLog(logs,'#888')
    }

    if(main['building'][id]['onBuy']!==undefined){
        $(main['building'][id]['onBuy'])
    }
    getID()
    componentBuilding(id)
}