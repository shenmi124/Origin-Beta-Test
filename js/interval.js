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
	for(let maini in MainActionData){
		let br = -1
		for(let i in MAIN[maini]){
			let unlocked = true
			if(MAIN[maini][i]['unlocked']!==undefined){
				unlocked = MAIN[maini][i]['unlocked']()
			}
			if(unlocked){
				br += 1
				getByID(MainActionData[maini]['id']()+"TextID",(u ? '<br><br>' : '')+MainActionData[maini]['name']()+'<br>')
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
	for(let i in CIVICS['workshop']){
		let unlocked = true
		if(CIVICS['workshop'][i]['unlocked']!==undefined){
			unlocked = CIVICS['workshop'][i]['unlocked']()
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
	
	for(let i in MAIN['action']){
		if(getActionCooldown(i)!==undefined){
			let activeSpeed = n(0)
			let autoSpeed = n(getActionAuto(i))
			if(hasActionClick(i)){
				let base = n(1)
				if(MAIN['action'][i]['player']!==undefined){
					base = MAIN['action'][i]['player']()
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
				MAIN['action'][i]['onClick']()
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

	for(let i in MAIN['craft']){
		if(getCraftCooldown(i)!==undefined){
			let activeSpeed = n(0)
			let autoSpeed = n(getCraftAuto(i))
			if(hasCraftClick(i)){
				let base = n(1)
				if(MAIN['craft'][i]['player']!==undefined){
					base = MAIN['craft'][i]['player']()
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
				MAIN['craft'][i]['onClick']()
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

	for(let id in MAIN['building']){
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

	for(let id in CIVICS['workshop']){
		if(!WORKSHOPBOUGHT){
			let resCan = true
			let cappedCan = true
			removeCss(id+"WorkshopButtonID", 'bought')
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
	for(let i in TABBUTTON){
		let unlocked = true
		if(TABBUTTON[i]['unlocked']!==undefined){
			unlocked = TABBUTTON[i]['unlocked']()
		}
		unlockedLoad(i+'TabButton', unlocked)
		if(TABBUTTON[i]['subtab']!==undefined){
			let allSubUnlocked = false
			for(let is in TABBUTTON[i]['subtab']){
				let subUnlocked = true
				if(TABBUTTON[i]['subtab'][is]['unlocked']!==undefined){
					subUnlocked = TABBUTTON[i]['subtab'][is]['unlocked']()
				}
				allSubUnlocked = allSubUnlocked || subUnlocked
				unlockedLoad(is+'SubtabID', subUnlocked)
			}
			if(!allSubUnlocked){
				unlockedLoad(i+'SubtabBr', false)
				unlockedLoad(i+'SubtabTop', false)
			}
		}
	}

	RESOURCEUNLOCKEDTIMES = 0
	for(let i in RESOURCE['main']){
		resourceUpdate(i)
		getResourceID(i)
	}

	for(let i in MAIN['action']){
		let unlocked = true
		if(MAIN['action'][i]['unlocked']!==undefined){
			unlocked = MAIN['action'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadAction', unlocked)
	}

	for(let i in MAIN['building']){
		let unlocked = true
		if(MAIN['building'][i]['unlocked']!==undefined){
			unlocked = MAIN['building'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadBuilding', unlocked)
	}

	for(let i in MAIN['craft']){
		let unlocked = true
		if(MAIN['craft'][i]['unlocked']!==undefined){
			unlocked = MAIN['craft'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCraft', unlocked)
	}

	for(let i in CIVICS['citizens']){
		let unlocked = true
		if(CIVICS['citizens'][i]['unlocked']!==undefined){
			unlocked = CIVICS['citizens'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCitizens', unlocked)
	}

	for(let i in CIVICS['jobs']){
		let unlocked = true
		if(CIVICS['jobs'][i]['unlocked']!==undefined){
			unlocked = CIVICS['jobs'][i]['unlocked']()
		}
		unlockedLoad(i+'LoadCitizenJobs', unlocked && n(getUnemployedJobs(i)).gt(0))
	}

	for(let i in CIVICS['workshop']){
		let unlocked = true
		let preliminary = true
		let bought = !player['workshop'][i]
		if(CIVICS['workshop'][i]['unlocked']!==undefined){
			unlocked = CIVICS['workshop'][i]['unlocked']()
		}
		if(CIVICS['workshop'][i]['preliminary']!==undefined){
			for(let ip in CIVICS['workshop'][i]['preliminary']()){
				preliminary = preliminary && player.workshop[CIVICS['workshop'][i]['preliminary']()[ip]]
			}
		}
		if(WORKSHOPBOUGHT){
			bought = !bought
			unlocked = true
			preliminary = true
		}
		unlockedLoad(i+'LoadWorkshop', unlocked && preliminary && bought)
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