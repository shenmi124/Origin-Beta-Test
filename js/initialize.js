var T = new Date()
var TIMESTART = new Date()
var OFFLINETIME = new Date()
var DIFF = 0

function loadMain(){
	let buttonStr = ''
	for(let i in mainButton){
		buttonStr += `<span id="`+i+`MainTabID" class="maintab `+i+`" onclick="showTab('`+i+`')">`+mainButton[i]['name']()+`</span>`
		if(mainButton[i]['subTab']!==undefined){
			let subTab = ''
			let subMain = ''
			subTab += `<div style="margin-top: 5px"></div>`
			for(let is in mainButton[i]['subTab']){
				subTab += `<span id="`+i+'_'+is+`SubMainTabID" class="maintab subtab sub_`+is+`" onclick="showSubTab('`+i+`', '`+is+`')">`+mainButton[i]['subTab'][is]['name']()+`</span>`
				subMain += `<div id="subtab_`+i+'_'+is+`">`+mainButton[i]['subTab'][is]['data']()+`</div>`
			}
			getByID('tab_'+i, subTab+'<div id="'+i+'_subTabBr" style="border-top: 1px solid #000a; margin-top: 4px"></div><subTab>'+subMain+'</subTab>')
		}
	}
	buttonStr += `<div style="border-top: 1px solid #000; margin-top: 5px"></div>`
	getByID('loadMainButton', buttonStr)
	document.getElementById("mainMainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById("mainMainTabID").style.opacity = '0.8'

	let mainStr = ''
	for(let i in mainTab){
		let text = '<a style="font-size: 14px;" id="'+mainTab[i]['id']()+'TextID"></a>'
		let load = '<a id="'+mainTab[i]['id']()+'LoadID"></a>'
		mainStr += text+load
	}
	getByID('subtab_main_action', mainStr)
}

function loadBase(){
	let resourceStr = `
		<div id="actionEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`action`, `efficient`, null)+`>效率</tooltip>: <span id="actionEfficient"></span></div>
		<div id="happinessEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`happiness`, `efficient`, null)+`>幸福度</tooltip>: <span id="happinessEfficient"></span></div>
		<br>
	`
	for(let i in resource['main']){
		if(resource['main'][i]['newType']!==undefined){
			resourceStr += '<span id="'+i+'TypeID" style="color: #888; display: none"><br>'+resource['main'][i]['newType']()+'<br></span>'
		}
		resourceStr += `<a id=`+i+`LoadResource></a>`
	}
	getByID('loadResource', resourceStr)
	for(let i in resource['main']){
		getByID(i+'LoadResource', `<div id="`+i+`LoadResourceBackground" style="border-right: 2px solid #999"><a id="`+i+`LoadResourceTitleID"></a><a id="`+i+`LoadResourceID"></a><a id="`+i+`LoadResourceBorderID"></a></div>`)
		getResourceTitleID(i+'LoadResource', i)
	}

	let actionStr = ''
	for(let i in main['action']){
		actionStr += '<a style="transition-duration: 1s;" id='+i+'LoadAction></a>'
	}
	getByID('actionLoadID',actionStr)
	for(let i in main['action']){
		getByID(i+'LoadAction',`<br id="`+i+`actionBrID"><a id="`+i+`LoadActionID"></a><button id="action`+i+`BorderID" style="z-index: -1; background: #000; transition-duration: 0.05s; clip-path: inset(0% 0% 0% 0%);"></button>`)
		componentAction(i)
	}

	let buildingStr = ''
	for(let i in main['building']){
		buildingStr += '<a style="transition-duration: 1s;" id='+i+'LoadBuilding></a>'
	}
	getByID('buildingLoadID',buildingStr)
	for(let i in main['building']){
		getByID(i+'LoadBuilding',`<br id="`+i+`buildingBrID"><a id="`+i+`LoadBuildingID"></a>`)
		componentBuilding(i)
	}

	let craftStr = ''
	for(let i in main['craft']){
		craftStr += '<a style="transition-duration: 1s;" id='+i+'LoadCraft></a>'
	}
	getByID('craftLoadID',craftStr)
	for(let i in main['craft']){
		getByID(i+'LoadCraft',`<br id="`+i+`craftBrID"><a id="`+i+`LoadCraftID"></a><button id="craft`+i+`BorderID" style="z-index: -1; background: #000; transition-duration: 0.05s; clip-path: inset(0% 0% 0% 0%);"></button>`)
		componentCraft(i)
	}

	let citizensStr = ''
	citizensStr += `居民 <a id="CitizensTip" style="color: grey"></a><br>`
	for(let i in civics['citizens']){
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizens"></div>'
	}
	citizensStr += `<br><a id="CitizenJobs">*未分配</a><br>`
	for(let i in civics['jobs']){
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizenJobs"></div>'
	}
	getByID('subtab_civics_allocation', citizensStr)
	for(let i in civics['citizens']){
		getByID(i+'LoadCitizens',`<a style="display: inline-flex" id="`+i+`LoadCitizensNameID"></a><a style="display: inline-flex" id="`+i+`LoadCitizensAllocatedID"></a><a style="display: inline-flex" id="`+i+`LoadCitizensButtonID"></a>`)
		componentCitizens(i)
	}
	for(let i in civics['jobs']){
		getByID(i+'LoadCitizenJobs',`<a style="display: inline-flex" id="`+i+`CitizenJobsNameLoadID"></a><a style="display: inline-flex" id="`+i+`CitizenJobsAllocatedLoadID"></a>`)
		componentJobs(i)
	}
	getByID('CitizensTip', CitizensTip())
	
	let workshopStr = ''
	workshopStr += `工坊<input type="checkbox" onclick="switchWorkshopBought()"><br>`
	for(let i in civics['workshop']){
		workshopStr += '<a style="transition-duration: 1s;" id='+i+'LoadWorkshop></a>'
	}
	getByID('subtab_civics_develop',workshopStr)
	for(let i in civics['workshop']){
		getByID(i+'LoadWorkshop',`<br id="`+i+`workshopBrID"><a style="display: inline-flex;" id="`+i+`LoadWorkshopID"></a> `)
		componentWorkshop(i)
	}
}

function loadGame(){
	Close('tooltip')
	Close('datePage')
	showTab('main')
	for(let i in mainButton){
		if(mainButton[i]['subTab']!==undefined){
			for(let is in mainButton[i]['subTab']){
				showSubTab(i, is)
				break
			}
		}
	}

	calcGame()
	gameLoader()

    for(let i in main['action']){
        if(main['action'][i]['cooldown']!==undefined){
			player.action[i+'Cooldown'] = n(0)
        }
    }
    for(let i in main['craft']){
        if(main['craft'][i]['cooldown']!==undefined){
			player.craft[i+'Cooldown'] = n(0)
        }
    }
	
	getByID('loadRightColumn', document.getElementById('rightColumn').innerHTML)
}

let loadingGame = function(){
	calcPlayer()

	loadMain()
	loadBase()

	loadGame()

	loadVersion()
	loadDonate()
	
	loadSetting()
	loadInformation()
}