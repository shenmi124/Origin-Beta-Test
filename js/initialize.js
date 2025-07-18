var T = new Date()
var TIMESTART = new Date()
var OFFLINETIME = new Date()
var DIFF = 0

function loadTab(){
	let tabStr = ''
	for(let i in TABBUTTON){
		let tabData = ''
		if(TABBUTTON[i]['data']!==undefined){
			tabData = TABBUTTON[i]['data']()
		}
		tabStr += '<div id="'+i+'Tab">'+tabData+'</div>'
	}
	getByID('midTab', tabStr)

	let tabButtonStr = ''
	for(let i in TABBUTTON){
		tabButtonStr += `<span id="`+i+`TabButton" class="tabButton `+i+`" onclick="showTab('`+i+`')">`+TABBUTTON[i]['name']()+`</span>`
		if(TABBUTTON[i]['subtab']!==undefined){
			let subtab = '<div id="'+i+'SubtabButton"><div id="'+i+'SubtabTop" style="margin-top: 5px"></div>'
			let subtabData = ''
			for(let is in TABBUTTON[i]['subtab']){
				let data = ''
				if(TABBUTTON[i]['subtab'][is]['data']!==undefined){
					data = TABBUTTON[i]['subtab'][is]['data']()
				}
				subtab += `<span id="`+is+`SubtabID" class="tabButton subtab `+is+`Subtab" onclick="showSubTab('`+is+`')">`+TABBUTTON[i]['subtab'][is]['name']()+`</span>`
				subtabData += `<div id="`+is+`Subtab">`+data+`</div>`
			}
			subtab += '<div id="'+i+'SubtabBr" style="border-top: 1px solid #000a; margin-top: 4px"></div></div>'
			addByID('subtabButton', subtab)
			getByID(i+'Tab', subtabData)
		}
	}
	tabButtonStr += `<div style="border-top: 1px solid #000; margin-top: 5px"></div>`
	getByID('tabButton', tabButtonStr)

	for(let i in TABBUTTON){
		if(TABBUTTON[i]['subtab']!==undefined){
			for(let it in TABBUTTON[i]['subtab']){
				showSubTab(it)
				break
			}
		}
	}
}

