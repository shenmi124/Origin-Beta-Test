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
		if(unlocked && !player['workshop'][i]){
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
			let activeSpeed = n(0)
			let autoSpeed = n(getActionAuto(i))
			if(hasActionClick(i)){
				activeSpeed = activeSpeed.add(getEfficient('action'))
			}
			let actionSpeed = activeSpeed.add(autoSpeed)
			if(!getActionCanClick(i)){
				actionSpeed = n(0)
				player['action'][i+'Cooldown'] = n(0)
			}

			player['action'][i+'Cooldown'] = player['action'][i+'Cooldown'].add(n(actionSpeed).mul(DIFF))

			if(player['action'][i+'Cooldown'].gte(getActionCooldown(i)) && getActionCanClick(i)){
				main['action'][i]['onClick']()
				player['action'][i+'Clicks'] = player['action'][i+'Clicks'].add(1)
				NumberFix()
				if(autoSpeed.gt(0)){
					player['action'][i+'Cooldown'] = player['action'][i+'Cooldown'].sub(getActionCooldown(i))
				}else{
					player['action'][i+'Cooldown'] = n(0)
				}
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
			let activeSpeed = n(0)
			let autoSpeed = n(getCraftAuto(i))
			if(hasCraftClick(i)){
				activeSpeed = activeSpeed.add(getEfficient('action'))
			}
			let actionSpeed = activeSpeed.add(autoSpeed)
			if(!getCraftCanClick(i)){
				actionSpeed = n(0)
				player['craft'][i+'Cooldown'] = n(0)
			}

			player['craft'][i+'Cooldown'] = player['craft'][i+'Cooldown'].add(n(actionSpeed).mul(DIFF))

			if(player['craft'][i+'Cooldown'].gte(getCraftCooldown(i)) && getCraftCanClick(i)){
				main['craft'][i]['onClick']()
				player['craft'][i+'Clicks'] = player['craft'][i+'Clicks'].add(1)
				NumberFix()
				if(autoSpeed.gt(0)){
					player['craft'][i+'Cooldown'] = player['craft'][i+'Cooldown'].sub(getCraftCooldown(i))
				}else{
					player['craft'][i+'Cooldown'] = n(0)
				}
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
			if(main['resource'][i]['capped']!==undefined){
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
			if(main['resource'][i]['capped']!==undefined){
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