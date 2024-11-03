function getActionClick(id){
	if(getActionCanClick(id)){
		player['action'][id+'Click'] = true
	}
    if(MAIN['action'][id]['handoff']!==undefined){
        MAIN['action'][id]['handoff']()
    }
	componentAction(id)
}

function getActionUnlocked(id){
    let unlocked = true
    if(MAIN['action'][id]['unlocked']!==undefined){
        unlocked = MAIN['action'][id]['unlocked']()
    }
    return unlocked
}

function hasActionClick(id){
    return player['action'][id+'Click']
}

function getActionCanClick(id){
    let click = true
    if(MAIN['action'][id]['canClick']!==undefined){
        click = MAIN['action'][id]['canClick']()
    }
    return click && getActionUnlocked(id)
}

function getActionCoerciveClick(id){
    let coercive = false
    if(MAIN['action'][id]['coerciveClick']!==undefined){
        coercive = MAIN['action'][id]['coerciveClick']()
    }
    return coercive
}

function getActionCooldown(id){
    let div = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['action']!==undefined){
            for(let ia in CIVICS['workshop'][i]['effect']['action']){
                if(CIVICS['workshop'][i]['effect']['action'][ia]['speed']?.['mul']!==undefined){
                    if(id==ia && player['workshop'][i]){
                        div = div.mul(CIVICS['workshop'][i]['effect']['action'][ia]['speed']?.['mul']())
                    }
                }
            }
        }
    }
    return n(MAIN['action'][id]['cooldown']()).div(div)
}

