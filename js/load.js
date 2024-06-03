var T = new Date()
var TIMESTART = new Date()
var OFFLINETIME = new Date()
var DIFF = 0

var VERSION = 'v0.9.2.0'
var VERSIONTIMES = n(3)

function loadMain(){
	let buttonStr = ''
	for(let i in mainButton){
		buttonStr += `<span id="`+i+`MainTabID" class="maintab `+i+`" onclick="showTab('`+i+`')">`+mainButton[i]['name']()+`</span>`
	}
	buttonStr += `<div style="border-top: 1px solid #000; margin-top: 5px"></div>`
	getByID('loadMainButton',buttonStr)
	document.getElementById("mainMainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById("mainMainTabID").style.opacity = '0.8'

	let mainStr = ''
	for(let i in mainTab){
		let text = '<a style="font-size: 14px;" id="'+mainTab[i]['id']()+'TextID"></a>'
		let load = '<a id="'+mainTab[i]['id']()+'LoadID"></a>'
		mainStr += text+load
	}
	getByID('loadMain', mainStr)
}

function loadBase(){
	let resourceStr = `
		<div id="actionEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`action`, `efficient`, null)+`>效率</tooltip>: <span id="actionEfficient"></span></div>
		<div id="happinessEfficientID" style="font-size: 12px"><tooltip `+loadTooltip(`happiness`, `efficient`, null)+`>幸福度</tooltip>: <span id="happinessEfficient"></span></div>
		<br>
	`
	for(let i in main['resource']){
		if(main['resource'][i]['newType']!==undefined){
			resourceStr += '<span id="'+i+'TypeID" style="color: #888; display: none"><br>'+main['resource'][i]['newType']()+'<br></span>'
		}
		resourceStr += `<a id=`+i+`LoadResource></a>`
	}
	getByID('loadResource', resourceStr)
	for(let i in main['resource']){
		getByID(i+'LoadResource', `<div style="border-right: 2px solid #999"><a id="`+i+`LoadResourceTitleID"></a><a id="`+i+`LoadResourceID"></a><a id="`+i+`LoadResourceBorderID"></a></div>`)
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
		getByID(i+'LoadBuilding',`<br id="`+i+`buildingBrID"><a id="`+i+`LoadBuildingID"></a> `)
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
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizensID"></div>'
	}
	citizensStr += `<br><a id="CitizenJobs">*未分配</a><br>`
	for(let i in civics['jobs']){
		citizensStr += '<div style="transition-duration: 1s; margin-top: 3px; margin-left: 10px" id="'+i+'LoadCitizenJobsID"></div>'
	}
	getByID('citizensLoadID',citizensStr)
	for(let i in civics['citizens']){
		getByID(i+'LoadCitizensID',`<a style="display: inline-flex" id="`+i+`CitizensNameLoadID"></a><a style="display: inline-flex" id="`+i+`CitizensAllocatedLoadID"></a><a style="display: inline-flex" id="`+i+`CitizensButtonLoadID"></a>`)
		componentCitizens(i)
	}
	for(let i in civics['jobs']){
		getByID(i+'LoadCitizenJobsID',`<a style="display: inline-flex" id="`+i+`CitizenJobsNameLoadID"></a><a style="display: inline-flex" id="`+i+`CitizenJobsAllocatedLoadID"></a>`)
		componentJobs(i)
	}
	getByID('CitizensTip',CitizensTip())
	
	let workshopStr = '<br><br>'
	workshopStr += `工坊<input type="checkbox" onclick="switchWorkshopBought()"><br>`
	for(let i in civics['workshop']){
		workshopStr += '<a style="transition-duration: 1s;" id='+i+'LoadWorkshop></a>'
	}
	getByID('workshopLoadID',workshopStr)
	for(let i in civics['workshop']){
		getByID(i+'LoadWorkshop',`<br id="`+i+`workshopBrID"><a id="`+i+`LoadWorkshopID"></a> `)
		componentWorkshop(i)
	}
}

function loadGame(){
	Close('tooltip')
	Close('datePage')
	showTab('main')

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

function loadVersion(){
	getByID('version',VERSION)

	if(player.data.version==null){
		player.data.version = VERSION
		player.data.versiontimes = VERSIONTIMES
	}else if(player.data.version!==VERSION){
		
		if(player.data.versiontimes.lte(2)){
			player.resource.idea = n(0)
		}
		if(player.data.versiontimes.lte(1) && player.resource.citizens.gte(1)){
			getStage(4)
		}

		player.data.version = VERSION
		player.data.versiontimes = VERSIONTIMES
		addLog('已更新至<span style="font-family: cursive;">'+VERSION+'</span>','#888')
		save()
	}
}

let loadingGame = function(){
	calcPlayer()

	loadMain()
	loadBase()

	loadGame()

	loadVersion()
	
	loadSetting()
}