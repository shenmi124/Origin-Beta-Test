function componentAction(id){
	getByID(id+"LoadActionID",`
	<tooltip `+loadTooltip(id,'LoadTooltipAction')+`>
		<button id="action`+id+`ButtonID" class="cold" onclick="getActionClick('`+id+`')">`+MAIN['action'][id]['name']()+`</button>
	</tooltip>
    `)
}

function componentCraft(id){
    getByID(id+"LoadCraftID",`
    <tooltip `+loadTooltip(id,'LoadTooltipCraft')+`>
        <button id="craft`+id+`ButtonID" class="cold" onclick="getCraftClick('`+id+`')">`+MAIN['craft'][id]['name']()+`</button>
    </tooltip>
    `)
}

function componentBuilding(id){
    getByID(id+"LoadBuildingID",`
    <tooltip `+loadTooltip(id, 'LoadTooltipBuilding', `onclick='document.getElementById("tooltip").style.display="none"`, 'building')+`>
        <a id="`+id+`LoadBuildingAmountID"></a>
        <a id="`+id+`LoadBuildingAllocationID"></a>
        <button id="`+id+`BuildingButtonID" onclick="Build('`+id+`')">`+MAIN['building'][id]['name']()+`</button>
    </tooltip>
    `)

    let revised = formatWhole(player['building'][id])
    if(MAIN['building'][id]['allocation'] ?? false){
        if(!player['building'][id].eq(player['building'][id+'Allocation'])){
            revised = formatWhole(player['building'][id+'Allocation'])+`<grey>|`+formatWhole(player['building'][id])+`</grey>`
        }
    }
    let buildingAmount = 
    `<div style="width: 0;">
        <div class="buildingAmount" onclick="Build('`+id+`')">`+revised+`</div>
    </div>`
    if(MAIN['building'][id]['unique'] ?? false){
        buildingAmount = ``
    }
    getByID(id+'LoadBuildingAmountID', buildingAmount)
    
    let buildingAllocation = ``
    if(MAIN['building'][id]['allocation'] ?? false){
        buildingAllocation = `
        <div style="width: 0;">
            <div class="buildingAllocationAdd" onclick="buildingAllocation(n(1), 'add', '`+id+`')">+</div>
            <div class="buildingAllocationSub" onclick="buildingAllocation(n(1), 'sub', '`+id+`')">-</div>
        </div>`
    }
    getByID(id+'LoadBuildingAllocationID', buildingAllocation)

    let resCan = true
    let cappedCan = true
    for(let i in MAIN['building'][id]['cost']){
        let res = getBuildCost(id, i)
        if(RESOURCE['main'][i]['capped']!==undefined){
            if(n(getResourceCapped(i)).lt(res)){
                addedCss(id+"BuildingButtonID", 'capped')
                cappedCan = false
            }
        }
        if(n(player['resource'][i]).lt(res)){
            addedCss(id+"BuildingButtonID", 'res')
            resCan = false
        }
    }
    if(cappedCan){
        removeCss(id+"BuildingButtonID", 'capped')
    }
    if(resCan){
        removeCss(id+"BuildingButtonID", 'res')
    }
}

function componentCitizens(id){		
    getByID(id+'LoadCitizensNameID', `<tooltip `+loadTooltip(id,'LoadTooltipCitizens',null)+`><div id="`+id+`CitizensNameID" style="display: inline-grid; width: 120px">`+CIVICS['citizens'][id]['name']()+`</div></tooltip>`)
    let allocated = formatWhole(player['citizens'][id])
    let allocatedMax = n(Infinity)
    for(let i in CIVICS['citizens'][id]['allocated']){
        let display = true
        if(CIVICS['jobs'][i]['display']!==undefined){
            display = CIVICS['jobs'][i]['display']()
        }
        if(display){
            allocatedMax = allocatedMax.min(n(CIVICS['jobs'][i]['amount']()).div(CIVICS['citizens'][id]['allocated'][i]()).floor())
        }
    }
    if(allocatedMax.neq(Infinity)){
        allocated += ' / '+formatWhole(allocatedMax)+''
    }
    getByID(id+'LoadCitizensAllocatedID', '<div style="display: inline-grid; width: 100px">'+allocated+'</div>')
    getByID(id+'LoadCitizensButtonID', `
        <div style="display: inline-grid; width: 30px"><button onclick="citizensAllocate('`+id+`', -1); CitizensFix()" style="display: inline-grid;" class="citizens"> < </button></div>
        <div style="display: inline-grid; width: 30px"><button onclick="citizensAllocate('`+id+`', 1); CitizensFix()" style="display: inline-grid;" class="citizens"> > </button></div>
    `)
}

function componentJobs(id){		
    getByID(id+'CitizenJobsNameLoadID', `<tooltip `+loadTooltip(id,'LoadTooltipCitizenJobs',null)+`><div id="`+id+`JobsNameID" style="display: inline-grid; width: 120px">`+CIVICS['jobs'][id]['name']()+`</div></tooltip>`)
    getByID(id+'CitizenJobsAllocatedLoadID', formatWhole(getUnemployedJobs(id)))
}

function componentWorkshop(id){
    getByID(id+"LoadWorkshopID", `
    <tooltip `+loadTooltip(id, 'LoadTooltipWorkshop', `onclick='document.getElementById("tooltip").style.display="none"`, 'button')+`>
        <button id="`+id+`WorkshopButtonID" onclick="Upgrade('`+id+`')">`+CIVICS['workshop'][id]['name']()+`</button>
    </tooltip>
    `)

    let resCan = true
    let cappedCan = true
    for(let i in CIVICS['workshop'][id]['cost']){
        let res = n(CIVICS['workshop'][id]['cost'][i]())
        if(RESOURCE['main'][i]['capped']!==undefined){
            if(n(getResourceCapped(i)).lt(res)){
                addedCss(id+"WorkshopButtonID", 'capped')
                cappedCan = false
            }
        }
        if(n(player['resource'][i]).lt(res)){
            addedCss(id+"WorkshopButtonID", 'res')
            resCan = false
        }
    }
    if(cappedCan){
        removeCss(id+"WorkshopButtonID", 'capped')
    }
    if(resCan){
        removeCss(id+"WorkshopButtonID", 'res')
    }
}