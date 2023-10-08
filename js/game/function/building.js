function getBuildingID(id){
    componentBuilding(id)
}

function Build(id){
    let canbuy = true
    let logs = '你还差'
    for(i in main['building'][id]['cost']){
        let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
        if(n(player['resource'][i]).lt(res)){
            canbuy = false
            logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+colorText(i)[1]
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
    componentBuilding(id)
}