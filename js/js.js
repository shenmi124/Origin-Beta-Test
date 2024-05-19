let TICKWIDTH
let MID

function getBr(){
	let width = document.getElementById('game').offsetWidth-document.getElementById('leftColumn').offsetWidth-450-48
	if(width!==TICKWIDTH){
		MID = Math.floor(width/206)
		if(width<=412){
			MID = Math.floor((width+450)/206)
		}
		if(width<=412 && (TICKWIDTH==undefined || TICKWIDTH>412)){
			Open('loadRightColumn', 'block')
			Close('rightColumn')
			getByID('loadRightColumn', document.getElementById('rightColumn').innerHTML)
			getByID('rightColumn', '')
		}else if(width>=412 && (TICKWIDTH==undefined || TICKWIDTH<412)){
			Open('rightColumn')
			Close('loadRightColumn')
			getByID('rightColumn', document.getElementById('loadRightColumn').innerHTML)
			getByID('loadRightColumn', '')
		}
		TICKWIDTH = width
		document.getElementById('midColumn').style.width = MID*206+16 + 'px'
	}

	let u = false
	for(let maini in mainTab){
		let br = -1
		for(let i in main[maini]){
			let unlocked = true
			if(main[maini][i]['unlocked']!==undefined){
				unlocked = main[maini][i]['unlocked']()
			}
			if(unlocked){
				br += 1
				getByID(mainTab[maini]['id']()+"TextID",(u ? '<br><br>' : '')+mainTab[maini]['name']()+'<br>')
			}
			if(br%MID===0 && br!==0){
				document.getElementById(i+maini+'BrID').style.display = ''
			}else{
				document.getElementById(i+maini+'BrID').style.display = 'none'
			}
		}
		u = true
	}

	let br = -1
	for(let i in civics['workshop']){
		let unlocked = true
		if(civics['workshop'][i]['unlocked']!==undefined){
			unlocked = civics['workshop'][i]['unlocked']()
		}
		if(unlocked){
			br += 1
		}
		if(br%MID===0 && br!==0){
			document.getElementById(i+'workshopBrID').style.display = ''
		}else{
			document.getElementById(i+'workshopBrID').style.display = 'none'
		}
	}

	document.getElementById('loadMainResearch').style.height = window.innerHeight-100 + 'px'
}

function systemDiff(){
	for(let i in efficient){
		let color = ''
		if(n(getEfficient(i)).lt(1)){
			color = 'red'
		}
		getByID(i+'Efficient','<span style="color: '+color+'">'+formatScientific(n(getEfficient(i)).mul(100),1)+'%</span>')
		if(efficient[i]['unlocked']()){
			document.getElementById(i+'EfficientID').style.visibility = ''
		}else{
			document.getElementById(i+'EfficientID').style.visibility = 'hidden'
		}
	}
}

