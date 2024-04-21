function changeCitizens(id,type){
    if(type=="add" && player.citizens.unemployed.gte(1)){
        player.citizens[id] = player.citizens[id].add(1)
    }else if(type=="sub"){
        player.citizens['unemployed'] = player.citizens['unemployed'].add(1)
        player.citizens[id] = player.citizens[id].sub(1).max(0)
    }
    componentCitizens(id)
    componentCitizens('unemployed')
}

function getCitizens(id){
    if(civics['citizens'][id]['number']!==undefined){
        player.citizens[id] = n(civics['citizens'][id]['number']())
    }
    getByID(id+'Citizens',formatWhole(player.citizens[id]))
}