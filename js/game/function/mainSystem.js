function getActionClick(id){
	if(main['action'][id]['cooldown']!==undefined){
		let auto = n(0)
		if(main['action'][id]['auto']!==undefined){auto = main['action'][id]['auto']()}
		if(player.action[id+'Cooldown'].gte(main['action'][id]['cooldown']) && auto.lte(0)){
			$(main['action'][id]['onClick'])
			player['action'][id+'Cooldown'] = n(0)
			player['action'][id+'ClickTimes'] = player['action'][id+'ClickTimes'].add(1)

			document.getElementById("action"+id+"BorderID").style.transitionDuration = '0s'
			let border = player.action[id+'Cooldown'].div(n(main['action'][id]['cooldown']()).max(0.001)).min(1).mul(100)
			document.getElementById("action"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}else{
			player['action'][id+'Click'] = true
			addedCss("action"+id+"ButtonID",'complete')
			document.getElementById("action"+id+"ButtonID").disabled = true
		}
	}else{
		$(main['action'][id]['onClick'])
	}
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceBaseMax(i))
			getResourceID(i)
		}
	}
	componentAction(id)
}

function getCraftClick(id){
	if(main['craft'][id]['cooldown']!==undefined){
		let auto = n(0)
		if(main['craft'][id]['auto']!==undefined){auto = main['craft'][id]['auto']()}
		if(player.craft[id+'Cooldown'].gte(main['craft'][id]['cooldown']) && auto.lte(0)){
			$(main['craft'][id]['onClick'])
			player['craft'][id+'Cooldown'] = n(0)
			player['craft'][id+'ClickTimes'] = player['craft'][id+'ClickTimes'].add(1)

			document.getElementById("craft"+id+"BorderID").style.transitionDuration = '0s'
			let border = player.craft[id+'Cooldown'].div(n(main['craft'][id]['cooldown']()).max(0.001)).min(1).mul(100)
			document.getElementById("craft"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}else{
			player['craft'][id+'Click'] = true
			addedCss("craft"+id+"ButtonID",'complete')
			document.getElementById("craft"+id+"ButtonID").disabled = true
		}
	}else{
		$(main['craft'][id]['onClick'])
	}
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceBaseMax(i))
			getResourceID(i)
		}
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