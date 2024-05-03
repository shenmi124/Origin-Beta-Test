function allocateCitizens(type,allocate){
    let canAllocate = true
    for(let i in civics['citizens'][type]['allocated']){
        if(n(getUnemployedJobs(i)).sub(n(civics['citizens'][type]['allocated'][i]()).mul(allocate)).lt(0)){
            canAllocate = false
        }
    }
    if(canAllocate){
        player['citizens'][type] = player['citizens'][type].add(allocate).max(0)
        if(civics['citizens'][type]['action']!==undefined){
            $(civics['citizens'][type]['action'])
        }
    }else{
        addLog('*无人任职','#888')
    }
    CitizensFix()
}

function getUnemployedJobs(job){
    let num = n(civics['jobs'][job]['number']())
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['allocated']!==undefined){
            if(civics['citizens'][i]['allocated'][job]!==undefined){
                num = num.sub(n(player['citizens'][i]).mul(civics['citizens'][i]['allocated'][job]()))
            }
        }
    }
    return num
}

function CitizensFix(){
	for(let i in civics['jobs']){
        let num = n(civics['jobs'][i]['number']())
        for(let ic in civics['citizens']){
            if(civics['citizens'][ic]['allocated']!==undefined){
                if(civics['citizens'][ic]['allocated'][i]!==undefined){
                    num = num.sub(n(player['citizens'][ic]).mul(civics['citizens'][ic]['allocated'][i]()))                        
                }
            }
        }
        if(num.lt(0)){
            for(let ic in civics['citizens']){
                if(civics['citizens'][ic]['allocated']!==undefined){
                    if(civics['citizens'][ic]['allocated'][i]!==undefined){
                        let remain = n(num).abs()
                        let over = n(remain).div(civics['citizens'][ic]['allocated'][i]()).ceil()
                        if(player['citizens'][ic].gte(over)){
                            player['citizens'][ic] = player['citizens'][ic].sub(over)
                            break
                        }else{
                            let weight = player['citizens'][ic]
                            player['citizens'][ic] = player['citizens'][ic].sub(weight)
                            num = num.add(weight)
                        }
                    }
                }
            }
        }
	}

	for(let i in civics['citizens']){
		componentCitizens(i)
	}

	for(let i in civics['jobs']){
		componentCitizenJobs(i)
	}

	getByID('CitizensTip',CitizensTip())
}