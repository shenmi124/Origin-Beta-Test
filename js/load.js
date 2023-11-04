function mainLoad(){
	let buttonStr = ''
	for(let i in mainButton){
		buttonStr += `<span id="`+i+`MainTabID" class="maintab" onclick="showTab('`+i+`')">`+mainButton[i]['name']()+`</span>`
	}
	buttonStr += `<div style="border-top: 1px solid #000; margin-top: 10px"></div>`
	getByID('loadMainButton',buttonStr)
	document.getElementById("mainMainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById("mainMainTabID").style.opacity = '0.8'

	let mainStr = ''
	for(let i in mainTab){
		let text = '<a id="'+mainTab[i]['id']()+'TextID"></a>'
		let load = '<a id="'+mainTab[i]['id']()+'LoadID"></a>'
		mainStr += text+load+'<br><br>'
	}
	getByID('loadMain',mainStr)
}

function baseLoad(){
	let resourceStr = '<span style="color: #888">基础资源</span><br>'
	for(let i in main['resource']){
		if(main['resource'][i]['newType']!=undefined){
			resourceStr += '<span id="'+i+'TypeID" style="color: #888; display: none"><br>'+main['resource'][i]['newType']()+'<br></span>'
		}
		resourceStr += `<a id=`+i+`LoadResource></a>`
	}
	getByID('loadResource',resourceStr)
	for(let i in main['resource']){
		getByID(i+'LoadResource',`<a id="`+i+`LoadResourceTitleID"></a><a id="`+i+`LoadResourceID"></a><a id="`+i+`LoadResourceBrID"></a>`)
		getResourceTitleID(i+'LoadResource',i)
	}

	let actionStr = ''
	for(let i in main['action']){
		actionStr += '<a id='+i+'LoadAction></a>'
	}
	getByID('actionLoadID',actionStr)
	for(let i in main['action']){
		getByID(i+'LoadAction',`<br id="action`+i+`LoadBrID"><a id="`+i+`LoadActionID"></a><button id="action`+i+`BorderID" style="z-index: -1; background: #000; transition-duration: 0.1s; clip-path: inset(0% 0% 0% 0%);"></button>`)
		componentAction(i)
	}

	let buildingStr = ''
	for(let i in main['building']){
		buildingStr += '<a id='+i+'LoadBuilding></a>'
	}
	getByID('buildingLoadID',buildingStr)
	for(let i in main['building']){
		getByID(i+'LoadBuilding',`<br id="building`+i+`LoadBrID"><a id="`+i+`LoadBuildingID"></a> `)
		componentBuilding(i)
	}

	let craftStr = ''
	for(let i in main['craft']){
		craftStr += '<a id='+i+'LoadCraft></a>'
	}
	getByID('craftLoadID',craftStr)
	for(let i in main['craft']){
		getByID(i+'LoadCraft',`<br id="craft`+i+`LoadBrID"><a id="`+i+`LoadCraftID"></a> `)
		componentCraft(i)
	}

	let researchStr = ''
	let researchArray = []
	researchStr += '<br><br><div id="topLoadMainResearch" style="text-align: -webkit-center; display: block; height: 20px"></div>'
	for(let i in mainResearch['main']){
		let y = mainResearch['main'][i]['map']()
		if(!researchArray.includes(y)){
			researchArray.push(y)
			researchStr += '<br><br><br><br><div id="'+y+'LoadMainResearch" style="text-align: -webkit-center"></div>'
		}
	}
	researchStr += '<br><br><div id="bottomLoadMainResearch" style="text-align: -webkit-center; display: block; height: 80px"></div>'
	getByID('loadMainResearch',researchStr)
	for(let i in mainResearch['main']){
		addByID(mainResearch['main'][i]['map']()+'LoadMainResearch',`
			<div id="`+i+`MainResearchDivID" style="display: inline-grid; margin-left: 40px; margin-right: 40px;">
				<tooltip `+tooltipLoad(i,'TooltipLoadResearch')+` style="text-align: -webkit-center" class="MainResearch">
					<button id="`+i+`MainResearchButtonID" class="MainResearch Button" onclick="researchClick('`+i+`')"></button>
				</tooltip>
				<div style="text-align: -webkit-center; font-size: 11px">
					`+mainResearch['main'][i]['name']()+`
				</div>
			</div>
		`)
		if(player.research[i].gte(1)){
			document.getElementById(i+"MainResearchButtonID").style.borderColor = 'rgb(246, 170, 255)'
		}
		if(player.canMainResearch[i]==true){
			document.getElementById(i+"MainResearchButtonID").style.borderColor = 'rgb(73, 219, 189)'
		}
		if(player.research[i].gte(mainResearch['main'][i]['max']())){
			document.getElementById(i+"MainResearchButtonID").style.borderColor = 'rgb(174, 35, 252)'
		}
	}
    if(player.research.conducted!==undefined){
        document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = 'rgb(74, 161, 254)'
    }
	canDraw = true
}

function gameLoad(){
	if(player.data.start.gte(1)){
		document.getElementById("rightColumn").style.opacity = 1
	}
}

let gameLoading = function(){
	mainLoad()

	baseLoad()

	Close('tooltip')
	Close('datePage')

	getByID("countingMethodID", player.setting.countingMethod)

	booleanSetting('mouseSetting')
	booleanSetting('mouseSetting')
	let set = ['autoSave','mouseSetting']
	for(i in set){
		getByID(set[i]+'ID',player['setting'][set[i]] ? '开启' : '关闭')
	}

	gameLoad()
}