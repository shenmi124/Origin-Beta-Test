var TOOLTIPSEL

function loadTooltip(id,id2,onClick=`onclick='document.getElementById("tooltip").style.display="none"`,Class=``){
	return `class="`+Class+`" onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display="none";window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`+onClick+`;window.clearInterval(TOOLTIPSEL);TOOLTIPSEL=undefined'`
}

function mouseLoad(id,id2){
	document.getElementById("tooltip").style.display = ''
	tooltip(id,id2)
	if(TOOLTIPSEL==undefined){
		TOOLTIPSEL = self.setInterval(function(){
			tooltip(id, id2)
		},50)
	}
}

function tooltipGain(boolean,name,base,mul,gainAll,id,type,self){
	gainAll = formatScientific(gainAll, 8)
	if(n(format(gainAll)).eq(format(getResourceGain(id)))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	let revised = ''
	if(type=='building'){
		if(player['building'][self+'Allocation']!==undefined){
			if(!player['building'][self].eq(player['building'][self+'Allocation'])){
				revised = `<grey> | `+formatWhole(player['building'][self])+`</grey>`
			}
		}
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <mul>×</mul> `+formatWhole(mul)+revised+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">- `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <mul>×</mul> `+formatWhole(mul)+revised+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipDirectlyGain(boolean,name,amount,gainAll,id){
	gainAll = formatScientific(gainAll, 8)
	if(n(format(gainAll)).eq(format(getResourceGain(id)))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(amount)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">- `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(amount)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipGainMul(boolean,name,base,mul,gainAll,id){
	gainAll = formatScientific(gainAll, 8)
	if(n(format(gainAll)).eq(format(getResourceGain(id)))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green><mul>×</mul></green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <mul>×</mul> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <mul>×</mul> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipDirectlyGainMul(boolean,name,amount,gainAll,id){
	gainAll = formatScientific(gainAll, 8)
	if(n(format(gainAll)).eq(format(getResourceGain(id)))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><mul><green>×</green></mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(amount)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(amount)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipGainPow(boolean,name,base,pow,gainAll,id){
	gainAll = formatScientific(gainAll, 8)
	if(n(format(gainAll)).eq(format(getResourceGain(id)))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green><mul>×</mul></green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <mul>^</mul> `+formatWhole(pow)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <mul>^</mul> `+formatWhole(pow)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipCapped(name,base,mul,cappedAll,id){
	cappedAll = formatScientific(cappedAll, 8)
	if(n(format(cappedAll)).eq(format(getResourceCapped(id)))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+` <mul>×</mul> `+formatWhole(mul)+`</div>`+cappedAll+`
	</span></left>`
}

function tooltipDirectlyCapped(name,base,cappedAll,id){
	cappedAll = formatScientific(cappedAll, 8)
	if(n(format(cappedAll)).eq(format(getResourceCapped(id)))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+`</div>`+cappedAll+`
	</span></left>`
}

function tooltipDirectlyCappedMul(boolean,name,amount,cappedAll,id){
	cappedAll = formatScientific(cappedAll, 8)
	if(n(format(cappedAll)).eq(format(getResourceCapped(id)))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><mul><green>×</green></mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(amount)+`</div>`+cappedAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(amount)+`</div>`+cappedAll+`
		</span></left>`
	}
}

function tooltipCappedPow(name,base,pow,cappedAll,id){
	cappedAll = formatScientific(cappedAll, 8)
	if(n(format(cappedAll)).eq(format(getResourceCapped(id)))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green><mul>×</mul></green> `+name+`</div>
		<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(base)+` <mul>^</mul> `+formatWhole(pow)+`</div>`+cappedAll+`
	</span></left>`
}


function tooltip(id,id2){
	if(id2=='LoadTooltipResource'){
		let tool = ''
		if(RESOURCE['main'][id]['tooltip']!=undefined){
			tool = '<hr>'+RESOURCE['main'][id]['tooltip']()
		}

		let effect = ''
		if(RESOURCE['main'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let iga in RESOURCE['main'][id]['effect']['gain']['add']){
				if(n(iga).gt(0)){
					effect += effectText(colorText(iga)[1], '+', getResourceEffectGainBase(id, iga), '/s', player['resource'][id])
				}else{
					effect += effectText(colorText(iga)[1], '', getResourceEffectGainBase(id, iga), '/s', player['resource'][id], 'red')
				}
			}
		}
		if(RESOURCE['main'][id]['effect']?.['capped']?.['add']!==undefined){
			for(let ica in RESOURCE['main'][id]['effect']['capped']['add']){
				if(n(ica).gt(0)){
					effect += effectText(colorText(ica)[1]+'上限', '+', RESOURCE['main'][id]['effect']['capped']['add'][ica](), '', player['resource'][id])
				}else{
					effect += effectText(colorText(ica)[1]+'上限', '', RESOURCE['main'][id]['effect']['capped']['add'][ica](), '', player['resource'][id], 'red')
				}
			}
		}
		if(RESOURCE['main'][id]['effect']?.['capped']?.['mul']!==undefined){
			for(let icm in RESOURCE['main'][id]['effect']['capped']['mul']){
				if(n(icm).gt(0)){
					effect += effectText(colorText(icm)[1]+'上限', '<mul>×</mul>', RESOURCE['main'][id]['effect']['capped']['mul'][icm](), '', player['resource'][id], null, true, 'mul')
				}else{
					effect += effectText(colorText(icm)[1]+'上限', '<mul>×</mul>', RESOURCE['main'][id]['effect']['capped']['mul'][icm](), '', player['resource'][id], 'red')
				}
			}
		}
		if(RESOURCE['main'][id]['effect']?.['other']!==undefined){
			for(let ie in RESOURCE['main'][id]['effect']['other']){
				effect += effectText(RESOURCE['main'][id]['effect']['other'][ie]['name'](),RESOURCE['main'][id]['effect']['other'][ie]['display']()[0], RESOURCE['main'][id]['effect']['other'][ie]['effect'](), RESOURCE['main'][id]['effect']['other'][ie]['display']()[1], player['resource'][id], null, true)
			}
		}
		if(effect!==''){
			effect = `<hr><a style='font-size: 14px'>影响</a>` + effect
		}

		let gain = ''
		let time = ''
		let gainAll = n(0)
		if(RESOURCE['main'][id]['gain']!==undefined){
			gainAll = gainAll.add(RESOURCE['main'][id]['gain']())
			if(!gainAll.eq(0)){
				let gainName = '基础'
				let gainBase = RESOURCE['main'][id]['gain']()
				if(RESOURCE['main'][id]['gainTooltip']!==undefined){
					gainName = RESOURCE['main'][id]['gainTooltip']()
				}
				gain += tooltipDirectlyGain(n(gainBase).gte(0), gainName, gainBase, gainAll, id)
			}
			for(let i in RESOURCE['main']){
				if(RESOURCE['main'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in RESOURCE['main'][i]['effect']['gain']['add']){
						let gainName = '资源: '+RESOURCE['main'][i]['name']()
						let gainBase = getResourceEffectGainBase(i, ig)
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
				if(RESOURCE['main'][i]['effect']?.['gain']?.['mul']!==undefined){
					for(let ig in RESOURCE['main'][i]['effect']['gain']['mul']){
						let gainName = '资源: '+RESOURCE['main'][i]['name']()
						let gainBase = RESOURCE['main'][i]['effect']['gain']['mul'][ig]()
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).pow(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).pow(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}
			for(let i in MAIN['building']){
				if(MAIN['building'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in MAIN['building'][i]['effect']['gain']['add']){
						let gainName = '建筑: '+MAIN['building'][i]['name']()
						let gainBase = getBuildGainBase(i, ig)
						let gainMul = player['building'][i+'Allocation'] ?? player['building'][i]
						if(id==ig && !n(getBuildGain(i, ig)).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id, 'building', i)
						}
					}
				}
			}
			for(let i in CIVICS['citizens']){
				if(CIVICS['citizens'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in CIVICS['citizens'][i]['effect']['gain']['add']){
						let gainName = '村民: '+CIVICS['citizens'][i]['name']()
						let gainBase = nc(getCitizensGainBase(i, ig))
						let gainMul = player.citizens[i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}


			if(RESOURCE['main'][id]['mul']!==undefined){
				let gainName = '倍率'
				let gainBase = RESOURCE['main'][id]['mul']()
				if(gainBase.neq(1)){
					if(RESOURCE['main'][id]['mulTooltip']!==undefined){
						gainName = RESOURCE['main'][id]['mulTooltip']()
					}
					gainAll = gainAll.mul(RESOURCE['main'][id]['mul']())
					gain += tooltipDirectlyGainMul(n(gainBase).gt(1), gainName, gainBase, gainAll, id)
				}
			}
			for(let i in RESOURCE['main']){
				if(RESOURCE['main'][i]['effect']?.['gain']?.['mul']!==undefined){
					for(let ig in RESOURCE['main'][i]['effect']['gain']['mul']){
						let gainName = RESOURCE['main'][i]['name']()
						let gainBase = RESOURCE['main'][i]['effect']['gain']['mul'][ig]()
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(1)){
							gainAll = gainAll.mul(n(gainBase).mul(gainMul))
							gain += tooltipGainMul(n(gainBase).mul(gainMul).gt(1), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}


			for(let i in CIVICS['workshop']){
				if(player['workshop'][i]){
					if(CIVICS['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in CIVICS['workshop'][i]['effect']['resource']){
							if(CIVICS['workshop'][i]['effect']['resource'][iw]['gain']?.['mul']!==undefined){
								let gainName = '工坊: '+CIVICS['workshop'][i]['name']()
								let gainBase = CIVICS['workshop'][i]['effect']['resource'][iw]['gain']['mul']()
								if(id==iw && !n(gainBase).eq(1)){
									gainAll = gainAll.mul(gainBase)
									gain += tooltipDirectlyGainMul(n(gainBase).gt(1), gainName, gainBase, gainAll, id)
								}
							}
						}
					}
				}
			}

			gainAll = formatScientific(gainAll, 8)
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + gain
			if(n(gainAll).eq(0)){
				gain = ''
			}
			if(RESOURCE['main'][id]['capped']!==undefined){
				if(player['resource'][id].gte(getResourceCapped(id))){
					time = '<hr>已抵达上限'
				}else if(RESOURCE['main'][id]['gain']!==undefined){
					if(n(getResourceGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceCapped(id)).sub(player['resource'][id]).div(getResourceGain(id)))+'后抵达上限'
					}else if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
					}
				}
			}else if(RESOURCE['main'][id]['gain']!==undefined){
				if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
				time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
				}
			}
		}

		let capped = ''
		let cappedAll = n(0)
		if(RESOURCE['main'][id]['capped']!==undefined){
			cappedAll = cappedAll.add(RESOURCE['main'][id]['capped']())
			if(!cappedAll.eq(0)){
				let cappedName = '基础'
				let cappedBase = RESOURCE['main'][id]['capped']()
				if(RESOURCE['main'][id]['cappedTooltip']!==undefined){
					cappedName = RESOURCE['main'][id]['cappedTooltip']()
				}
				capped += tooltipDirectlyCapped(cappedName, cappedBase, cappedAll, id)
			}
			for(let i in RESOURCE['main']){
				if(RESOURCE['main'][i]['effect']?.['capped']?.['add']!==undefined){
					for(let im in RESOURCE['main'][i]['effect']['capped']['add']){
						let cappedName = '资源: '+RESOURCE['main'][i]['name']()
						let cappedBase = RESOURCE['main'][i]['effect']['capped']['add'][im]()
						let cappedMul = player['resource'][i]
						if(id==im && !n(cappedBase).mul(cappedMul).eq(0)){
							cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
							capped += tooltipCapped(cappedName, cappedBase, cappedMul, cappedAll, id)
						}
					}
				}
			}
			for(let i in MAIN['building']){
				if(MAIN['building'][i]['effect']?.['capped']?.['add']!==undefined){
					for(let ib in MAIN['building'][i]['effect']['capped']['add']){
						let cappedName = '建筑: '+MAIN['building'][i]['name']()
						let cappedBase = getBuildCappedBase(i, ib)
						let cappedMul = player['building'][i+'Allocation'] ?? player['building'][i]
						if(id==ib && !n(cappedBase).mul(cappedMul).eq(0)){
							cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
							capped += tooltipCapped(cappedName, cappedBase, cappedMul, cappedAll, id, 'building', i)
						}
					}
				}
			}
			for(let i in CIVICS['workshop']){
				if(player['workshop'][i]){
					if(CIVICS['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in CIVICS['workshop'][i]['effect']['resource']){
							if(CIVICS['workshop'][i]['effect']['resource'][iw]['capped']?.['add']!==undefined){
								let gainName = '工坊: '+CIVICS['workshop'][i]['name']()
								let gainBase = CIVICS['workshop'][i]['effect']['resource'][iw]['capped']['add']()
								if(id==iw && !n(gainBase).eq(0)){
									cappedAll = cappedAll.add(gainBase)
									capped += tooltipDirectlyCapped(gainName, gainBase, cappedAll, id)
								}
							}
						}
					}
				}
			}


			for(let i in CIVICS['workshop']){
				if(player['workshop'][i]){
					if(CIVICS['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in CIVICS['workshop'][i]['effect']['resource']){
							if(CIVICS['workshop'][i]['effect']['resource'][iw]['capped']?.['mul']!==undefined){
								let gainName = '工坊: '+CIVICS['workshop'][i]['name']()
								let gainBase = CIVICS['workshop'][i]['effect']['resource'][iw]['capped']['mul']()
								if(id==iw && !n(gainBase).eq(1)){
									cappedAll = cappedAll.mul(gainBase)
									capped += tooltipDirectlyCappedMul(n(gainBase).gt(1), gainName, gainBase, cappedAll, id)
								}
							}
						}
					}
				}
			}


			for(let i in RESOURCE['main']){
				if(RESOURCE['main'][i]['effect']?.['capped']?.['mul']!==undefined){
					for(let ir in RESOURCE['main'][i]['effect']['capped']['mul']){
						let cappedName = '资源: '+RESOURCE['main'][i]['name']()
						let cappedBase = RESOURCE['main'][i]['effect']['capped']['mul'][ir]()
						let cappedMul = player['resource'][i]
						if(id==ir && !n(cappedBase).pow(cappedMul).eq(0)){
							cappedAll = cappedAll.mul(n(cappedBase).pow(cappedMul))
							capped += tooltipCappedPow(cappedName, cappedBase, cappedMul, cappedAll, id)
						}
					}
				}
			}


			cappedAll = formatScientific(cappedAll, 8)
			if(n(cappedAll).eq(0)){
				capped = ''
			}
			capped = "<hr><a style='font-size: 14px'>资源储存</a>" + capped
		}

		let num = ''
		let numNumber = n(0)
		if(RESOURCE['main'][id]['amount']!==undefined){
			num += "<hr><a style='font-size: 14px'>资源数量</a>"
			numNumber = numNumber.add(RESOURCE['main'][id]['amount']())
			let now = format(numNumber)
			if(numNumber.eq(getResourceBaseNumber(id))){
				now = '<u>'+format(numNumber)+'</u>'
			}
			if(!numNumber.eq(0)){
				num += `<left><span>
					<div style="width: 160px; display: table-cell"><green>+</green></i> 基础</div>
					<div style="width: 160px; display: table-cell">+`+format(RESOURCE['main'][id]['amount']())+`</div>`+now+`
				</span></left>`
			}
			if(numNumber.eq(0)){
				num = ''
			}
		}
		return getTooltipID(colorText(id)[1]+"<small>"+tool+effect+gain+capped+num+time+'</small>')
	}

	if(id2=='LoadTooltipAction'){
		let name = '未命名'
		if(MAIN['action'][id]['name']!=undefined){
			name = MAIN['action'][id]['name']()
		}
		let action = getActionAuto(id)
		if(hasActionClick(id)){
			let base = n(1)
			if(MAIN['action'][id]['player']!==undefined){
				base = MAIN['action'][id]['player']()
			}
			action = action.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+' | '+format(n(player['action'][id+'Cooldown']).div(getActionCooldown(id)).mul(100))+'% | '+format(n(getActionCooldown(id)).div(action))+'s</left>'
		if(isNaN(n(getActionCooldown(id)).div(action))){
			time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+'</left>'
		}
		if(MAIN['action'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+MAIN['action'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
    }

	if(id2=='LoadTooltipBuilding'){
		let name = '未命名'
		if(MAIN['building'][id]['name']!==undefined){
			name = MAIN['building'][id]['name']()
		}

		let bas = ''
		if(MAIN['building'][id]['tooltip']!==undefined){
			bas = '<hr>'+MAIN['building'][id]['tooltip']()
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(MAIN['building'][id]['cost']!==undefined){
			for(let i in MAIN['building'][id]['cost']){
				let res = getBuildCost(id, i)
				cost += costText(colorText(i)[1], i, res)
			}
		}
		cost += '</left>'
	
		let gainhr = ''
		let gain = ''
		if(MAIN['building'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let i in MAIN['building'][id]['effect']['gain']['add']){
				if(n(getBuildGainBase(id, i)).neq(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					let negative = false
					if(RESOURCE['main'][i]['negative']!==undefined){
						negative = RESOURCE['main'][i]['negative']()
					}
					if(negative){
						if(n(getBuildGainBase(id, i)).lt(0)){
							gain += effectText(colorText(i)[1], '', getBuildGainBase(id, i), '/s', player['building'][id+'Allocation'] ?? player['building'][id], null, true)
						}else{
							gain += effectText(colorText(i)[1], '+', n(getBuildGainBase(id, i)), '/s', player['building'][id+'Allocation'] ?? player['building'][id], 'red', true)
						}
					}else{
						if(n(getBuildGainBase(id, i)).gt(0)){
							gain += effectText(colorText(i)[1], '+', getBuildGainBase(id, i), '/s', player['building'][id+'Allocation'] ?? player['building'][id], null, true)
						}else{
							gain += effectText(colorText(i)[1], '-', n(getBuildGainBase(id, i)).neg(), '/s', player['building'][id+'Allocation'] ?? player['building'][id], 'red', true)
						}
					}
				}
			}
		}

		let cappedhr = ''
		let capped = ''
		if(MAIN['building'][id]['effect']?.['capped']?.['add']!==undefined){
			for(let i in MAIN['building'][id]['effect']['capped']['add']){
				if(n(getBuildCappedBase(id, i)).neq(0)){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '+', getBuildCappedBase(id, i), '', player['building'][id+'Allocation'] ?? player['building'][id], null)
				}
			}
		}

		let reshr = ''
		let res = ''
		if(MAIN['building'][id]['effect']?.['resource']!==undefined){
			for(let i in MAIN['building'][id]['effect']['resource']){
				if(MAIN['building'][id]['effect']['resource'][i]['gain']?.['add']!==undefined){
					for(let iga in MAIN['building'][id]['effect']['resource'][i]['gain']?.['add']){
						if(MAIN['building'][id]['effect']['resource'][i]['gain']?.['add'][iga]['addmul']!==undefined){
							reshr = `<hr><a style='font-size: 14px'>资源</a>`
                            if(n(RESOURCE['main'][i]['effect']['gain']['add'][iga]()).gt(0)){
                                res += effectText(colorText(iga)[1], '生产+', MAIN['building'][id]['effect']['resource'][i]['gain']['add'][iga]['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], null, true)
                            }else{
                                res += effectText(colorText(iga)[1], '消耗+', MAIN['building'][id]['effect']['resource'][i]['gain']['add'][iga]['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], 'red', true)
                            }
						}
					}
				}
			}
		}

		let citizenshr = ''
		let citizens = ''
		if(MAIN['building'][id]['effect']?.['citizens']!==undefined){
			for(let i in MAIN['building'][id]['effect']['citizens']){
				if(MAIN['building'][id]['effect']['citizens'][i]['effect']?.['addmul']!==undefined){
					citizenshr = `<hr><a style='font-size: 14px'>居民</a>`
					citizens += effectText(CIVICS['citizens'][i]['name'](), '效率+', MAIN['building'][id]['effect']['citizens'][i]['effect']?.['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], null)
				}
			}
		}

		let otherhr = ''
		let other = ''
		if(MAIN['building'][id]['effect']?.['other']!==undefined){
			for(let i in MAIN['building'][id]['effect']['other']){
				otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
				other += effectText(MAIN['building'][id]['effect']['other'][i]['name'](), MAIN['building'][id]['effect']['other'][i]['display']()[0], MAIN['building'][id]['effect']['other'][i]['effect'](), MAIN['building'][id]['effect']['other'][i]['display']()[1], player['building'][id+'Allocation'] ?? player['building'][id], null, true)
			}
		}

		let amount = ''
		if(MAIN['building'][id]['allocation']!==undefined){
			if(MAIN['building'][id]['allocation']()){
				amount = '<hr>('+formatWhole(player['building'][id+'Allocation'],0)+' / '+formatWhole(player['building'][id],0)+')'
			}
		}
		return getTooltipID(name+'<small>'+amount+bas+cost+gainhr+gain+cappedhr+capped+reshr+res+citizenshr+citizens+otherhr+other+'</samll>')
	}

	if(id2=='LoadTooltipCraft'){
		let name = '未命名'
		if(MAIN['craft'][id]['name']!=undefined){
			name = MAIN['craft'][id]['name']()
		}
		let craft = getCraftAuto(id)
		if(hasCraftClick(id)){
			let base = n(1)
			if(MAIN['craft'][id]['player']!==undefined){
				base = MAIN['craft'][id]['player']()
			}
			craft = craft.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+' | '+format(n(player['craft'][id+'Cooldown']).div(getCraftCooldown(id)).mul(100))+'% | '+format(n(getCraftCooldown(id)).div(craft))+'s</left>'
		if(isNaN(n(getCraftCooldown(id)).div(craft))){
			time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+'</left>'
		}
		if(MAIN['craft'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+MAIN['craft'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
	}

	if(id2=='LoadTooltipCitizens'){
		let too = ''
		if(CIVICS['citizens'][id]['tooltip']!==undefined){
			too += '<hr>'+CIVICS['citizens'][id]['tooltip']()
		}
		
		let action = ''
		let actionhr = ''
		if(CIVICS['citizens'][id]['effect']?.['action']!==undefined){
			for(let ia in CIVICS['citizens'][id]['effect']['action']){
				if(n(CIVICS['citizens'][id]['effect']['action'][ia]()).neq(0)){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(MAIN['action'][ia]['name'](), '', getCitizensActionBase(id, ia), '/s', player.citizens[id])
				}
			}
		}
		if(CIVICS['citizens'][id]['effect']?.['craft']!==undefined){
			for(let ic in CIVICS['citizens'][id]['effect']['craft']){
				if(n(CIVICS['citizens'][id]['effect']['craft'][ic]()).neq(0)){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(MAIN['craft'][ic]['name'](), '', getCitizensCraftBase(id, ic), '/s', player.citizens[id])
				}
			}
		}
		
		let gain = ''
		let gainhr = ''
		if(CIVICS['citizens'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let i in CIVICS['citizens'][id]['effect']['gain']['add']){
				if(n(CIVICS['citizens'][id]['effect']['gain']['add'][i]()).gt(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '+', getCitizensGainBase(id, i), '/s', player.citizens[id])
				}else if(n(CIVICS['citizens'][id]['effect']['gain']['add'][i]()).lt(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '', getCitizensGainBase(id, i), '/s', player.citizens[id], 'red')
				}
			}
		}

		let other = ''
		let otherhr = ''
		if(CIVICS['citizens'][id]['effect']?.['other']!==undefined){
			for(let i in CIVICS['citizens'][id]['effect']['other']){
				if(n(CIVICS['citizens'][id]['effect']['other'][i]['effect']()).neq(0)){
					otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
					other += effectText(CIVICS['citizens'][id]['effect']['other'][i]['name'](), CIVICS['citizens'][id]['effect']['other'][i]['display']()[0], CIVICS['citizens'][id]['effect']['other'][i]['effect'](), CIVICS['citizens'][id]['effect']['other'][i]['display']()[1], player.citizens[id])
				}
			}
		}
		return getTooltipID(CIVICS['citizens'][id]['name']()+'<small>'+too+actionhr+action+gainhr+gain+otherhr+other+'</small>')
	}

	if(id2=='LoadTooltipCitizenJobs'){
		let too = ''
		if(CIVICS['jobs'][id]['tooltip']!==undefined){
			too += '<hr>'+CIVICS['jobs'][id]['tooltip']()
		}
		return getTooltipID(CIVICS['jobs'][id]['name']()+'<small>'+too+'</small>')
	}

	if(id2=='LoadTooltipWorkshop'){
		let too = ''
		if(CIVICS['workshop'][id]['tooltip']!==undefined){
			too = '<hr>'+CIVICS['workshop'][id]['tooltip']()
		}

		let keep = ''
		if(CIVICS['workshop'][id]['keep']!==undefined){
			if(CIVICS['workshop'][id]['keep']()){
				keep = '<righttip>文化遗传</righttip>'
			}
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(CIVICS['workshop'][id]['cost']!==undefined){
			for(let i in CIVICS['workshop'][id]['cost']){
				cost += costText(colorText(i)[1], i, CIVICS['workshop'][id]['cost'][i](), 'workshop')
			}
		}

		let gainhr = ''
		let gain = ''
		if(CIVICS['workshop'][id]['effect']?.['resource']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['resource']){
				if(CIVICS['workshop'][id]['effect']['resource'][i]['gain']?.['mul']!==undefined){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '<mul>×</mul>', CIVICS['workshop'][id]['effect']['resource'][i]['gain']['mul'](), '', null, null, false)
				}
			}
		}

		let cappedhr = ''
		let capped = ''
		if(CIVICS['workshop'][id]['effect']?.['resource']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['resource']){
				if(CIVICS['workshop'][id]['effect']['resource'][i]['capped']?.['add']!==undefined){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '+', CIVICS['workshop'][id]['effect']['resource'][i]['capped']['add'](), '', null, null, false)
				}
				if(CIVICS['workshop'][id]['effect']['resource'][i]['capped']?.['mul']!==undefined){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '<mul>×</mul>', CIVICS['workshop'][id]['effect']['resource'][i]['capped']['mul'](), '', null, null, false)
				}
			}
		}

		let actionhr = ''
		let action = ''
		if(CIVICS['workshop'][id]['effect']?.['action']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['action']){
				if(CIVICS['workshop'][id]['effect']['action'][i]['speed']?.['mul']!==undefined){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(MAIN['action'][i]['name'](), '速度<mul>×</mul>', CIVICS['workshop'][id]['effect']['action'][i]['speed']['mul'](), '', null, null, false)
				}
			}
		}
	
		let crafthr = ''
		let craft = ''
		if(CIVICS['workshop'][id]['effect']?.['craft']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['craft']){
				if(CIVICS['workshop'][id]['effect']['craft'][i]['speed']?.['mul']!==undefined){
					crafthr = `<hr><a style='font-size: 14px'>行动</a>`
					craft += effectText(MAIN['craft'][i]['name'](), '速度<mul>×</mul>', CIVICS['workshop'][id]['effect']['craft'][i]['speed']['mul'](), '', null, null, false)
				}
			}
		}

		let markdownhr = ''
		let markdown = ''
		if(CIVICS['workshop'][id]['effect']?.['markdown']?.['building']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['markdown']['building']){
				markdownhr = `<hr><a style='font-size: 14px'>减价</a>`
				if(CIVICS['workshop'][id]['effect']['markdown']['building'][i]['effect']?.['mul']!==undefined){
					markdown += effectText(MAIN['building'][i]['name'](), '基础价格<mul>÷</mul>', CIVICS['workshop'][id]['effect']['markdown']['building'][i]['effect']?.['mul'](), '', null, null, false)
				}
			}
		}

		let buildinghr = ''
		let building = ''
		if(CIVICS['workshop'][id]['effect']?.['building']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['building']){
				if(CIVICS['workshop'][id]['effect']['building'][i]['gain']?.['add']!==undefined){
					for(let iga in CIVICS['workshop'][id]['effect']['building'][i]['gain']['add']){
						if(CIVICS['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul']!==undefined){
							buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
							if(n(MAIN['building'][i]['effect']['gain']['add'][iga]()).lt(0)){
								building += effectText(MAIN['building'][i]['name'](), colorText(iga)[1]+'消耗<mul>×</mul>', CIVICS['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul'](), '', null, null, false)
							}else{
								building += effectText(MAIN['building'][i]['name'](), colorText(iga)[1]+'生产<mul>×</mul>', CIVICS['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul'](), '', null, null, false)
							}
						}
					}
				}


				if(CIVICS['workshop'][id]['effect']['building'][i]['capped']?.['add']!==undefined){
					if(CIVICS['workshop'][id]['effect']['building'][i]['capped']?.['add']!==undefined){
						for(let iga in CIVICS['workshop'][id]['effect']['building'][i]['capped']['add']){
							if(CIVICS['workshop'][id]['effect']['building'][i]['capped']['add'][iga]['add']!==undefined){
								buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
								building += effectText(MAIN['building'][i]['name'](), colorText(iga)[1]+'上限+', CIVICS['workshop'][id]['effect']['building'][i]['capped']['add'][iga]['add'](), '', null, null, false)
							}
						}
					}
				}


				if(CIVICS['workshop'][id]['effect']['building'][i]['effect']?.['mul']!==undefined){
					buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
					building += effectText(MAIN['building'][i]['name'](), '效率<mul>×</mul>', CIVICS['workshop'][id]['effect']['building'][i]['effect']['mul'](), '', null, null, false)
				}
			}
		}

		let citizenshr = ''
		let citizens = ''
		if(CIVICS['workshop'][id]['effect']?.['citizens']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['citizens']){
				if(CIVICS['workshop'][id]['effect']['citizens'][i]['effect']?.['mul']!==undefined){
					citizenshr = `<hr><a style='font-size: 14px'>居民</a>`
					citizens += effectText(CIVICS['citizens'][i]['name'](), '效率<mul>×</mul>', CIVICS['workshop'][id]['effect']['citizens'][i]['effect']['mul'](), '', null, null, false)
				}
			}
		}

		let otherhr = ''
		let other = ''
		if(CIVICS['workshop'][id]['effect']?.['other']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['other']){
				otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
				other += effectText(CIVICS['workshop'][id]['effect']['other'][i]['name'](), CIVICS['workshop'][id]['effect']['other'][i]['display']()[0], CIVICS['workshop'][id]['effect']['other'][i]['effect'](), CIVICS['workshop'][id]['effect']['other'][i]['display']()[1], null, null, false)
			}
		}

		let unlockedhr = ''
		let unlocked = ''
		if(CIVICS['workshop'][id]['effect']?.['unlocked']!==undefined){
			for(let i in CIVICS['workshop'][id]['effect']['unlocked']){
				unlockedhr = `<hr><a style='font-size: 14px'>解锁</a>`
				unlocked += `<left><green>+</green> `+CIVICS['workshop'][id]['effect']['unlocked'][i]()+`</left>`
			}
		}
		cost += '</left>'
		return getTooltipID(CIVICS['workshop'][id]['name']()+keep+'<small>'+too+cost+gainhr+gain+cappedhr+capped+actionhr+crafthr+craft+action+markdownhr+markdown+buildinghr+building+citizenshr+citizens+otherhr+other+unlockedhr+unlocked+'</samll>')
	}

	if(id2=='efficient'){
		let name = ''
		let too = ''
		for(let i in efficient[id]){
			if(i=='name'){
				name = efficient[id]['name']()
				continue
			}
			if(i=='tooltip'){
				too += efficient[id]['tooltip']()+'<hr>'
				continue
			}
			if(i=='unlocked'){
				continue
			}
			let act = true
			if(efficient[id][i]['active']!==undefined){
				act = efficient[id][i]['active']()
			}
			if(act){
				if(n(efficient[id][i]['effect']()).lt(0)){
					too += `<red><left><span>
						<span style="width: 100px; display: table-cell"><red>-</red> `+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left></red>`
				}else if(n(efficient[id][i]['effect']()).gt(0)){
					too += `<left><span>
						<span style="width: 100px; display: table-cell"><green>+</green> `+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left>`
				}
			}
		}
		return getTooltipID(name+'<hr><small>'+too+'<left><li-hid>-> 总计: '+formatScientific(n(getEfficient(id)).mul(100),1)+'%</left></small>')
	}
}