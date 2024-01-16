function componentAction(id){
	getByID(id+"LoadActionID",`
	<tooltip `+tooltipLoad(id,'TooltipLoadAction')+`>
		<button id="action`+id+`ButtonID" class="cold" onclick="getActionClick('`+id+`')">`+main['action'][id]['name']()+`</button>
	</tooltip>
    `)
}

function componentBuilding(id){
    let number = `(`+player['building'][id]+`)`
    if(main['building'][id]['instant']!==undefined){
        number = main['building'][id]['instant']() ? `` : `(`+player['building'][id]+`)`
    }
    getByID(id+"LoadBuildingID",`
    <tooltip `+tooltipLoad(id,'TooltipLoadBuilding')+`>
        <button id="`+id+`BuildingButtonID" onclick="Build('`+id+`')">`+main['building'][id]['name']()+number+`</button>
    </tooltip>
    `)

    let resCan = true
    let maxCan = true
    for(let i in main['building'][id]['cost']){
        let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
        if(n(main['resource'][i]['max']!==undefined)){
            if(n(getResourceBaseMax(i)).lt(res)){
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

function componentCraft(id){
    getByID(id+"LoadCraftID",`
    <tooltip `+tooltipLoad(id,'TooltipLoadCraft')+`>
        <button id="craft`+id+`ButtonID" class="cold" onclick="getCraftClick('`+id+`')">`+main['craft'][id]['name']()+`</button>
    </tooltip>
    `)
}