function getResourceBaseGain(resource){
    let gain = n(0)
    if(main['resource'][resource]['gain']!==undefined){
        gain = gain.add(main['resource'][resource]['gain']())
        for(let i in main['building']){
            if(main['building'][i]['effect']!==undefined){
                if(main['building'][i]['effect']['gain']!==undefined){
                    for(let im in main['building'][i]['effect']['gain']){
                        if(resource==im){
                            gain = gain.add(n(main['building'][i]['effect']['gain'][im]()).mul(player['building'][i]))
                        }
                    }
                }
            }
        }
    }
    if(main['resource'][resource]['mulResearch']!==undefined){
        gain = gain.mul(main['resource'][resource]['mulResearch']())
    }
    return gain
}

function getResourceBaseMax(resource){
    let max = n(0)
    if(main['resource'][resource]['max']!==undefined){
        max = max.add(main['resource'][resource]['max']())
        for(let i in main['building']){
            if(main['building'][i]['effect']!==undefined){
                if(main['building'][i]['effect']['max']!==undefined){
                    for(let im in main['building'][i]['effect']['max']){
                        if(resource==im){
                            max = max.add(n(main['building'][i]['effect']['max'][im]()).mul(player['building'][i]))
                        }
                    }
                }
            }
        }
    }
    return max
}

function getResourceBaseNumber(resource){
    let num = n(0)
    if(main['resource'][resource]['num']!==undefined){
        num = num.add(main['resource'][resource]['num']())
    }
    return num
}

function getBuildGain(building,resource){
    return n(main['building'][building]['effect']['gain'][resource]()).mul(player['building'][building])
}

function getBuildMax(building,resource){
    return n(main['building'][building]['effect']['max'][resource]()).mul(player['building'][building])
}

function getTooltipLoot(resource,effect,start=n(0),type='research'){
    return formatWhole(player[type][resource].sub(n(start)).max(1).mul(n(effect)))
}

function getEffectLoot(resource,effect,start=n(0),type='research'){
    return n(player[type][resource].sub(n(start)).max(0).mul(n(effect)).add(1))
}

function getResourceUnlocked(resource){
    return player['resource'][resource].gt(0) || player['resource'][resource+'Unlocked']
}