function dataDiff(){
	systemDiff()
	gameDiff()
	
	for(let i in main['action']){
		if(getActionCooldown(i)!==undefined){
			let autoSpeed = n(0)
			autoSpeed = autoSpeed.add(getActionAuto(i))
			if(hasActionClick(i)){
				autoSpeed = autoSpeed.add(getEfficient('action'))
			}
			if(!getActionCanClick(i)){
				autoSpeed = n(0)
				player['action'][i+'Cooldown'] = n(0)
			}

			player['action'][i+'Cooldown'] = player['action'][i+'Cooldown'].add(n(autoSpeed).mul(DIFF))

			if(player['action'][i+'Cooldown'].gte(getActionCooldown(i))){
				$(main['action'][i]['onClick'])
				player['action'][i+'Clicks'] = player['action'][i+'Clicks'].add(1)
				NumberFix()
				player['action'][i+'Cooldown'] = n(0)
				player['action'][i+'Click'] = false
			}

			if(hasActionClick(i) || !getActionCanClick(i)){
				addedCss("action"+i+"ButtonID",'complete')
				document.getElementById("action"+i+"ButtonID").disabled = true
			}else{
				removeCss("action"+i+"ButtonID",'complete')
				document.getElementById("action"+i+"ButtonID").disabled = false
			}

			document.getElementById("action"+i+"BorderID").style.transitionDuration = '0.2s'
			let border = player.action[i+'Cooldown'].div(n(getActionCooldown(i)).max(0.001)).min(1).mul(100)
			if(player['action'][i+'Cooldown'].lte(0)){border = 100}
			document.getElementById("action"+i+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}

	for(let i in main['craft']){
		if(getCraftCooldown(i)!==undefined){
			let autoSpeed = n(0)
			autoSpeed = autoSpeed.add(getCraftAuto(i))
			if(hasCraftClick(i)){
				autoSpeed = autoSpeed.add(getEfficient('action'))
			}
			if(!getCraftCanClick(i)){
				autoSpeed = n(0)
				player['craft'][i+'Cooldown'] = n(0)
			}

			player['craft'][i+'Cooldown'] = player['craft'][i+'Cooldown'].add(n(autoSpeed).mul(DIFF))

			if(player['craft'][i+'Cooldown'].gte(getCraftCooldown(i))){
				$(main['craft'][i]['onClick'])
				player['craft'][i+'Clicks'] = player['craft'][i+'Clicks'].add(1)
				NumberFix()
				player['craft'][i+'Cooldown'] = n(0)
				player['craft'][i+'Click'] = false
			}

			if(hasCraftClick(i) || !getCraftCanClick(i)){
				addedCss("craft"+i+"ButtonID",'complete')
				document.getElementById("craft"+i+"ButtonID").disabled = true
			}else{
				removeCss("craft"+i+"ButtonID",'complete')
				document.getElementById("craft"+i+"ButtonID").disabled = false
			}

			document.getElementById("craft"+i+"BorderID").style.transitionDuration = '0.2s'
			let border = player.craft[i+'Cooldown'].div(n(getCraftCooldown(i)).max(0.001)).min(1).mul(100)
			if(player['craft'][i+'Cooldown'].lte(0)){border = 100}
			document.getElementById("craft"+i+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}

	for(let id in main['building']){
		let resCan = true
		let cappedCan = true
		for(let i in main['building'][id]['cost']){
			let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
			if(n(main['resource'][i]['capped']!==undefined)){
				if(n(getResourceCapped(i)).lt(res)){
					addedCss(id+"BuildingButtonID",'capped')
					cappedCan = false
				}
			}
			if(n(player['resource'][i]).lt(res)){
				addedCss(id+"BuildingButtonID",'res')
				resCan = false
			}
		}
		if(cappedCan){
			removeCss(id+"BuildingButtonID",'capped')
		}
		if(resCan){
			removeCss(id+"BuildingButtonID",'res')
		}
	}

	for(let id in civics['workshop']){
		let resCan = true
		let cappedCan = true
		for(let i in civics['workshop'][id]['cost']){
			let res = n(civics['workshop'][id]['cost'][i]())
			if(n(main['resource'][i]['capped']!==undefined)){
				if(n(getResourceCapped(i)).lt(res)){
					addedCss(id+"WorkshopButtonID",'capped')
					cappedCan = false
				}
			}
			if(n(player['resource'][i]).lt(res)){
				addedCss(id+"WorkshopButtonID",'res')
				resCan = false
			}
		}
		if(cappedCan){
			removeCss(id+"WorkshopButtonID",'capped')
		}
		if(resCan){
			removeCss(id+"WorkshopButtonID",'res')
		}
	}

	if(player.research.conducted!==undefined && player.resource.researchPoints.gte(main['resource']['researchPoints']['capped']())){
		player.research[player.research.conducted] = player.research[player.research.conducted].add(1)
		if(player.research[player.research.conducted].gte(mainResearch['main'][player.research.conducted]['capped']())){
			player.canMainResearch[player.research.conducted] = false
			document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = 'rgb(174, 35, 252)'
		}else{
			player.canMainResearch[player.research.conducted] = false
			document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = ''
		}
		player.research.conducted = undefined
	}
	for(id in mainResearch['main']){
		let canResearch = true
		let cappedRsearch = true
		let research = Number(player['research'][id])
		for(i in mainResearch['main'][id]['cost'][research]){
			let res = mainResearch['main'][id]['cost'][research][i]()
			if(main['resource'][i]['capped']!==undefined){
				if(n(getResourceCapped(i)).lt(res)){
					cappedRsearch = false
				}
			}
			if(player['resource'][i].lt(res)){
				canResearch = false
			}
		}
		if(player['research'][id].lt(mainResearch['main'][id]['capped']()) && player.research.conducted!==id && player.canMainResearch[id]==false){
			if(cappedRsearch){
				removeCss(id+"MainResearchButtonID",'capped')
			}else{
				addedCss(id+"MainResearchButtonID",'capped')
			}
			if(canResearch){
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
		unlockedLoad(i+'MainTabID', unlocked)
	}

	for(let i in main['resource']){
		resourceCompute(i)
		getResourceID(i)
	}

	for(let i in main['action']){
		let unlocked = true
		if(main['action'][i]['unlocked']!==undefined){
			unlocked = main['action'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadAction', unlocked)
	}

	for(let i in main['building']){
		let unlocked = true
		if(main['building'][i]['unlocked']!==undefined){
			unlocked = main['building'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadBuilding', unlocked)
	}

	for(let i in main['craft']){
		let unlocked = true
		if(main['craft'][i]['unlocked']!==undefined){
			unlocked = main['craft'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCraft', unlocked)
	}

	for(let i in mainResearch['main']){
		let unlocked = true
		if(mainResearch['main'][i]['unlocked']!==undefined){
			unlocked = mainResearch['main'][i]['unlocked']()
		}else{
			player['research'][i+'Unlock'] = true
			player['research'][i+'Unlocked'] = true
		}
		unlockedLoad(i+'MainResearchDivID', unlocked, 'inline-grid')
		if(unlocked){
			player['research'][i+'Unlock'] = true
			if(player['research'][i+'Unlocked']==false){
				addLog('你对研究有了一些新的启发', '#888')
			}
			player['research'][i+'Unlocked'] = true
		}
	}

	for(let i in civics['citizens']){
		let unlocked = true
		if(civics['citizens'][i]['unlocked']!==undefined){
			unlocked = civics['citizens'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCitizensID', unlocked)
	}

	for(let i in civics['workshop']){
		let unlocked = true
		if(civics['workshop'][i]['unlocked']!==undefined){
			unlocked = civics['workshop'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadWorkshop', unlocked && !player['workshop'][i])
	}

	getBr()
}

setInterval(function(){
	T = new Date()
	var OFFLINETIMEGAIN = n((Number(OFFLINETIME.getTime())-player.data.offline)/1000)
	player.data.offline = n((Number(T.getTime())))
	DIFF = n(Math.min((Number(T.getTime())-TIMESTART)/1000,1e100))
	var OFFLINEBOOST = n(1).mul(player.data.devSpeed)
	DIFF=DIFF.mul(OFFLINEBOOST)
	TIMESTART=T.getTime()
	
	getID()
}, 50)