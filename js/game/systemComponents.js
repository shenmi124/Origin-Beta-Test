function componentBuilding(id){
    getByID(id+"LoadBuildingID",`
    <tooltip `+tooltipLoad(id,'TooltipLoadBuilding')+`>
        <button id="`+id+`BuildingButtonID" onclick="Build('`+id+`')">`+main['building'][id]['name']()+`(`+player['building'][id]+`)</button>
    </tooltip>
    `)

    let resCan = true
    let maxCan = true
    for(let i in main['building'][id]['tooltip']['cost']){
        let res = n(main['building'][id]['tooltip']['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['tooltip']['costPower']()).add(1)).sub(1)
        if(n(main['resource'][i]['max']!==undefined)){
            if(n(main['resource'][i]['max']()).lt(res)){
                addedCss(id+"BuildingButtonID",'max')
                maxCan = false
            }
        }
        if(n(player['resource'][i]).lt(res)){
            addedCss(id+"BuildingButtonID",'res')
            resCan = false
        }
    }
    if(maxCan){
        removeCss(id+"BuildingButtonID",'max')
    }
    if(resCan){
        removeCss(id+"BuildingButtonID",'res')
    }
}