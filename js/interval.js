let TICKWIDTH
let MID

function getBr(){
	let width = document.getElementById('game').offsetWidth-document.getElementById('leftColumn').offsetWidth-450-48
	if(width!==TICKWIDTH){
		MID = Math.floor(width/206)
		if(width<=618){
			MID = Math.floor((width+450)/206)
		}
		if(width<=618 && (TICKWIDTH==undefined || TICKWIDTH>618)){
			Open('loadRightColumn', 'block')
			Close('rightColumn')
			getByID('loadRightColumn', document.getElementById('rightColumn').innerHTML)
			getByID('rightColumn', '')
		}else if(width>=618 && (TICKWIDTH==undefined || TICKWIDTH<618)){
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
		if(!WORKSHOPBOUGHT){
			if(unlocked && !player['workshop'][i]){
				br += 1
			}
		}else{
			if(unlocked && player['workshop'][i]){
				br += 1
			}
		}
		if(br%MID===0 && br!==0){
			document.getElementById(i+'workshopBrID').style.display = ''
		}else{
			document.getElementById(i+'workshopBrID').style.display = 'none'
		}
	}
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

	statsDiff()
}

function dataDiff(){
	systemDiff()
	gameDiff()
	
	for(let i in main['action']){
		if(getActionCooldown(i)!==undefined){
			let activeSpeed = n(0)
			let autoSpeed = n(getActionAuto(i))
			if(hasActionClick(i)){
				let base = n(1)
				if(main['action'][i]['player']!==undefined){
					base = main['action'][i]['player']()
				}
				activeSpeed = activeSpeed.add(n(base).mul(getEfficient('action')))
			}
			let actionSpeed = activeSpeed.add(autoSpeed)
			if(!getActionCanClick(i)){
				actionSpeed = n(0)
				player['action'][i+'Cooldown'] = n(0)
			}

			player['action'][i+'Cooldown'] = player['action'][i+'Cooldown'].add(n(actionSpeed).mul(DIFF))

			if(player['action'][i+'Cooldown'].gte(getActionCooldown(i)) && getActionCanClick(i)){
				main['action'][i]['onClick']()
				player['action'][i+'Total'] = player['action'][i+'Total'].add(1)
				NumberFix()
				if(autoSpeed.gt(0)){
					player['action'][i+'Cooldown'] = player['action'][i+'Cooldown'].sub(getActionCooldown(i))
				}else{
					player['action'][i+'Cooldown'] = n(0)
				}
				player['action'][i+'Click'] = false
			}

			if((hasActionClick(i) || !getActionCanClick(i)) && !getActionCoerciveClick(i)){
				addedCss("action"+i+"ButtonID",'complete')
				document.getElementById("action"+i+"ButtonID").disabled = true
			}else{
				removeCss("action"+i+"ButtonID",'complete')
				document.getElementById("action"+i+"ButtonID").disabled = false
			}

			if(player.setting.action=='default'){
				document.getElementById("action"+i+"BorderID").style.transitionDuration = '0.2s'
			}else if(player.setting.action=='realtime'){
				document.getElementById("action"+i+"BorderID").style.transitionDuration = '0s'
			}else{
				document.getElementById("action"+i+"BorderID").style.transitionDuration = '0.05s'
			}
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
				let base = n(1)
				if(main['craft'][i]['player']!==undefined){
					base = main['craft'][i]['player']()
				}
				activeSpeed = activeSpeed.add(n(base).mul(getEfficient('action')))
			}
			let actionSpeed = activeSpeed.add(autoSpeed)
			if(!getCraftCanClick(i)){
				actionSpeed = n(0)
				player['craft'][i+'Cooldown'] = n(0)
			}

			player['craft'][i+'Cooldown'] = player['craft'][i+'Cooldown'].add(n(actionSpeed).mul(DIFF))

			if(player['craft'][i+'Cooldown'].gte(getCraftCooldown(i)) && getCraftCanClick(i)){
				main['craft'][i]['onClick']()
				player['craft'][i+'Total'] = player['craft'][i+'Total'].add(1)
				NumberFix()
				autoSpeed = n(getCraftAuto(i))
				if(autoSpeed.gt(0)){
					player['craft'][i+'Cooldown'] = player['craft'][i+'Cooldown'].sub(getCraftCooldown(i))
				}else{
					player['craft'][i+'Cooldown'] = n(0)
				}
				player['craft'][i+'Click'] = false
			}

			if((hasCraftClick(i) || !getCraftCanClick(i)) && !getCraftCoerciveClick(i)){
				addedCss("craft"+i+"ButtonID",'complete')
				document.getElementById("craft"+i+"ButtonID").disabled = true
			}else{
				removeCss("craft"+i+"ButtonID",'complete')
				document.getElementById("craft"+i+"ButtonID").disabled = false
			}

			if(player.setting.action=='default'){
				document.getElementById("craft"+i+"BorderID").style.transitionDuration = '0.2s'
			}else if(player.setting.action=='realtime'){
				document.getElementById("craft"+i+"BorderID").style.transitionDuration = '0s'
			}else{
				document.getElementById("craft"+i+"BorderID").style.transitionDuration = '0.05s'
			}
			let border = player.craft[i+'Cooldown'].div(n(getCraftCooldown(i)).max(0.001)).min(1).mul(100)
			if(player['craft'][i+'Cooldown'].lte(0)){border = 100}
			document.getElementById("craft"+i+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}

	for(let id in main['building']){
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

	for(let id in civics['workshop']){
		if(!WORKSHOPBOUGHT){
			let resCan = true
			let cappedCan = true
			removeCss(id+"WorkshopButtonID", 'bought')
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
		}else{
			addedCss(id+"WorkshopButtonID", 'bought')
			removeCss(id+"WorkshopButtonID", 'capped')
			removeCss(id+"WorkshopButtonID", 'res')
		}
	}
}

var RESOURCEUNLOCKEDTIMES = 0
function intervalID(){
	dataDiff()
	for(let i in mainButton){
		let unlocked = true
		if(mainButton[i]['unlocked']!==undefined){
			unlocked = mainButton[i]['unlocked']()
		}
		unlockedLoad(i+'MainTabID', unlocked)
		if(mainButton[i]['subTab']!==undefined){
			for(let is in mainButton[i]['subTab']){
				let subUnlocked = true
				if(mainButton[i]['subTab'][is]['unlocked']!==undefined){
					subUnlocked = mainButton[i]['subTab'][is]['unlocked']()
				}
				unlockedLoad(i+'_'+is+'SubMainTabID', subUnlocked)
			}
		}
	}

	RESOURCEUNLOCKEDTIMES = 0
	for(let i in resource['main']){
		resourceUpdate(i)
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
		unlockedLoad(i+'LoadCitizens', unlocked)
	}

	for(let i in civics['jobs']){
		let unlocked = true
		if(civics['jobs'][i]['unlocked']!==undefined){
			unlocked = civics['jobs'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCitizenJobs', unlocked && n(getUnemployedJobs(i)).gt(0))
	}

	for(let i in civics['workshop']){
		let unlocked = true
		let bought = !player['workshop'][i]
		if(civics['workshop'][i]['unlocked']!==undefined){
			unlocked = civics['workshop'][i]['unlocked']()
		}
		if(WORKSHOPBOUGHT){
			bought = !bought
		}
		unlockedLoad(i+'LoadWorkshop', unlocked && bought)
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
	
	for(let i in settings){
		if(settings[i]['effect']!==undefined){
			settings[i]['effect']()
		}
	}
	intervalID()
}, 50)