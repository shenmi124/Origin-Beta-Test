function getResourceTitleID(id,res_name){
	let Class = ''
	if(main['resource'][res_name]['Class']!=undefined){
		Class = main['resource'][res_name]['Class']()
	}
	getByID(id+'TitleID',`
		<div style="height:1px"></div>
		<tooltip onmouseenter='mouseLoad("`+res_name+`","TooltipLoadResource")' onmouseleave='document.getElementById("tooltip").style.display = "none";window.clearInterval(tooltipSel)' style="cursor: help;">
			<div class="resource-title resource-name `+Class+`" style="color: `+colorText(res_name)[0]+`; position: relative;">
			`+i18n('resource.'+res_name)+`
		</tooltip></div>
		<div class="resource-title border" id="`+res_name+`BorderID" style="background: `+colorText(res_name)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`
	)
}

function getResourceDoc(id){
	getNumberByID(id,player['resource'][id])
	if(main['resource'][id]['max']!=undefined){
		getNumberByID(id+'Max',main['resource'][id]['max']())
		document.getElementById(id+"slashID").style.display = ''
	}else{
		document.getElementById(id+"slashID").style.display = 'none'
	}
	if(main['resource'][id]['gain']!=undefined){
		if(!main['resource'][id]['gain']().eq(0)){
			if(main['resource'][id]['gain']().gt(0)){
				getByID(id+'GainID','(＋'+format(main['resource'][id]['gain']())+' /s)')
			}else{
				getByID(id+'GainID','(－'+format(n(main['resource'][id]['gain']()).abs())+' /s)')
			}
		}
	}
}

function getResourceID(res_name, id = res_name+'LoadResource'){
	getByID(id+'ID',`
		<div class="resource-title" id="`+res_name+`ID" style="width: 90px;"></div>
		<div class="resource-title" style="width: 0px;">
			<div class="resource-title" style="width: 0px; color: #888" id="`+res_name+`slashID">/</div>
		</div>
		<div class="resource-title" style="width: 90px;">
			<div class="resource-title" style="color: #888; width: 90px;" id="`+res_name+`MaxID"></div>
		</div>
		<div class="resource-title" style="width: 140px;">
			<div class="resource-title" id="`+res_name+`GainID" style="width: 140px;"></div>
		</div>
		`
	)
    if(main['resource'][res_name]['unlocked']!=undefined){
        let unlocked = main['resource'][res_name]['unlocked']()
		if(unlocked || unlocked==null){
			document.getElementById(id+"TitleID").style.display = ''
			document.getElementById(id+"ID").style.display = ''
			if(main['resource'][res_name]['newType']!=undefined){
				document.getElementById(res_name+"TypeID").style.display = ''
			}
			getByID(id+'BrID',`<br>`)
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
			if(main['resource'][res_name]['newType']!=undefined){
				document.getElementById(res_name+"TypeID").style.display = 'none'
			}
			getByID(id+'BrID',``)
			player['resource'][res_name+'Unlock'] = false
		}
    }else{
		document.getElementById(id+"TitleID").style.display = ''
		document.getElementById(id+"ID").style.display = ''
		getByID(id+'BrID',`<br>`)
		player['resource'][res_name+'Unlock'] = true
		player['resource'][res_name+'Unlocked'] = true
	}
	if(main['resource'][res_name]['max']!==undefined){
		let border = n(100).sub(player['resource'][res_name].div(main['resource'][res_name]['max']().max(0.01)).mul(100))
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
			let gain = main['resource'][id]['gain']()
			if(main['resource'][id]['unlocked']!==undefined){
				let unlocked = main['resource'][id]['unlocked']()
				if(unlocked || unlocked==null){
					player['resource'][id] = player['resource'][id].add(n(gain).mul(diff))
				}
			}else{
				player['resource'][id] = player['resource'][id].add(n(gain).mul(diff))
			}
		}
		if(main['resource'][id]['max']!==undefined){
			let max = main['resource'][id]['max']()
			player['resource'][id] = player['resource'][id].min(max).max(0)
		}
	}
}