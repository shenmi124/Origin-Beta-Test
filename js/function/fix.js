function NumberFix(){
	for(let i in resource['main']){
		if(resource['main'][i]['capped']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceCappedBase(i))
			getResourceID(i)
		}
	}
}

function CitizensFix(){
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['unlocked']!==undefined){
            if(!civics['citizens'][i]['unlocked']() && player['citizens'][i].neq(0)){
                citizensAllocate(i, player['citizens'][i].neg())
            }
        }
    }
	for(let i in civics['jobs']){
        let num = n(civics['jobs'][i]['amount']())
        for(let ic in civics['citizens']){
            if(civics['citizens'][ic]['allocated']?.[i]!==undefined){
                num = num.sub(n(player['citizens'][ic]).mul(civics['citizens'][ic]['allocated'][i]()))                        
            }
        }
        if(num.lt(0)){
            for(let ic in civics['citizens']){
                if(civics['citizens'][ic]['allocated']?.[i]!==undefined){
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

	for(let i in civics['citizens']){
		componentCitizens(i)
	}

	for(let i in civics['jobs']){
		componentJobs(i)
	}

	getByID('CitizensTip',CitizensTip())
}