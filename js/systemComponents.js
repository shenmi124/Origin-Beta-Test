function componentAction(id){
	getByID(id+"LoadActionID",`
	<tooltip `+loadTooltip(id,'LoadTooltipAction')+`>
		<button id="action`+id+`ButtonID" class="cold" onclick="getActionClick('`+id+`')">`+main['action'][id]['name']()+`</button>
	</tooltip>
    `)
}

function componentCraft(id){
    getByID(id+"LoadCraftID",`
    <tooltip `+loadTooltip(id,'LoadTooltipCraft')+`>
        <button id="craft`+id+`ButtonID" class="cold" onclick="getCraftClick('`+id+`')">`+main['craft'][id]['name']()+`</button>
    </tooltip>
    `)
}

function componentBuilding(id){
    let number = `(`+player['building'][id]+`)`
    if(main['building'][id]['instant']!==undefined){
        number = main['building'][id]['instant']() ? `` : `(`+player['building'][id]+`)`
    }
    getByID(id+"LoadBuildingID",`
    <tooltip `+loadTooltip(id,'LoadTooltipBuilding')+`>
        <button id="`+id+`BuildingButtonID" onclick="Build('`+id+`')">`+main['building'][id]['name']()+number+`</button>
    </tooltip>
    `)

    let resCan = true
    let maxCan = true
    for(let i in main['building'][id]['cost']){
        let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
        if(n(main['resource'][i]['max']!==undefined)){
            if(n(getResourceMax(i)).lt(res)){
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

function componentCitizens(id){		
    getByID(id+'CitizensNameLoadID',`<tooltip `+loadTooltip(id,'LoadTooltipCitizens',null)+`><div style="display: inline-grid; width: 80px">`+civics['citizens'][id]['name']()+`</div></tooltip>`)
    getByID(id+'CitizensAllocatedLoadID','<div style="display: inline-grid; width: 30px">'+formatWhole(player['citizens'][id])+'</div>')
    getByID(id+'CitizensButtonLoadID',`
        <div style="display: inline-grid; width: 30px"><button onclick="allocateCitizens('`+id+`', -1); CitizensFix()" style="display: inline-grid;" class="citizens"> < </button></div>
        <div style="display: inline-grid; width: 30px"><button onclick="allocateCitizens('`+id+`', 1); CitizensFix()" style="display: inline-grid;" class="citizens"> > </button></div>
    `)
}

function componentCitizenJobs(id){		
    getByID(id+'CitizenJobsNameLoadID',`<tooltip `+loadTooltip(id,'LoadTooltipCitizenJobs',null)+`><div style="display: inline-grid; width: 80px">`+civics['jobs'][id]['name']()+`</div></tooltip>`)
    getByID(id+'CitizenJobsAllocatedLoadID',formatWhole(getUnemployedJobs(id)))
}