function loadBase(){	
	let resourceStr = `
		<div id="actionEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`action`, `efficient`, null)+`>效率</tooltip>: <span id="actionEfficient"></span></div>
		<div id="happinessEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`happiness`, `efficient`, null)+`>幸福度</tooltip>: <span id="happinessEfficient"></span></div>
		<br>
	`
	for(let i in RESOURCE['main']){
		if(RESOURCE['main'][i]['newType']!==undefined){
			resourceStr += '<span id="'+i+'TypeID" style="color: #888; display: none"><br>'+RESOURCE['main'][i]['newType']()+'<br></span>'
		}
		resourceStr += `<a id=`+i+`LoadResource></a>`
	}
	getByID('loadResource', resourceStr)
	for(let i in RESOURCE['main']){
		getByID(i+'LoadResource', `<div id="`+i+`LoadResourceBackground" style="border-right: 2px solid #999"><a id="`+i+`LoadResourceTitleID"></a><a id="`+i+`LoadResourceID"></a><a id="`+i+`LoadResourceBorderID"></a></div>`)
		getResourceTitleID(i+'LoadResource', i)
	}

	let mainStr = ''
	for(let i in MainActionData){
		let text = '<a style="font-size: 14px;" id="'+MainActionData[i]['id']()+'TextID"></a>'
		let load = '<a id="'+MainActionData[i]['id']()+'LoadID"></a>'
		mainStr += text+load
	}
	getByID('actionSubtab', mainStr)

	let actionStr = ''
	for(let i in MAIN['action']){
		actionStr += '<a style="transition-duration: 1s;" id='+i+'LoadAction></a>'
	}
	getByID('actionLoadID',actionStr)
	for(let i in MAIN['action']){
		getByID(i+'LoadAction',`<br id="`+i+`actionBrID"><a id="`+i+`LoadActionID" class="action"></a><button id="action`+i+`BorderID" class="bar" style="clip-path: inset(0% 0% 0% 0%);"></button>`)
		componentAction(i)
	}

	let craftStr = ''
	for(let i in MAIN['craft']){
		craftStr += '<a style="transition-duration: 1s;" id='+i+'LoadCraft></a>'
	}
	getByID('craftLoadID',craftStr)
	for(let i in MAIN['craft']){
		getByID(i+'LoadCraft',`<br id="`+i+`craftBrID"><a id="`+i+`LoadCraftID" class="action"></a><button id="craft`+i+`BorderID" class="bar" style="clip-path: inset(0% 0% 0% 0%);"></button>`)
		componentCraft(i)
	}

	let buildingStr = ''
	for(let i in MAIN['building']){
		buildingStr += '<a style="transition-duration: 1s;" id='+i+'LoadBuilding></a>'
	}
	getByID('buildingLoadID',buildingStr)
	for(let i in MAIN['building']){
		getByID(i+'LoadBuilding',`<br id="`+i+`buildingBrID"><a id="`+i+`LoadBuildingID" style="display: inline-flex; padding-right: 8px"></a>`)
		componentBuilding(i)
	}

	let citizensStr = ''
	citizensStr += `居民 <a id="CitizensTip" style="color: grey"></a><br>`
	for(let i in CIVICS['citizens']){
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizens"></div>'
	}
	citizensStr += `<br><a id="CitizenJobs">*未分配</a><br>`
	for(let i in CIVICS['jobs']){
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizenJobs"></div>'
	}
	getByID('allocationSubtab', citizensStr)
	for(let i in CIVICS['citizens']){
		getByID(i+'LoadCitizens',`<a style="display: inline-flex" id="`+i+`LoadCitizensNameID"></a><a style="display: inline-flex" id="`+i+`LoadCitizensAllocatedID"></a><a style="display: inline-flex" id="`+i+`LoadCitizensButtonID"></a>`)
		componentCitizens(i)
	}
	for(let i in CIVICS['jobs']){
		getByID(i+'LoadCitizenJobs',`<a style="display: inline-flex" id="`+i+`CitizenJobsNameLoadID"></a><a style="display: inline-flex" id="`+i+`CitizenJobsAllocatedLoadID"></a>`)
		componentJobs(i)
	}
	getByID('CitizensTip', CitizensTip())
	
	let workshopStr = ''
	workshopStr += `工坊<input id="workshopInput" type="checkbox" onclick="switchWorkshopBought()"><br>`
	for(let i in CIVICS['workshop']){
		workshopStr += '<a style="transition-duration: 1s;" id='+i+'LoadWorkshop></a>'
	}
	getByID('workshopSubtab', workshopStr)
	for(let i in CIVICS['workshop']){
		getByID(i+'LoadWorkshop',`<br id="`+i+`workshopBrID"><a style="display: inline-flex;" id="`+i+`LoadWorkshopID"></a> `)
		componentWorkshop(i)
	}

	let netwrokStr = ''
	netwrokStr += '工坊网状图<br><div id="network"></div>'
	getByID('networkSubtab', netwrokStr)
	getNetwork()
}

function loadGame(){
	Close('tooltip')
	Close('datePage')
	showTab('main')

	calcGame()
	gameLoader()

    for(let i in MAIN['action']){
        if(MAIN['action'][i]['cooldown']!==undefined){
			player.action[i+'Cooldown'] = n(0)
        }
    }
    for(let i in MAIN['craft']){
        if(MAIN['craft'][i]['cooldown']!==undefined){
			player.craft[i+'Cooldown'] = n(0)
        }
    }
	
	getByID('loadRightColumn', document.getElementById('rightColumn').innerHTML)
}

let loadingGame = function(){
	calcPlayer()

	loadTab()
	loadBase()

	loadGame()

	loadVersion()
	loadDonate()
	
	loadSetting()
	loadInformation()
}