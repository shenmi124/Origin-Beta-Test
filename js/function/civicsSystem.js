function citizensAllocate(type,allocate){
    let canAllocate = true
    for(let i in CIVICS['citizens'][type]['allocated']){
        if(n(getUnemployedJobs(i)).sub(n(CIVICS['citizens'][type]['allocated'][i]()).mul(allocate)).lt(0)){
            canAllocate = false
        }
    }
    if(canAllocate){
        player['citizens'][type] = player['citizens'][type].add(allocate).max(0)
        if(CIVICS['citizens'][type]['active']!==undefined){
            CIVICS['citizens'][type]['active']()
        }
    }else{
        addLog('*无人任职','#888')
    }
    CitizensFix()
}

function getUnemployedJobs(job){
    let num = n(CIVICS['jobs'][job]['amount']())
    for(let i in CIVICS['citizens']){
        if(CIVICS['citizens'][i]['allocated']!==undefined){
            if(CIVICS['citizens'][i]['allocated'][job]!==undefined){
                num = num.sub(n(player['citizens'][i]).mul(CIVICS['citizens'][i]['allocated'][job]()))
            }
        }
    }
    return num
}

function switchWorkshopBought(){
    WORKSHOPBOUGHT = !WORKSHOPBOUGHT
	for(let i in CIVICS['workshop']){
		let unlocked = true
		let bought = !player['workshop'][i]
		if(CIVICS['workshop'][i]['unlocked']!==undefined){
			unlocked = CIVICS['workshop'][i]['unlocked']()
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
        for(i in CIVICS['workshop'][id]['cost']){
            let res = n(CIVICS['workshop'][id]['cost'][i]())
            if(n(player['resource'][i]).lt(res)){
                let name = colorText(i)[1]
                canbuy = false
                if(RESOURCE['main'][i]['unlocked']!==undefined){
                    if(!RESOURCE['main'][i]['unlocked']()){
                        name = '<gery>???</gery>'
                    }
                }
                logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+name
            }
        }
        if(canbuy){
            for(i in CIVICS['workshop'][id]['cost']){
                let res = n(CIVICS['workshop'][id]['cost'][i]())
                player['resource'][i] = player['resource'][i].sub(res)
            }
            player['workshop'][id] = true
            if(CIVICS['workshop'][id]['onBuy']!==undefined){
                CIVICS['workshop'][id]['onBuy']()
            }
        }else{
            addLog(logs, '#888')
        }
    }else{
        addLog('已购买', '#888')
    }
    intervalID()
    componentWorkshop(id)
}

function getCitizensGainBase(id,res){
    let mul = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['citizens']!==undefined){
            for(let ib in CIVICS['workshop'][i]['effect']['citizens']){
                if(CIVICS['workshop'][i]['effect']['citizens'][ib]['gain']?.['add']!==undefined){
                    for(let ibga in CIVICS['workshop'][i]['effect']['citizens'][ib]['gain']['add']){
                        if(CIVICS['workshop'][i]['effect']['citizens'][ib]['gain']['add'][ibga]['mul']!==undefined){
                            if(ib==id && res==ibga && player['workshop'][i]){
                                mul = mul.mul(CIVICS['workshop'][i]['effect']['citizens'][ib]['gain']['add'][ibga]['mul']())
                            }
                        }
                    }
                }
                if(CIVICS['workshop'][i]['effect']['citizens'][ib]['effect']?.['mul']!==undefined){
                    if(ib==id && player['workshop'][i]){
                        mul = mul.mul(CIVICS['workshop'][i]['effect']['citizens'][ib]['effect']['mul']())
                    }
                }
            }
        }
    }
    for(let i in MAIN['building']){
        if(MAIN['building'][i]['effect']?.['citizens']!==undefined){
            for(let ie in MAIN['building'][i]['effect']['citizens']){
                if(MAIN['building'][i]['effect']['citizens'][ie]['effect']?.['addmul']!==undefined){
                    if(ie==id){
                        mul = mul.mul(n(MAIN['building'][i]['effect']['citizens'][ie]['effect']['addmul']()).mul(player['building'][i+'Allocation'] ?? player['building'][i]).add(1))
                    }
                }
            }
        }
    }
    return n(CIVICS['citizens'][id]['effect']['gain']['add'][res]()).mul(mul)
}

function getCitizensGain(id,res){
    if(CIVICS['citizens'][id]['effect']?.['gain']?.['add']!==undefined){
        for(let i in CIVICS['citizens'][id]['effect']['gain']['add']){
            let cost = n(getCitizensGainBase(id, i)).mul(player['citizens'][id] ?? player['citizens'][id])
            if(n(cost).lt(0)){
                if(player['resource'][i].lte(n(cost).abs())){
                    if(player['citizens'][id]!==undefined){
                        citizensAllocate(id, n(1).neg())
                    }
                    return n(0)
                }
            }
        }
    }
    return nc(getCitizensGainBase(id, res)).mul(player['citizens'][id])
}

function getCitizensActionBase(id,action){
    let base = n(0)
    let mul = n(1)
    if(CIVICS['citizens'][id]['effect']?.['action']!==undefined){
        for(let ia in CIVICS['citizens'][id]['effect']['action']){
            if(ia==action){
                base = base.add(CIVICS['citizens'][id]['effect']['action'][ia]())
            }
        }
    }
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['citizens']!==undefined){
            for(let ie in CIVICS['workshop'][i]['effect']['citizens']){
                if(CIVICS['workshop'][i]['effect']['citizens'][ie]['effect']?.['mul']!==undefined){
                    if(ie==id && player['workshop'][i]){
                        mul = mul.mul(CIVICS['workshop'][i]['effect']['citizens'][ie]['effect']['mul']())
                    }
                }
            }
        }
    }
    return base.mul(mul)
}

function getCitizensAction(id,action){
    return nc(getCitizensActionBase(id, action)).mul(player['citizens'][id])
}

function getCitizensCraftBase(id,craft){
    let base = n(0)
    let mul = n(1)
    if(CIVICS['citizens'][id]['effect']?.['craft']!==undefined){
        for(let ia in CIVICS['citizens'][id]['effect']['craft']){
            if(ia==craft){
                base = base.add(CIVICS['citizens'][id]['effect']['craft'][ia]())
            }
        }
    }
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['citizens']!==undefined){
            for(let ie in CIVICS['workshop'][i]['effect']['citizens']){
                if(CIVICS['workshop'][i]['effect']['citizens'][ie]['effect']?.['mul']!==undefined){
                    if(ie==id && player['workshop'][i]){
                        mul = mul.mul(CIVICS['workshop'][i]['effect']['citizens'][ie]['effect']['mul']())
                    }
                }
            }
        }
    }
    return base.mul(mul)
}

function getCitizensCraft(id,craft){
    return nc(getCitizensCraftBase(id, craft)).mul(player['citizens'][id])
}