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
    let style = ''
    if(main['building'][id]['allocation']!==undefined){
        if(main['building'][id]['allocation']()){
            style = ''
        }
    }
    if(main['building'][id]['unique']!==undefined){
        number = main['building'][id]['unique']() ? `` : `(`+player['building'][id]+`)`
    }
    getByID(id+"LoadBuildingID",`
    <tooltip `+loadTooltip(id,'LoadTooltipBuilding')+`>
        <button style="`+style+`" id="`+id+`BuildingButtonID" onclick="Build('`+id+`')">`+main['building'][id]['name']()+number+`</button>
    </tooltip>
    `)

    let resCan = true
    let cappedCan = true
    for(let i in main['building'][id]['cost']){
        let res = getBuildCost(id, i)
        if(resource['main'][i]['capped']!==undefined){
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

function componentBuildingAllocation(id){
    if(main['building'][id]['allocation']!==undefined){
        if(main['building'][id]['allocation']()){
            getByID(id+'LoadBuildingAllocationID', `<div class="allocation">+</div>`)
        }
    }
}

function componentCitizens(id){		
    getByID(id+'LoadCitizensNameID', `<tooltip `+loadTooltip(id,'LoadTooltipCitizens',null)+`><div id="`+id+`CitizensNameID" style="display: inline-grid; width: 120px">`+civics['citizens'][id]['name']()+`</div></tooltip>`)
    getByID(id+'LoadCitizensAllocatedID', '<div style="display: inline-grid; width: 60px">'+formatWhole(player['citizens'][id])+'</div>')
    getByID(id+'LoadCitizensButtonID', `
        <div style="display: inline-grid; width: 30px"><button onclick="allocateCitizens('`+id+`', -1); CitizensFix()" style="display: inline-grid;" class="citizens"> < </button></div>
        <div style="display: inline-grid; width: 30px"><button onclick="allocateCitizens('`+id+`', 1); CitizensFix()" style="display: inline-grid;" class="citizens"> > </button></div>
    `)
}

function componentJobs(id){		
    getByID(id+'CitizenJobsNameLoadID', `<tooltip `+loadTooltip(id,'LoadTooltipCitizenJobs',null)+`><div id="`+id+`JobsNameID" style="display: inline-grid; width: 120px">`+civics['jobs'][id]['name']()+`</div></tooltip>`)
    getByID(id+'CitizenJobsAllocatedLoadID', formatWhole(getUnemployedJobs(id)))
}

function componentWorkshop(id){
    getByID(id+"LoadWorkshopID", `
    <tooltip `+loadTooltip(id,'LoadTooltipWorkshop')+`>
        <button id="`+id+`WorkshopButtonID" onclick="Upgrade('`+id+`')">`+civics['workshop'][id]['name']()+`</button>
    </tooltip>
    `)

    let resCan = true
    let cappedCan = true
    for(let i in civics['workshop'][id]['cost']){
        let res = n(civics['workshop'][id]['cost'][i]())
        if(resource['main'][i]['capped']!==undefined){
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