function allocateCitizens(type,allocate){
    let canAllocate = true
    for(let i in civics['citizens'][type]['allocated']){
        if(n(getUnemployedJobs(i)).sub(n(civics['citizens'][type]['allocated'][i]()).mul(allocate)).lt(0)){
            canAllocate = false
        }
    }
    if(canAllocate){
        player['citizens'][type] = player['citizens'][type].add(allocate).max(0)
        if(civics['citizens'][type]['active']!==undefined){
            $(civics['citizens'][type]['active'])
        }
    }else{
        addLog('*无人任职','#888')
    }
    CitizensFix()
}

function getUnemployedJobs(job){
    let num = n(civics['jobs'][job]['amount']())
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['allocated']!==undefined){
            if(civics['citizens'][i]['allocated'][job]!==undefined){
                num = num.sub(n(player['citizens'][i]).mul(civics['citizens'][i]['allocated'][job]()))
            }
        }
    }
    return num
}

function switchWorkshopBought(){
    WORKSHOPBOUGHT = !WORKSHOPBOUGHT
	for(let i in civics['workshop']){
		let unlocked = true
		let bought = !player['workshop'][i]
		if(civics['workshop'][i]['unlocked']!==undefined){
			unlocked = civics['workshop'][i]['unlocked']()
		}
		if(WORKSHOPBOUGHT){
			bought = !bought
		}
		unlockedLoad(i+'LoadWorkshop', unlocked && bought)
	}
}

function Upgrade(id){
    if(!WORKSHOPBOUGHT){
        let canbuy = true
        let logs = '缺少资源'
        for(i in civics['workshop'][id]['cost']){
            let res = n(civics['workshop'][id]['cost'][i]())
            if(n(player['resource'][i]).lt(res)){
                let name = colorText(i)[1]
                canbuy = false
                if(resource['main'][i]['unlocked']!==undefined){
                    if(!resource['main'][i]['unlocked']()){
                        name = '<gery>???</gery>'
                    }
                }
                logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+name
            }
        }
        if(canbuy){
            for(i in civics['workshop'][id]['cost']){
                let res = n(civics['workshop'][id]['cost'][i]())
                player['resource'][i] = player['resource'][i].sub(res)
            }
            if(civics['workshop'][id]['onBuy']!==undefined){
                civics['workshop'][id]['onBuy']()
            }
            player['workshop'][id] = true
        }else{
            addLog(logs, '#888')
        }
    }else{
        addLog('已购买', '#888')
    }
    intervalID()
    componentWorkshop(id)
}