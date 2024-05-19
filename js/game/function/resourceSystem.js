function getResourceTitleID(id,res_name){
	let Class = ''
	if(main['resource'][res_name]['Class']!==undefined){
		Class = main['resource'][res_name]['Class']()
	}
	getByID(id+'TitleID',`
		<tooltip `+loadTooltip(res_name, 'LoadTooltipResource')+` style="cursor: help;">
			<div class="resourceTitle resourceName `+Class+`" style="color: `+colorText(res_name)[0]+`; position: relative;">
			`+i18n(main['resource'][res_name]['name']())+`
		</tooltip></div>`
	)
	getByID(id+'BorderID',`<div class="resourceBorder" id="`+res_name+`BorderID" style="background: `+colorText(res_name)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`)
}

function getResourceDoc(id){
	getNumberByID(id,player['resource'][id])
	if(main['resource'][id]['capped']!==undefined){
		getNumberByID(id+'Capped',getResourceCapped(id))
		document.getElementById(id+"slashID").style.display = ''
	}else{
		document.getElementById(id+"slashID").style.display = 'none'
	}
	if(main['resource'][id]['gain']!==undefined){
		if(!getResourceGain(id).eq(0)){
			if(getResourceGain(id).gt(0)){
				getByID(id+'GainID','(+ '+format(getResourceGain(id))+' /s)')
			}else{
				getByID(id+'GainID','(- '+format(n(getResourceGain(id)).abs())+' /s)')
			}
		}
	}
}

function getResourceID(res_name, id=res_name+'LoadResource'){
	getByID(id+'ID',`
		<div class="resourceTitle" id="`+res_name+`ID" style="width: 90px;"></div>
		<div class="resourceTitle" style="width: 12px;">
			<div class="resourceTitle" style="width: 12px; color: #888" id="`+res_name+`slashID">/</div>
		</div>
		<div class="resourceTitle" style="width: 90px;">
			<div class="resourceTitle" style="color: #888; width: 90px;" id="`+res_name+`CappedID"></div>
		</div>
		<div class="resourceTitle" style="width: 130px;">
			<div class="resourceTitle" id="`+res_name+`GainID" style="width: 140px;"></div>
		</div>
		`
	)
    if(main['resource'][res_name]['unlocked']!==undefined){
        let unlocked = main['resource'][res_name]['unlocked']()
		if(unlocked || unlocked==null){
			document.getElementById(id+"TitleID").style.display = ''
			document.getElementById(id+"ID").style.display = ''
			document.getElementById(res_name+"BorderID").style.display = ''
			if(main['resource'][res_name]['newType']!==undefined){
				document.getElementById(res_name+"TypeID").style.display = ''
			}
			player['resource'][res_name+'Unlock'] = true
			if(unlocked && player['resource'][res_name+'Unlocked']==false){
				if(main['resource'][res_name]['unlockAction']!==undefined){
					$(main['resource'][res_name]['unlockAction'])
				}
			}
			player['resource'][res_name+'Unlocked'] = true
		}else{
			document.getElementById(id+"TitleID").style.display = 'none'
			document.getElementById(id+"ID").style.display = 'none'
			document.getElementById(res_name+"BorderID").style.display = 'none'
			if(main['resource'][res_name]['newType']!==undefined){
				document.getElementById(res_name+"TypeID").style.display = 'none'
			}
			player['resource'][res_name+'Unlock'] = false
		}
    }else{
		document.getElementById(id+"TitleID").style.display = ''
		document.getElementById(id+"ID").style.display = ''
		player['resource'][res_name+'Unlock'] = true
		player['resource'][res_name+'Unlocked'] = true
	}
	if(main['resource'][res_name]['capped']!==undefined){
		let border = n(100).sub(player['resource'][res_name].div(n(getResourceCapped(res_name)).max(0.01)).mul(100))
		document.getElementById(res_name+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		document.getElementById(res_name+"BorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}
	getResourceDoc(res_name)
}

function resourceCompute(id){
	if(main['resource'][id]['number']!==undefined){
		player['resource'][id] = n(main['resource'][id]['number']())
	}else{
		if(main['resource'][id]['gain']!==undefined){
			let gain = getResourceGain(id)
			if(main['resource'][id]['unlocked']!==undefined){
				let unlocked = main['resource'][id]['unlocked']()
				if(unlocked || unlocked==null){
					player['resource'][id] = player['resource'][id].add(n(gain).mul(DIFF))
				}
			}else{
				player['resource'][id] = player['resource'][id].add(n(gain).mul(DIFF))
			}
		}
		if(main['resource'][id]['capped']!==undefined){
			player['resource'][id] = player['resource'][id].min(getResourceCapped(id)).max(0)
		}
	}
}