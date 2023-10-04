function getResourceBaseGain(resource){
    let gain = n(0)
    for(let i in main['resource'][resource]['tooltip']['gain']){
        gain = gain.add(main['resource'][resource]['tooltip']['gain'][i]['number']())
    }
    return gain
}

function getResourceBaseMax(resource){
    let max = n(0)
    for(let i in main['resource'][resource]['tooltip']['max']){
        max = max.add(main['resource'][resource]['tooltip']['max'][i]['number']())
    }
    return max
}

function getBuildGain(building,resource){
    return n(main['building'][building]['tooltip']['effect']['gain'][resource]()).mul(player['building'][building])
}

function getBuildMax(building,resource){
    return n(main['building'][building]['tooltip']['effect']['max'][resource]()).mul(player['building'][building])
}

function getTooltipLoot(resource,effect,start=n(0),type='research'){
    return formatWhole(player[type][resource].sub(n(start)).max(1).mul(n(effect)))
}

function getResourceUnlocked(resource){
    return player['resource'][resource].gt(0) || player['resource'][resource+'Unlocked']
}