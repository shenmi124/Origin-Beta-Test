function getResourceBaseMax(resource){
    return n(main['resource'][resource]['tooltip']['max']['baseMax'].number())
}

function getBuildGain(building,resource){
    return n(main['building'][building]['tooltip']['effect']['gain'][resource]()).mul(player['building'][building])
}

function displayResourceUnlocked(resource){
    return player['resource'][resource].gt(0) || player['resource'][resource+'Unlocked']
}