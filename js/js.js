var t=new Date()
var timestart=new Date()
var offlineTime=new Date()
var diff=0

function getBr(){
	let log = Math.min(window.innerWidth-(document.getElementById("leftColumn").offsetWidth+(206*3)+36), 500)
	let width = window.innerWidth-(document.getElementById("leftColumn").offsetWidth+log+36)

	document.body.style.setProperty('--logWidth', log);
	document.body.style.setProperty('--midWidth', width);
	let w = Math.floor(width/206)

	let actionBr = -1
	for(let i in main['action']){
		let unlocked = true
		if(main['action'][i]['unlocked']!=undefined){
			unlocked = main['action'][i]['unlocked']()
		}
		if(unlocked){
			actionBr += 1
			getByID(mainTab['action']['id']()+"TextID",mainTab['action']['name']()+'<br>')
		}
		if(actionBr%w === 0 && actionBr!=0){
			document.getElementById(i+'LoadActionBrID').style.display = ''
		}else{
			document.getElementById(i+'LoadActionBrID').style.display = 'none'
		}
	}

	let buildingBr = -1
	for(let i in main['building']){
		let unlocked = true
		if(main['building'][i]['unlocked']!=undefined){
			unlocked = main['building'][i]['unlocked']()
		}
		if(unlocked){
			buildingBr += 1
			getByID(mainTab['building']['id']()+"TextID",mainTab['building']['name']()+'<br>')
		}
		if(buildingBr%w === 0 && buildingBr!=0){
			document.getElementById(i+'LoadBuildingBrID').style.display = ''
		}else{
			document.getElementById(i+'LoadBuildingBrID').style.display = 'none'
		}
	}
	
	document.getElementById('loadMainResearch').style.height = window.innerHeight-100 + 'px'
}

function dataDiff(){
	gameDiff()

	if(player.research.conducted!=undefined && player.resource.researchPoints.gte(main['resource']['researchPoints']['max']())){
		player.research[player.research.conducted] = player.research[player.research.conducted].add(1)
		if(player.research[player.research.conducted].gte(mainResearch['main'][player.research.conducted]['max']())){
			player.canMainResearch[player.research.conducted] = false
			document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = 'rgb(174, 35, 252)'
		}else{
			player.canMainResearch[player.research.conducted] = false
			document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = ''
		}
		player.research.conducted = undefined
	}

	for(id in mainResearch['main']){
		let canresearch = true
		let research = Number(player['research'][id])
		for(i in mainResearch['main'][id]['cost'][research]){
			let res = mainResearch['main'][id]['cost'][research][i]()
			if(n(player['resource'][i]).lt(res)){
				canresearch = false
			}
		}
		if(player['research'][id].lt(mainResearch['main'][id]['max']()) && player.research.conducted!==id && player.canMainResearch[id]==false){
			if(canresearch){
				document.getElementById(id+"MainResearchButtonID").style.borderColor = 'rgb(41, 192, 84)'
			}else{
				document.getElementById(id+"MainResearchButtonID").style.borderColor = ''
				if(player['research'][id].gte(1)){
					document.getElementById(id+"MainResearchButtonID").style.borderColor = 'rgb(246, 170, 255)'
				}
			}
		}
	}
}

function getID(){
	dataDiff()
	for(let i in mainButton){
		let unlocked = true
		if(mainButton[i]['unlocked']!==undefined){
			unlocked = mainButton[i]['unlocked']()
		}
		unlockedLoad(i+'MainTabID',unlocked)
	}

	for(let i in main['resource']){
		getResourceID(i)
		resourceAction(i)
	}

	for(let i in main['action']){
		let unlocked = true
		if(main['action'][i]['unlocked']!==undefined){
			unlocked = main['action'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadAction',unlocked)
	}

	for(let i in main['building']){
		let unlocked = true
		if(main['building'][i]['unlocked']!==undefined){
			unlocked = main['building'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadBuilding',unlocked)
	}

	for(let i in mainResearch['main']){
		let unlocked = true
		if(mainResearch['main'][i]['unlocked']!==undefined){
			unlocked = mainResearch['main'][i]['unlocked']()
		}else{
			player['research'][i+'Unlock'] = true
			player['research'][i+'Unlocked'] = true
		}
		unlockedLoad(i+'MainResearchDivID',unlocked,'inline-grid')
		if(unlocked){
			player['research'][i+'Unlock'] = true
			if(player['research'][i+'Unlocked']==false){
				addLog('你对研究有了一些新的启发','#888')
			}
			player['research'][i+'Unlocked'] = true
		}
	}

	getBr()
}

setInterval(function(){
	t = new Date()
	offlineTimeGain = n((Number(offlineTime.getTime())-player.data.offline)/1000)
	player.data.offline = n((Number(t.getTime())))
	diff = n(Math.min((Number(t.getTime())-timestart)/1000,1e100))
	var offlineBoost = n(1).mul(player.data.devSpeed)
	diff=diff.mul(offlineBoost)
	timestart=t.getTime()
	
	if(player.setting.autoSave==true){
		save('Origin_Research')
	}
	getID()
}, 50)

setInterval(function(){
	if(player.setting.autoSave==true){
		save('Origin_Research')
	}
}, 60000)