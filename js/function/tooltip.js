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
		if(resource['main'][id]['tooltip']!=undefined){
			tool = '<hr>'+resource['main'][id]['tooltip']()
		}

		let effect = ''
		if(resource['main'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let iga in resource['main'][id]['effect']['gain']['add']){
				if(n(iga).gt(0)){
					effect += effectText(colorText(iga)[1], '+', getResourceEffectGainBase(id, iga), '/s', player['resource'][id])
				}else{
					effect += effectText(colorText(iga)[1], '', getResourceEffectGainBase(id, iga), '/s', player['resource'][id], 'red')
				}
			}
		}
		if(resource['main'][id]['effect']?.['capped']?.['add']!==undefined){
			for(let ica in resource['main'][id]['effect']['capped']['add']){
				if(n(ica).gt(0)){
					effect += effectText(colorText(ica)[1]+'上限', '+', resource['main'][id]['effect']['capped']['add'][ica](), '', player['resource'][id])
				}else{
					effect += effectText(colorText(ica)[1]+'上限', '', resource['main'][id]['effect']['capped']['add'][ica](), '', player['resource'][id], 'red')
				}
			}
		}
		if(resource['main'][id]['effect']?.['capped']?.['mul']!==undefined){
			for(let icm in resource['main'][id]['effect']['capped']['mul']){
				if(n(icm).gt(0)){
					effect += effectText(colorText(icm)[1]+'上限', '<mul>×</mul>', resource['main'][id]['effect']['capped']['mul'][icm](), '', player['resource'][id], null, true, 'mul')
				}else{
					effect += effectText(colorText(icm)[1]+'上限', '<mul>×</mul>', resource['main'][id]['effect']['capped']['mul'][icm](), '', player['resource'][id], 'red')
				}
			}
		}
		if(resource['main'][id]['effect']?.['other']!==undefined){
			for(let ie in resource['main'][id]['effect']['other']){
				effect += effectText(resource['main'][id]['effect']['other'][ie]['name'](),resource['main'][id]['effect']['other'][ie]['display']()[0], resource['main'][id]['effect']['other'][ie]['effect'](), resource['main'][id]['effect']['other'][ie]['display']()[1], player['resource'][id], null, true)
			}
		}
		if(effect!==''){
			effect = `<hr><a style='font-size: 14px'>影响</a>` + effect
		}

		let gain = ''
		let time = ''
		let gainAll = n(0)
		if(resource['main'][id]['gain']!==undefined){
			gainAll = gainAll.add(resource['main'][id]['gain']())
			if(!gainAll.eq(0)){
				let gainName = '基础'
				let gainBase = resource['main'][id]['gain']()
				if(resource['main'][id]['gainTooltip']!==undefined){
					gainName = resource['main'][id]['gainTooltip']()
				}
				gain += tooltipDirectlyGain(n(gainBase).gte(0), gainName, gainBase, gainAll, id)
			}
			for(let i in resource['main']){
				if(resource['main'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in resource['main'][i]['effect']['gain']['add']){
						let gainName = '资源: '+resource['main'][i]['name']()
						let gainBase = getResourceEffectGainBase(i, ig)
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
				if(resource['main'][i]['effect']?.['gain']?.['mul']!==undefined){
					for(let ig in resource['main'][i]['effect']['gain']['mul']){
						let gainName = '资源: '+resource['main'][i]['name']()
						let gainBase = resource['main'][i]['effect']['gain']['mul'][ig]()
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).pow(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).pow(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in main['building'][i]['effect']['gain']['add']){
						let gainName = '建筑: '+main['building'][i]['name']()
						let gainBase = getBuildGainBase(i, ig)
						let gainMul = player['building'][i+'Allocation'] ?? player['building'][i]
						if(id==ig && !n(getBuildGain(i, ig)).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id, 'building', i)
						}
					}
				}
			}
			for(let i in civics['citizens']){
				if(civics['citizens'][i]['effect']?.['gain']?.['add']!==undefined){
					for(let ig in civics['citizens'][i]['effect']['gain']['add']){
						let gainName = '村民: '+civics['citizens'][i]['name']()
						let gainBase = nc(getCitizensGainBase(i, ig))
						let gainMul = player.citizens[i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
							gainAll = gainAll.add(n(gainBase).mul(gainMul))
							gain += tooltipGain(n(gainBase).mul(gainMul).gte(0), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}


			if(resource['main'][id]['mul']!==undefined){
				let gainName = '倍率'
				let gainBase = resource['main'][id]['mul']()
				if(gainBase.neq(1)){
					if(resource['main'][id]['mulTooltip']!==undefined){
						gainName = resource['main'][id]['mulTooltip']()
					}
					gainAll = gainAll.mul(resource['main'][id]['mul']())
					gain += tooltipDirectlyGainMul(n(gainBase).gt(1), gainName, gainBase, gainAll, id)
				}
			}
			for(let i in resource['main']){
				if(resource['main'][i]['effect']?.['gain']?.['mul']!==undefined){
					for(let ig in resource['main'][i]['effect']['gain']['mul']){
						let gainName = resource['main'][i]['name']()
						let gainBase = resource['main'][i]['effect']['gain']['mul'][ig]()
						let gainMul = player['resource'][i]
						if(id==ig && !n(gainBase).mul(gainMul).eq(1)){
							gainAll = gainAll.mul(n(gainBase).mul(gainMul))
							gain += tooltipGainMul(n(gainBase).mul(gainMul).gt(1), gainName, gainBase, gainMul, gainAll, id)
						}
					}
				}
			}


			for(let i in civics['workshop']){
				if(player['workshop'][i]){
					if(civics['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in civics['workshop'][i]['effect']['resource']){
							if(civics['workshop'][i]['effect']['resource'][iw]['gain']?.['mul']!==undefined){
								let gainName = '工坊: '+civics['workshop'][i]['name']()
								let gainBase = civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']()
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
			if(resource['main'][id]['capped']!==undefined){
				if(player['resource'][id].gte(getResourceCapped(id))){
					time = '<hr>已抵达上限'
				}else if(resource['main'][id]['gain']!==undefined){
					if(n(getResourceGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceCapped(id)).sub(player['resource'][id]).div(getResourceGain(id)))+'后抵达上限'
					}else if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
					}
				}
			}else if(resource['main'][id]['gain']!==undefined){
				if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
				time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
				}
			}
		}

		let capped = ''
		let cappedAll = n(0)
		if(resource['main'][id]['capped']!==undefined){
			cappedAll = cappedAll.add(resource['main'][id]['capped']())
			if(!cappedAll.eq(0)){
				let cappedName = '基础'
				let cappedBase = resource['main'][id]['capped']()
				if(resource['main'][id]['cappedTooltip']!==undefined){
					cappedName = resource['main'][id]['cappedTooltip']()
				}
				capped += tooltipDirectlyCapped(cappedName, cappedBase, cappedAll, id)
			}
			for(let i in resource['main']){
				if(resource['main'][i]['effect']?.['capped']?.['add']!==undefined){
					for(let im in resource['main'][i]['effect']['capped']['add']){
						let cappedName = '资源: '+resource['main'][i]['name']()
						let cappedBase = resource['main'][i]['effect']['capped']['add'][im]()
						let cappedMul = player['resource'][i]
						if(id==im && !n(cappedBase).mul(cappedMul).eq(0)){
							cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
							capped += tooltipCapped(cappedName, cappedBase, cappedMul, cappedAll, id)
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']?.['capped']?.['add']!==undefined){
					for(let ib in main['building'][i]['effect']['capped']['add']){
						let cappedName = '建筑: '+main['building'][i]['name']()
						let cappedBase = getBuildCappedBase(i, ib)
						let cappedMul = player['building'][i+'Allocation'] ?? player['building'][i]
						if(id==ib && !n(cappedBase).mul(cappedMul).eq(0)){
							cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
							capped += tooltipCapped(cappedName, cappedBase, cappedMul, cappedAll, id, 'building', i)
						}
					}
				}
			}
			for(let i in civics['workshop']){
				if(player['workshop'][i]){
					if(civics['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in civics['workshop'][i]['effect']['resource']){
							if(civics['workshop'][i]['effect']['resource'][iw]['capped']?.['add']!==undefined){
								let gainName = '工坊: '+civics['workshop'][i]['name']()
								let gainBase = civics['workshop'][i]['effect']['resource'][iw]['capped']['add']()
								if(id==iw && !n(gainBase).eq(0)){
									cappedAll = cappedAll.add(gainBase)
									capped += tooltipDirectlyCapped(gainName, gainBase, cappedAll, id)
								}
							}
						}
					}
				}
			}


			for(let i in civics['workshop']){
				if(player['workshop'][i]){
					if(civics['workshop'][i]['effect']?.['resource']!==undefined){
						for(let iw in civics['workshop'][i]['effect']['resource']){
							if(civics['workshop'][i]['effect']['resource'][iw]['capped']?.['mul']!==undefined){
								let gainName = '工坊: '+civics['workshop'][i]['name']()
								let gainBase = civics['workshop'][i]['effect']['resource'][iw]['capped']['mul']()
								if(id==iw && !n(gainBase).eq(1)){
									cappedAll = cappedAll.mul(gainBase)
									capped += tooltipDirectlyCappedMul(n(gainBase).gt(1), gainName, gainBase, cappedAll, id)
								}
							}
						}
					}
				}
			}


			for(let i in resource['main']){
				if(resource['main'][i]['effect']?.['capped']?.['mul']!==undefined){
					for(let ir in resource['main'][i]['effect']['capped']['mul']){
						let cappedName = '资源: '+resource['main'][i]['name']()
						let cappedBase = resource['main'][i]['effect']['capped']['mul'][ir]()
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
		if(resource['main'][id]['amount']!==undefined){
			num += "<hr><a style='font-size: 14px'>资源数量</a>"
			numNumber = numNumber.add(resource['main'][id]['amount']())
			let now = format(numNumber)
			if(numNumber.eq(getResourceBaseNumber(id))){
				now = '<u>'+format(numNumber)+'</u>'
			}
			if(!numNumber.eq(0)){
				num += `<left><span>
					<div style="width: 160px; display: table-cell"><green>+</green></i> 基础</div>
					<div style="width: 160px; display: table-cell">+`+format(resource['main'][id]['amount']())+`</div>`+now+`
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
		if(main['action'][id]['name']!=undefined){
			name = main['action'][id]['name']()
		}
		let action = getActionAuto(id)
		if(hasActionClick(id)){
			let base = n(1)
			if(main['action'][id]['player']!==undefined){
				base = main['action'][id]['player']()
			}
			action = action.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+' | '+format(n(player['action'][id+'Cooldown']).div(getActionCooldown(id)).mul(100))+'% | '+format(n(getActionCooldown(id)).div(action))+'s</left>'
		if(isNaN(n(getActionCooldown(id)).div(action))){
			time = '<hr><left>'+format(player['action'][id+'Cooldown'])+' / '+format(getActionCooldown(id))+'</left>'
		}
		if(main['action'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+main['action'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
    }

	if(id2=='LoadTooltipBuilding'){
		let name = '未命名'
		if(main['building'][id]['name']!==undefined){
			name = main['building'][id]['name']()
		}

		let bas = ''
		if(main['building'][id]['tooltip']!==undefined){
			bas = '<hr>'+main['building'][id]['tooltip']()
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(main['building'][id]['cost']!==undefined){
			for(let i in main['building'][id]['cost']){
				let res = getBuildCost(id, i)
				cost += costText(colorText(i)[1], i, res)
			}
		}
		cost += '</left>'
	
		let gainhr = ''
		let gain = ''
		if(main['building'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let i in main['building'][id]['effect']['gain']['add']){
				if(n(getBuildGainBase(id, i)).neq(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					let negative = false
					if(resource['main'][i]['negative']!==undefined){
						negative = resource['main'][i]['negative']()
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
		if(main['building'][id]['effect']?.['capped']?.['add']!==undefined){
			for(let i in main['building'][id]['effect']['capped']['add']){
				if(n(getBuildCappedBase(id, i)).neq(0)){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '+', getBuildCappedBase(id, i), '', player['building'][id+'Allocation'] ?? player['building'][id], null)
				}
			}
		}

		let reshr = ''
		let res = ''
		if(main['building'][id]['effect']?.['resource']!==undefined){
			for(let i in main['building'][id]['effect']['resource']){
				if(main['building'][id]['effect']['resource'][i]['gain']?.['add']!==undefined){
					for(let iga in main['building'][id]['effect']['resource'][i]['gain']?.['add']){
						if(main['building'][id]['effect']['resource'][i]['gain']?.['add'][iga]['addmul']!==undefined){
							reshr = `<hr><a style='font-size: 14px'>资源</a>`
                            if(n(resource['main'][i]['effect']['gain']['add'][iga]()).gt(0)){
                                res += effectText(colorText(iga)[1], '生产+', main['building'][id]['effect']['resource'][i]['gain']['add'][iga]['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], null, true)
                            }else{
                                res += effectText(colorText(iga)[1], '消耗+', main['building'][id]['effect']['resource'][i]['gain']['add'][iga]['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], 'red', true)
                            }
						}
					}
				}
			}
		}

		let citizenshr = ''
		let citizens = ''
		if(main['building'][id]['effect']?.['citizens']!==undefined){
			for(let i in main['building'][id]['effect']['citizens']){
				if(main['building'][id]['effect']['citizens'][i]['effect']?.['addmul']!==undefined){
					citizenshr = `<hr><a style='font-size: 14px'>居民</a>`
					citizens += effectText(civics['citizens'][i]['name'](), '效率+', main['building'][id]['effect']['citizens'][i]['effect']?.['addmul'](), '<mul>×</mul>', player['building'][id+'Allocation'] ?? player['building'][id], null)
				}
			}
		}

		let otherhr = ''
		let other = ''
		if(main['building'][id]['effect']?.['other']!==undefined){
			for(let i in main['building'][id]['effect']['other']){
				otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
				other += effectText(main['building'][id]['effect']['other'][i]['name'](), main['building'][id]['effect']['other'][i]['display']()[0], main['building'][id]['effect']['other'][i]['effect'](), main['building'][id]['effect']['other'][i]['display']()[1], player['building'][id+'Allocation'] ?? player['building'][id], null, true)
			}
		}

		let amount = ''
		if(main['building'][id]['allocation']!==undefined){
			if(main['building'][id]['allocation']()){
				amount = '<hr>('+formatWhole(player['building'][id+'Allocation'],0)+' / '+formatWhole(player['building'][id],0)+')'
			}
		}
		return getTooltipID(name+'<small>'+amount+bas+cost+gainhr+gain+cappedhr+capped+reshr+res+citizenshr+citizens+otherhr+other+'</samll>')
	}

	if(id2=='LoadTooltipCraft'){
		let name = '未命名'
		if(main['craft'][id]['name']!=undefined){
			name = main['craft'][id]['name']()
		}
		let craft = getCraftAuto(id)
		if(hasCraftClick(id)){
			let base = n(1)
			if(main['craft'][id]['player']!==undefined){
				base = main['craft'][id]['player']()
			}
			craft = craft.add(n(base).mul(getEfficient('action')))
		}
		let time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+' | '+format(n(player['craft'][id+'Cooldown']).div(getCraftCooldown(id)).mul(100))+'% | '+format(n(getCraftCooldown(id)).div(craft))+'s</left>'
		if(isNaN(n(getCraftCooldown(id)).div(craft))){
			time = '<hr><left>'+format(player['craft'][id+'Cooldown'])+' / '+format(getCraftCooldown(id))+'</left>'
		}
		if(main['craft'][id]['tooltip']!=undefined){
			return getTooltipID(name+'<hr><small>'+main['craft'][id]['tooltip']()+time)
		}else{
			return getTooltipID('未命名')
		}
	}

	if(id2=='LoadTooltipCitizens'){
		let too = ''
		if(civics['citizens'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['citizens'][id]['tooltip']()
		}
		
		let action = ''
		let actionhr = ''
		if(civics['citizens'][id]['effect']?.['action']!==undefined){
			for(let ia in civics['citizens'][id]['effect']['action']){
				if(n(civics['citizens'][id]['effect']['action'][ia]()).neq(0)){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(main['action'][ia]['name'](), '', getCitizensActionBase(id, ia), '/s', player.citizens[id])
				}
			}
		}
		if(civics['citizens'][id]['effect']?.['craft']!==undefined){
			for(let ic in civics['citizens'][id]['effect']['craft']){
				if(n(civics['citizens'][id]['effect']['craft'][ic]()).neq(0)){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(main['craft'][ic]['name'](), '', getCitizensCraftBase(id, ic), '/s', player.citizens[id])
				}
			}
		}
		
		let gain = ''
		let gainhr = ''
		if(civics['citizens'][id]['effect']?.['gain']?.['add']!==undefined){
			for(let i in civics['citizens'][id]['effect']['gain']['add']){
				if(n(civics['citizens'][id]['effect']['gain']['add'][i]()).gt(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '+', getCitizensGainBase(id, i), '/s', player.citizens[id])
				}else if(n(civics['citizens'][id]['effect']['gain']['add'][i]()).lt(0)){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '', getCitizensGainBase(id, i), '/s', player.citizens[id], 'red')
				}
			}
		}

		let other = ''
		let otherhr = ''
		if(civics['citizens'][id]['effect']?.['other']!==undefined){
			for(let i in civics['citizens'][id]['effect']['other']){
				if(n(civics['citizens'][id]['effect']['other'][i]['effect']()).neq(0)){
					otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
					other += effectText(civics['citizens'][id]['effect']['other'][i]['name'](), civics['citizens'][id]['effect']['other'][i]['display']()[0], civics['citizens'][id]['effect']['other'][i]['effect'](), civics['citizens'][id]['effect']['other'][i]['display']()[1], player.citizens[id])
				}
			}
		}
		return getTooltipID(civics['citizens'][id]['name']()+'<small>'+too+actionhr+action+gainhr+gain+otherhr+other+'</small>')
	}

	if(id2=='LoadTooltipCitizenJobs'){
		let too = ''
		if(civics['jobs'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['jobs'][id]['tooltip']()
		}
		return getTooltipID(civics['jobs'][id]['name']()+'<small>'+too+'</small>')
	}

	if(id2=='LoadTooltipWorkshop'){
		let too = ''
		if(civics['workshop'][id]['tooltip']!==undefined){
			too = '<hr>'+civics['workshop'][id]['tooltip']()
		}

		let keep = ''
		if(civics['workshop'][id]['keep']!==undefined){
			if(civics['workshop'][id]['keep']()){
				keep = '<righttip>文化遗传</righttip>'
			}
		}

		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(civics['workshop'][id]['cost']!==undefined){
			for(let i in civics['workshop'][id]['cost']){
				cost += costText(colorText(i)[1], i, civics['workshop'][id]['cost'][i](), 'workshop')
			}
		}

		let gainhr = ''
		let gain = ''
		if(civics['workshop'][id]['effect']?.['resource']!==undefined){
			for(let i in civics['workshop'][id]['effect']['resource']){
				if(civics['workshop'][id]['effect']['resource'][i]['gain']?.['mul']!==undefined){
					gainhr = `<hr><a style='font-size: 14px'>生产</a>`
					gain += effectText(colorText(i)[1], '<mul>×</mul>', civics['workshop'][id]['effect']['resource'][i]['gain']['mul'](), '', null, null, false)
				}
			}
		}

		let cappedhr = ''
		let capped = ''
		if(civics['workshop'][id]['effect']?.['resource']!==undefined){
			for(let i in civics['workshop'][id]['effect']['resource']){
				if(civics['workshop'][id]['effect']['resource'][i]['capped']?.['add']!==undefined){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '+', civics['workshop'][id]['effect']['resource'][i]['capped']['add'](), '', null, null, false)
				}
				if(civics['workshop'][id]['effect']['resource'][i]['capped']?.['mul']!==undefined){
					cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
					capped += effectText(colorText(i)[1], '<mul>×</mul>', civics['workshop'][id]['effect']['resource'][i]['capped']['mul'](), '', null, null, false)
				}
			}
		}

		let actionhr = ''
		let action = ''
		if(civics['workshop'][id]['effect']?.['action']!==undefined){
			for(let i in civics['workshop'][id]['effect']['action']){
				if(civics['workshop'][id]['effect']['action'][i]['speed']?.['mul']!==undefined){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(main['action'][i]['name'](), '速度<mul>×</mul>', civics['workshop'][id]['effect']['action'][i]['speed']['mul'](), '', null, null, false)
				}
			}
		}
	
		let crafthr = ''
		let craft = ''
		if(civics['workshop'][id]['effect']?.['craft']!==undefined){
			for(let i in civics['workshop'][id]['effect']['craft']){
				if(civics['workshop'][id]['effect']['craft'][i]['speed']?.['mul']!==undefined){
					crafthr = `<hr><a style='font-size: 14px'>行动</a>`
					craft += effectText(main['craft'][i]['name'](), '速度<mul>×</mul>', civics['workshop'][id]['effect']['craft'][i]['speed']['mul'](), '', null, null, false)
				}
			}
		}

		let markdownhr = ''
		let markdown = ''
		if(civics['workshop'][id]['effect']?.['markdown']?.['building']!==undefined){
			for(let i in civics['workshop'][id]['effect']['markdown']['building']){
				markdownhr = `<hr><a style='font-size: 14px'>减价</a>`
				if(civics['workshop'][id]['effect']['markdown']['building'][i]['effect']?.['mul']!==undefined){
					markdown += effectText(main['building'][i]['name'](), '基础价格<mul>÷</mul>', civics['workshop'][id]['effect']['markdown']['building'][i]['effect']?.['mul'](), '', null, null, false)
				}
			}
		}

		let buildinghr = ''
		let building = ''
		if(civics['workshop'][id]['effect']?.['building']!==undefined){
			for(let i in civics['workshop'][id]['effect']['building']){
				if(civics['workshop'][id]['effect']['building'][i]['gain']?.['add']!==undefined){
					for(let iga in civics['workshop'][id]['effect']['building'][i]['gain']['add']){
						if(civics['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul']!==undefined){
							buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
							if(n(main['building'][i]['effect']['gain']['add'][iga]()).lt(0)){
								building += effectText(main['building'][i]['name'](), colorText(iga)[1]+'消耗<mul>×</mul>', civics['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul'](), '', null, null, false)
							}else{
								building += effectText(main['building'][i]['name'](), colorText(iga)[1]+'生产<mul>×</mul>', civics['workshop'][id]['effect']['building'][i]['gain']['add'][iga]['mul'](), '', null, null, false)
							}
						}
					}
				}


				if(civics['workshop'][id]['effect']['building'][i]['capped']?.['add']!==undefined){
					if(civics['workshop'][id]['effect']['building'][i]['capped']?.['add']!==undefined){
						for(let iga in civics['workshop'][id]['effect']['building'][i]['capped']['add']){
							if(civics['workshop'][id]['effect']['building'][i]['capped']['add'][iga]['add']!==undefined){
								buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
								building += effectText(main['building'][i]['name'](), colorText(iga)[1]+'上限+', civics['workshop'][id]['effect']['building'][i]['capped']['add'][iga]['add'](), '', null, null, false)
							}
						}
					}
				}


				if(civics['workshop'][id]['effect']['building'][i]['effect']?.['mul']!==undefined){
					buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
					building += effectText(main['building'][i]['name'](), '效率<mul>×</mul>', civics['workshop'][id]['effect']['building'][i]['effect']['mul'](), '', null, null, false)
				}
			}
		}

		let citizenshr = ''
		let citizens = ''
		if(civics['workshop'][id]['effect']?.['citizens']!==undefined){
			for(let i in civics['workshop'][id]['effect']['citizens']){
				if(civics['workshop'][id]['effect']['citizens'][i]['effect']?.['mul']!==undefined){
					citizenshr = `<hr><a style='font-size: 14px'>居民</a>`
					citizens += effectText(civics['citizens'][i]['name'](), '效率<mul>×</mul>', civics['workshop'][id]['effect']['citizens'][i]['effect']['mul'](), '', null, null, false)
				}
			}
		}

		let otherhr = ''
		let other = ''
		if(civics['workshop'][id]['effect']?.['other']!==undefined){
			for(let i in civics['workshop'][id]['effect']['other']){
				otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
				other += effectText(civics['workshop'][id]['effect']['other'][i]['name'](), civics['workshop'][id]['effect']['other'][i]['display']()[0], civics['workshop'][id]['effect']['other'][i]['effect'](), civics['workshop'][id]['effect']['other'][i]['display']()[1], null, null, false)
			}
		}

		let unlockedhr = ''
		let unlocked = ''
		if(civics['workshop'][id]['effect']?.['unlocked']!==undefined){
			for(let i in civics['workshop'][id]['effect']['unlocked']){
				unlockedhr = `<hr><a style='font-size: 14px'>解锁</a>`
				unlocked += `<left><green>+</green> `+civics['workshop'][id]['effect']['unlocked'][i]()+`</left>`
			}
		}
		cost += '</left>'
		return getTooltipID(civics['workshop'][id]['name']()+keep+'<small>'+too+cost+gainhr+gain+cappedhr+capped+actionhr+crafthr+craft+action+markdownhr+markdown+buildinghr+building+citizenshr+citizens+otherhr+other+unlockedhr+unlocked+'</samll>')
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