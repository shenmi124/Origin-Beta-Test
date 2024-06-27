function getResourceTitleID(id,res_name){
	let Class = ''
	if(resource['main'][res_name]['Class']!==undefined){
		Class = resource['main'][res_name]['Class']()
	}
	getByID(id+'TitleID', `
		<tooltip `+loadTooltip(res_name, 'LoadTooltipResource', null)+` style="cursor: help;">
			<div class="resourceTitle resourceName `+Class+`" style="color: `+colorText(res_name)[0]+`; position: relative;">
			`+i18n(resource['main'][res_name]['name']())+`
		</tooltip></div>`
	)
	getByID(id+'BorderID', `<div class="resourceBorder" id="`+res_name+`BorderID" style="background: `+colorText(res_name)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`)
}

function getResourceDoc(id){
	getNumberByID(id, player['resource'][id])
	if(resource['main'][id]['capped']!==undefined){
		getNumberByID(id+'Capped',getResourceCapped(id))
		document.getElementById(id+"slashID").style.display = ''
	}else{
		document.getElementById(id+"slashID").style.display = 'none'
	}
	if(resource['main'][id]['gain']!==undefined){
		if(!getResourceGain(id).eq(0)){
			if(getResourceGain(id).gt(0)){
				getByID(id+'GainID','(+ '+format(getResourceGain(id))+' /s)')
			}else{
				getByID(id+'GainID','(- '+format(n(getResourceGain(id)).abs())+' /s)')
			}
		}
	}
}

function getResourceID(res){
	getByID(res+'LoadResourceID',`
		<div class="resourceTitle" id="`+res+`ID" style="width: 90px;"></div>
		<div class="resourceTitle" style="width: 12px;">
			<div class="resourceTitle" style="width: 12px; color: #888" id="`+res+`slashID">/</div>
		</div>
		<div class="resourceTitle" style="width: 90px;">
			<div class="resourceTitle" style="color: #888; width: 90px;" id="`+res+`CappedID"></div>
		</div>
		<div class="resourceTitle" style="width: 130px;">
			<div class="resourceTitle" id="`+res+`GainID" style="width: 140px;"></div>
		</div>
		`
	)
    if(resource['main'][res]['unlocked']!==undefined){
        let unlocked = false
		if(resource['main'][res]['unlocked']!==undefined){
			unlocked = resource['main'][res]['unlocked']()
		}
		if(unlocked){
			document.getElementById(res+"LoadResourceTitleID").style.display = ''
			document.getElementById(res+"LoadResourceID").style.display = ''
			document.getElementById(res+"BorderID").style.display = ''
			if(resource['main'][res]['newType']!==undefined){
				document.getElementById(res+"TypeID").style.display = ''
			}
			if(unlocked && player['resource'][res+'Unlocked']==false){
				if(resource['main'][res]['unlockAction']!==undefined){
					resource['main'][res]['unlockAction']()
				}
			}
			player['resource'][res+'Unlocked'] = true
		}else{
			document.getElementById(res+"LoadResourceTitleID").style.display = 'none'
			document.getElementById(res+"LoadResourceID").style.display = 'none'
			document.getElementById(res+"BorderID").style.display = 'none'
			if(resource['main'][res]['newType']!==undefined){
				document.getElementById(res+"TypeID").style.display = 'none'
			}
		}
    }else{
		document.getElementById(res+"LoadResourceTitleID").style.display = ''
		document.getElementById(res+"LoadResourceID").style.display = ''
		player['resource'][res+'Unlocked'] = true
	}
	if(resource['main'][res]['capped']!==undefined){
		let border = n(100).sub(player['resource'][res].div(n(getResourceCapped(res)).max(0.01)).mul(100))
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}
	getResourceDoc(res)
}

function resourceCompute(id){
	if(resource['main'][id]['number']!==undefined){
		player['resource'][id] = n(resource['main'][id]['number']())
	}else{
		if(!n(getResourceGain(id)).eq(-1)){
			let unlocked = true
			if(resource['main'][id]['unlocked']!==undefined){
				unlocked = resource['main'][id]['unlocked']()
			}
			if(unlocked){
				let gain = getResourceGain(id)
				gain = n(gain).mul(DIFF)
				if(gain.gte(0)){
					if(!n(getResourceCapped(id)).eq(-1)){
						gain = gain.min(n(getResourceCapped(id)).sub(player['resource'][id])).max()
					}
					player['resource'][id] = player['resource'][id].add(gain)
					player['resource'][id+'Total'] = player['resource'][id+'Total'].add(gain)
				}else{
					player['resource'][id] = player['resource'][id].add(gain).max(0)
				}
			}
		}
	}
	player['resource'][id+'Best'] = player['resource'][id+'Best'].max(player['resource'][id])
}