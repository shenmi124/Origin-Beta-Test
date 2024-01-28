function getActionClick(id){
	if(main['action'][id]['cooldown']!==undefined){
		if(player['action'][id+'Cooldown'].lte(0)){
			$(main['action'][id]['onClick'])
			player['action'][id+'Cooldown'] = n(main['action'][id]['cooldown']())

			document.getElementById("action"+id+"BorderID").style.transitionDuration = '0s'
			let border = n(100).sub(player['action'][id+'Cooldown'].div(n(main['action'][id]['cooldown']()).max(0.01)).mul(100))
			document.getElementById("action"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
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
		if(player['craft'][id+'Cooldown'].lte(0)){
			$(main['craft'][id]['onClick'])
			player['craft'][id+'Times'] = player['craft'][id+'Times'].add(1)
			player['craft'][id+'Cooldown'] = n(main['craft'][id]['cooldown']())

			document.getElementById("craft"+id+"BorderID").style.transitionDuration = '0s'
			let border = n(100).sub(player['craft'][id+'Cooldown'].div(n(main['craft'][id]['cooldown']()).max(0.01)).mul(100))
			document.getElementById("craft"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}else{
		$(main['craft'][id]['onClick'])
		player['craft'][id+'Times'] = player['craft'][id+'Times'].add(1)
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