function getActionClick(id){
	if(getActionCanClick(id)){
		player['action'][id+'Click'] = true
	}
    if(main['action'][id]['handoff']!==undefined){
        main['action'][id]['handoff']()
    }
	componentAction(id)
}

function getActionUnlocked(id){
    let unlocked = true
    if(main['action'][id]['unlocked']!==undefined){
        unlocked = main['action'][id]['unlocked']()
    }
    return unlocked
}

function hasActionClick(id){
    return player['action'][id+'Click']
}

function getActionCanClick(id){
    let click = true
    if(main['action'][id]['canClick']!==undefined){
        click = main['action'][id]['canClick']()
    }
    return click && getActionUnlocked(id)
}

function getActionCoerciveClick(id){
    let coercive = false
    if(main['action'][id]['coerciveClick']!==undefined){
        coercive = main['action'][id]['coerciveClick']()
    }
    return coercive
}

function getActionCooldown(id){
    return n(main['action'][id]['cooldown']())
}

function getActionAuto(id){
    let auto = n(0)
    if(main['action'][id]['auto']!==undefined){
        auto = auto.add(main['action'][id]['auto']())
    }
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['effect']!==undefined){
            if(civics['citizens'][i]['effect']['action']!==undefined){
                for(let im in civics['citizens'][i]['effect']['action']){
                    if(id==im){
                        auto = auto.add(nc(civics['citizens'][i]['effect']['action'][im]()).mul(player.citizens[i]))
                    }
                }
            }
        }
    }
    return auto
}

function getCraftClick(id){
	if(getCraftCanClick(id)){
		player['craft'][id+'Click'] = true
	}
    if(main['craft'][id]['handoff']!==undefined){
        main['craft'][id]['handoff']()
    }
	componentCraft(id)
}

function getCraftUnlocked(id){
    let unlocked = true
    if(main['craft'][id]['unlocked']!==undefined){
        unlocked = main['craft'][id]['unlocked']()
    }
    return unlocked
}

function hasCraftClick(id){
    return player['craft'][id+'Click']
}

function getCraftCanClick(id){
    let click = true
    if(main['craft'][id]['canClick']!==undefined){
        click = main['craft'][id]['canClick']()
    }
    return click && getCraftUnlocked(id)
}

function getCraftCoerciveClick(id){
    let coercive = false
    if(main['craft'][id]['coerciveClick']!==undefined){
        coercive = main['craft'][id]['coerciveClick']()
    }
    return coercive
}

function getCraftCooldown(id){
    return n(main['craft'][id]['cooldown']())
}

function getCraftAuto(id){
    let auto = n(0)
    if(main['craft'][id]['auto']!==undefined){
        auto = auto.add(main['craft'][id]['auto']())
    }
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['effect']!==undefined){
            if(civics['citizens'][i]['effect']['craft']!==undefined){
                for(let im in civics['citizens'][i]['effect']['craft']){
                    if(id==im){
                        auto = auto.add(nc(civics['citizens'][i]['effect']['craft'][im]()).mul(player.citizens[i]))
                    }
                }
            }
        }
    }
    if(!getCraftCanClick(id)){
        auto = n(0)
    }
    return auto
}

function Build(id){
    let canbuy = true
    let logs = '缺少资源'
    for(i in main['building'][id]['cost']){
        let res = getBuildCost(id, i)
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
        for(i in main['building'][id]['cost']){
            let res = getBuildCost(id, i)
            player['resource'][i] = player['resource'][i].sub(res)
        }
        if(main['building'][id]['onBuy']!==undefined){
            main['building'][id]['onBuy']()
        }
        player['building'][id] = player['building'][id].add(1)
    }else{
        addLog(logs,'#888')
    }

    intervalID()
    componentBuilding(id)
}

function getBuildCost(building, res){
    return n(main['building'][building]['cost'][res]()).add(1).mul(player['building'][building].mul(0.1).add(1)).pow(player['building'][building].mul(main['building'][building]['costPower']()).add(1)).sub(1)
}

function getBuildGainBase(building,res){
    let mul = n(1) 
    for(let i in civics['workshop']){
        if(civics['workshop'][i]['effect']!==undefined){
            if(civics['workshop'][i]['effect']['building']!==undefined){
                for(let ib in civics['workshop'][i]['effect']['building']){
                    if(civics['workshop'][i]['effect']['building'][ib]['effect']!==undefined){
                        if(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']!==undefined){
                            if(ib==building && player['workshop'][i]){
                                mul = mul.mul(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return n(main['building'][building]['effect']['gain']['add'][res]()).mul(mul)
}

function getBuildGain(building, res){
    return n(getBuildGainBase(building, res)).mul(player['building'][building+'Allocation'] ?? player['building'][building])
}

function getBuildCappedBase(building,res){
    let mul = n(1)
    for(let i in civics['workshop']){
        if(civics['workshop'][i]['effect']!==undefined){
            if(civics['workshop'][i]['effect']['building']!==undefined){
                for(let ib in civics['workshop'][i]['effect']['building']){
                    if(civics['workshop'][i]['effect']['building'][ib]['effect']!==undefined){
                        if(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']!==undefined){
                            if(ib==i && player['workshop'][i]){
                                mul = mul.mul(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return n(main['building'][building]['effect']['capped']['add'][res]()).mul(mul)
}

function getBuildCapped(building,res){
    return n(main['building'][building]['effect']['capped']['add'][res]()).mul(player['building'][building+'Allocation'] ?? player['building'][building])
}

function buildingAllocation(amount,type,id){
    if(type=='add'){
        player['building'][id+'Allocation'] = player['building'][id+'Allocation'].add(amount).min(player['building'][id])
    }else{
        player['building'][id+'Allocation'] = player['building'][id+'Allocation'].sub(amount).max(0)
    }
    componentBuilding(id)
}