function getActionAuto(id){
    let auto = n(0)
    if(MAIN['action'][id]['auto']!==undefined){
        auto = auto.add(MAIN['action'][id]['auto']())
    }
    for(let i in CIVICS['citizens']){
        if(CIVICS['citizens'][i]['effect']!==undefined){
            if(CIVICS['citizens'][i]['effect']['action']!==undefined){
                for(let im in CIVICS['citizens'][i]['effect']['action']){
                    if(id==im){
                        auto = auto.add(getCitizensAction(i, im))
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
    if(MAIN['craft'][id]['handoff']!==undefined){
        MAIN['craft'][id]['handoff']()
    }
	componentCraft(id)
}

function getCraftUnlocked(id){
    let unlocked = true
    if(MAIN['craft'][id]['unlocked']!==undefined){
        unlocked = MAIN['craft'][id]['unlocked']()
    }
    return unlocked
}

function hasCraftClick(id){
    return player['craft'][id+'Click']
}

function getCraftCanClick(id){
    let click = true
    if(MAIN['craft'][id]['canClick']!==undefined){
        click = MAIN['craft'][id]['canClick']()
    }
    return click && getCraftUnlocked(id)
}

function getCraftCoerciveClick(id){
    let coercive = false
    if(MAIN['craft'][id]['coerciveClick']!==undefined){
        coercive = MAIN['craft'][id]['coerciveClick']()
    }
    return coercive
}

function getCraftCooldown(id){
    let div = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['craft']!==undefined){
            for(let ia in CIVICS['workshop'][i]['effect']['craft']){
                if(CIVICS['workshop'][i]['effect']['craft'][ia]['speed']?.['mul']!==undefined){
                    if(id==ia && player['workshop'][i]){
                        div = div.mul(CIVICS['workshop'][i]['effect']['craft'][ia]['speed']?.['mul']())
                    }
                }
            }
        }
    }
    return n(MAIN['craft'][id]['cooldown']()).div(div)
}

function getCraftAuto(id){
    let auto = n(0)
    if(MAIN['craft'][id]['auto']!==undefined){
        auto = auto.add(MAIN['craft'][id]['auto']())
    }
    for(let i in CIVICS['citizens']){
        if(CIVICS['citizens'][i]['effect']!==undefined){
            if(CIVICS['citizens'][i]['effect']['craft']!==undefined){
                for(let im in CIVICS['citizens'][i]['effect']['craft']){
                    if(id==im){
                        auto = auto.add(getCitizensCraft(i, im))
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
    for(let i in MAIN['building'][id]['cost']){
        let res = getBuildCost(id, i)
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
        for(let i in MAIN['building'][id]['cost']){
            let res = getBuildCost(id, i)
            player['resource'][i] = player['resource'][i].sub(res)
        }
        player['building'][id] = player['building'][id].add(1)
        if(player['building'][id+'Allocation']){
            player['building'][id+'Allocation'] = player['building'][id+'Allocation'].add(1)
        }
        if(MAIN['building'][id]['onBuy']!==undefined){
            MAIN['building'][id]['onBuy']()
        }
    }else{
        addLog(logs,'#888')
    }

    intervalID()
    componentBuilding(id)
}

function getBuildCost(building, res){
    let base = n(MAIN['building'][building]['cost'][res]()).add(1).mul(player['building'][building].mul(0.1).add(1)).pow(player['building'][building].mul(MAIN['building'][building]['costPower']()).add(1)).sub(1)
    let div = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['markdown']?.['building']!==undefined){
            for(let iw in CIVICS['workshop'][i]['effect']['markdown']['building']){
                if(CIVICS['workshop'][i]['effect']['markdown']['building'][iw]['effect']?.['mul']!==undefined){
                    if(building==iw && player['workshop'][i]){
                        div = div.mul(CIVICS['workshop'][i]['effect']['markdown']['building'][iw]['effect']['mul']())
                    }
                }
            }
        }
    }
    return base.div(div)
}

function getBuildGainBase(building,res){
    let mul = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['building']!==undefined){
            for(let ib in CIVICS['workshop'][i]['effect']['building']){
                if(CIVICS['workshop'][i]['effect']['building'][ib]['gain']?.['add']!==undefined){
                    for(let ibga in CIVICS['workshop'][i]['effect']['building'][ib]['gain']['add']){
                        if(CIVICS['workshop'][i]['effect']['building'][ib]['gain']['add'][ibga]['mul']!==undefined){
                            if(ib==building && res==ibga && player['workshop'][i]){
                                mul = mul.mul(CIVICS['workshop'][i]['effect']['building'][ib]['gain']['add'][ibga]['mul']())
                            }
                        }
                    }
                }
                if(CIVICS['workshop'][i]['effect']['building'][ib]['effect']?.['mul']!==undefined){
                    if(ib==building && player['workshop'][i]){
                        mul = mul.mul(CIVICS['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                    }
                }
            }
        }
    }
    return n(MAIN['building'][building]['effect']['gain']['add'][res]()).mul(mul)
}

function getBuildGain(building, res){
    if(MAIN['building'][building]['effect']?.['gain']?.['add']!==undefined){
        for(let i in MAIN['building'][building]['effect']['gain']['add']){
            let cost = n(getBuildGainBase(building, i)).mul(player['building'][building+'Allocation'] ?? player['building'][building])
            if(n(cost).lt(0)){
                if(player['resource'][i].lte(n(cost).abs())){
                    if(player['building'][building+'Allocation']!==undefined){
                        buildingAllocation(n(1), 'sub', building)
                    }
                    return n(0)
                }
            }
        }
    }
    return n(getBuildGainBase(building, res)).mul(player['building'][building+'Allocation'] ?? player['building'][building])
}

function getBuildCappedBase(building,res){
    let base = MAIN['building'][building]['effect']['capped']['add'][res]()
    let mul = n(1)
    for(let i in CIVICS['workshop']){
        if(CIVICS['workshop'][i]['effect']?.['building']!==undefined){
            for(let ib in CIVICS['workshop'][i]['effect']['building']){
                if(CIVICS['workshop'][i]['effect']['building'][ib]['capped']?.['add']!==undefined){
                    for(let ibga in CIVICS['workshop'][i]['effect']['building'][ib]['capped']['add']){
                        if(CIVICS['workshop'][i]['effect']['building'][ib]['capped']['add'][ibga]['add']!==undefined){
                            if(building==ib && res==ibga && player['workshop'][i]){
                                base = base.add(CIVICS['workshop'][i]['effect']['building'][ib]['capped']['add'][ibga]['add']())
                            }
                        }
                    }
                }

                if(CIVICS['workshop'][i]['effect']['building'][ib]['effect']?.['mul']!==undefined){
                    if(building==ib && player['workshop'][i]){
                        mul = mul.mul(CIVICS['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                    }
                }
            }
        }
    }
    return n(base).mul(mul)
}

function getBuildCapped(building,res){
    return n(getBuildCappedBase(building, res)).mul(player['building'][building+'Allocation'] ?? player['building'][building])
}

function buildingAllocation(amount,type,id){
    if(type=='add'){
        player['building'][id+'Allocation'] = player['building'][id+'Allocation'].add(amount).min(player['building'][id])
    }else{
        player['building'][id+'Allocation'] = player['building'][id+'Allocation'].sub(amount).max(0)
    }
    componentBuilding(id)
}