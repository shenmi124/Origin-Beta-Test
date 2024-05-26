var TOOLTIPSEL

function loadTooltip(id,id2,onClick=`onclick='document.getElementById("tooltip").style.display="none"`){
	return `onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display="none";window.clearInterval(TOOLTIPSEL)'`+onClick+`;window.clearInterval(TOOLTIPSEL)'`
}

function mouseLoad(id,id2){
	document.getElementById("tooltip").style.display = ''
	tooltip(id,id2)
	TOOLTIPSEL = self.setInterval(function(){
		tooltip(id,id2)
	},50)
}

function tooltipResourceGain(boolean,name,number,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">- `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceGainMultiplication(boolean,name,base,mul,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <mul>×</mul> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">- `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <mul>×</mul> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceMulGain(boolean,name,number,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><mul><green>×</green></mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell"><mul>×</mul>`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceMulGainMultiplication(boolean,name,base,mul,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+formatA(gainAll)+'</u>'
	}else{
		gainAll = formatA(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green><mul>×</mul></green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><mul>×</mul> `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceBaseCapped(name,base,cappedAll,id){
	if(cappedAll.eq(getResourceCapped(id))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+`</div>`+cappedAll+`
	</span></left>`
}

function tooltipResourceBaseCappedMultiplication(name,base,mul,cappedAll,id){
	if(cappedAll.eq(getResourceCapped(id))){
		cappedAll = '<u>'+formatA(cappedAll)+'</u>'
	}else{
		cappedAll = formatA(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+cappedAll+`
	</span></left>`
}

function tooltip(id,id2){
	if(id2=='LoadTooltipResource'){
		let bas = ''
		if(main['resource'][id]['tooltip']!=undefined){
			bas = '<hr>'+main['resource'][id]['tooltip']()
		}
		let gain = ''
		let cost = ''
		let mul = ''
		let div = ''
		let time = ''
		let gainAll = n(0)
		if(main['resource'][id]['gain']!==undefined){
			gainAll = gainAll.add(main['resource'][id]['gain']())
			if(!gainAll.eq(0)){
				let gainName = '基础'
				let gainBase = main['resource'][id]['gain']()
				if(main['resource'][id]['gainTooltip']!==undefined){
					gainName = main['resource'][id]['gainTooltip']()
				}
				if(n(gainBase).gt(0)){
					gain += tooltipResourceGain(true,gainName,gainBase,gainAll,id)
				}else{
					cost += tooltipResourceGain(false,gainName,gainBase,gainAll,id)
				}
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['gain']!==undefined){
						if(main['resource'][i]['effect']['gain']['add']!==undefined){
							for(let ig in main['resource'][i]['effect']['gain']['add']){
								let gainName = main['resource'][i]['name']()
								let gainBase = main['resource'][i]['effect']['gain']['add'][ig]()
								let gainMul = player['resource'][i]
								if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
									gainAll = gainAll.add(n(gainBase).mul(gainMul))
									if(n(gainBase).mul(gainMul).gt(0)){
										gain += tooltipResourceGainMultiplication(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceGainMultiplication(false,gainName,gainBase,gainMul,gainAll,id)
									}
								}
							}
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']!==undefined){
					if(main['building'][i]['effect']['gain']!==undefined){
						if(main['building'][i]['effect']['gain']['add']!==undefined){
							for(let ig in main['building'][i]['effect']['gain']['add']){
								let gainName = main['building'][i]['name']()
								let gainBase = getBuildGainBase(i, ig)
								let gainMul = player['building'][i]
								if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
									gainAll = gainAll.add(n(gainBase).mul(gainMul))
									if(n(gainBase).mul(gainMul).gt(0)){
										gain += tooltipResourceGainMultiplication(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceGainMultiplication(false,gainName,gainBase,gainMul,gainAll,id)
									}
								}
							}
						}
					}
				}
			}
			for(let i in civics['citizens']){
				if(civics['citizens'][i]['effect']!==undefined){
					if(civics['citizens'][i]['effect']['gain']!==undefined){
						if(civics['citizens'][i]['effect']['gain']['add']!==undefined){
							for(let ig in civics['citizens'][i]['effect']['gain']['add']){
								let gainName = civics['citizens'][i]['name']()
								let gainBase = nc(civics['citizens'][i]['effect']['gain']['add'][ig]())
								let gainMul = player.citizens[i]
								if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
									gainAll = gainAll.add(n(gainBase).mul(gainMul))
									if(n(gainBase).mul(gainMul).gt(0)){
										gain += tooltipResourceGainMultiplication(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceGainMultiplication(false,gainName,gainBase,gainMul,gainAll,id)
									}
								}
							}
						}
					}
				}
			}
			if(main['resource'][id]['mul']!==undefined){
				gainAll = gainAll.mul(main['resource'][id]['mul']())
				if(!gainAll.eq(1)){
					let gainName = '基础'
					let gainBase = main['resource'][id]['mul']()
					if(main['resource'][id]['mulTooltip']!==undefined){
						gainName = main['resource'][id]['mulTooltip']()
					}
					if(n(gainBase).gt(1)){
						div += tooltipResourceMulGain(true,gainName,gainBase,gainAll,id)
					}else{
						mul += tooltipResourceMulGain(false,gainName,gainBase,gainAll,id)
					}
				}
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['gain']!==undefined){
						if(main['resource'][i]['effect']['gain']['mul']!==undefined){
							for(let ig in main['resource'][i]['effect']['gain']['mul']){
								let gainName = main['resource'][i]['name']()
								let gainBase = main['resource'][i]['effect']['gain']['mul'][ig]()
								let gainMul = player['resource'][i]
								if(id==ig && !n(gainBase).mul(gainMul).eq(1)){
									gainAll = gainAll.mul(n(gainBase).mul(gainMul).add(1))
									if(n(gainBase).mul(gainMul).gt(1)){
										div += tooltipResourceMulGainMultiplication(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										mul += tooltipResourceMulGainMultiplication(false,gainName,gainBase,gainMul,gainAll,id)
									}
								}
							}
						}
					}
				}
			}/*
			for(let i in civics['workshop']){
				if(civics['workshop'][i]['effect']!==undefined){
					if(civics['workshop'][i]['effect']['resource']!==undefined){
						let gainBase = n(1)
						for(let iw in civics['workshop'][i]['effect']['resource']){
							if(player['workshop'][i]){
								if(civics['workshop'][i]['effect']['resource'][iw]['gain']!==undefined){
									if(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']!==undefined){
										if(id==iw && !n(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']()).eq(1)){
											gainBase = gainBase.mul(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']())
										}
									}
								}
							}
						}
						let gainName = '工坊'
						if(!n(gainBase).eq(1)){
							gainAll = gainAll.mul(gainBase)
							if(n(gainBase).gt(1)){
								div += tooltipResourceMulGain(true,gainName,gainBase,gainAll,id)
							}else{
								mul += tooltipResourceMulGain(false,gainName,gainBase,gainAll,id)
							}
						}
					}
				}
			}*/
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + cost + gain + div + mul
			if(gainAll.eq(0)){
				gain = ''
			}
			if(main['resource'][id]['capped']!==undefined){
				time = '<hr>无法抵达上限'
				if(player['resource'][id].gte(getResourceCapped(id))){
					time = '<hr>已抵达上限'
				}else if(main['resource'][id]['gain']!==undefined){
					if(n(getResourceGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceCapped(id)).sub(player['resource'][id]).div(getResourceGain(id)))+'后抵达上限'
					}else if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
					}
				}
			}
		}
		let capped = ''
		let cappedAll = n(0)
		if(main['resource'][id]['capped']!==undefined){
			cappedAll = cappedAll.add(main['resource'][id]['capped']())
			if(!cappedAll.eq(0)){
				let cappedName = '基础'
				let cappedBase = main['resource'][id]['capped']()
				if(main['resource'][id]['cappedTooltip']!==undefined){
					cappedName = main['resource'][id]['cappedTooltip']()
				}
				capped += tooltipResourceBaseCapped(cappedName,cappedBase,cappedAll,id)
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['capped']!==undefined){
						if(main['resource'][i]['effect']['capped']['add']!==undefined){
							for(let im in main['resource'][i]['effect']['capped']['add']){
								let cappedName = main['resource'][i]['name']()
								let cappedBase = main['resource'][i]['effect']['capped']['add'][im]()
								let cappedMul = player['resource'][i]
								if(id==im && !n(cappedBase).mul(cappedMul).eq(0)){
									cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
									capped += tooltipResourceBaseCappedMultiplication(cappedName,cappedBase,cappedMul,cappedAll,id)
								}
							}
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']!==undefined){
					if(main['building'][i]['effect']['capped']!==undefined){
						if(main['building'][i]['effect']['capped']['add']!==undefined){
							for(let im in main['building'][i]['effect']['capped']['add']){
								let cappedName = main['building'][i]['name']()
								let cappedBase = main['building'][i]['effect']['capped']['add'][im]()
								let cappedMul = player['building'][i]
								if(id==im && !n(cappedBase).mul(cappedMul).eq(0)){
									cappedAll = cappedAll.add(n(cappedBase).mul(cappedMul))
									capped += tooltipResourceBaseCappedMultiplication(cappedName, cappedBase, cappedMul, cappedAll, id)
								}
							}
						}
					}
				}
			}
			if(cappedAll.eq(0)){
				capped = ''
			}
			capped = "<hr><a style='font-size: 14px'>资源储存</a>" + capped
		}
		let num = ''
		let numNumber = n(0)
		if(main['resource'][id]['number']!==undefined){
			num += "<hr><a style='font-size: 14px'>资源数量</a>"
			numNumber = numNumber.add(main['resource'][id]['number']())
			let now = format(numNumber)
			if(numNumber.eq(getResourceBaseNumber(id))){
				now = '<u>'+format(numNumber)+'</u>'
			}
			if(!numNumber.eq(0)){
				num += `<left><span>
					<div style="width: 160px; display: table-cell"><green>+</green></i> 基础</div>
					<div style="width: 160px; display: table-cell">+`+format(main['resource'][id]['number']())+`</div>`+now+`
				</span></left>`
			}
			if(numNumber.eq(0)){
				num = ''
			}
		}
		return getTooltipDoc(colorText(id)[1]+"<small>"+bas+gain+capped+num+time+'</small>')
	}

	if(id2=='LoadTooltipAction'){
		let name = '未命名'
		if(main['action'][id]['name']!=undefined){
			name = main['action'][id]['name']()
		}
		if(main['action'][id]['tooltip']!=undefined){
			return getTooltipDoc(name+'<hr><small>'+main['action'][id]['tooltip']())
		}else{
			return getTooltipDoc('未命名')
		}
    }

	if(id2=='LoadTooltipBuilding'){
		let name = '未命名'
		let bas = ''
		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		if(main['building'][id]['tooltip']!==undefined){
			bas = '<hr>'+main['building'][id]['tooltip']()
		}
		if(main['building'][id]['name']!==undefined){
			name = main['building'][id]['name']()
		}
		if(main['building'][id]['cost']!==undefined){
			for(let i in main['building'][id]['cost']){
				cost += costText(colorText(i)[1], i, n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1))
			}
		}
		cost += '</left>'
		let gain = ''
		let gainhr = ''
		if(main['building'][id]['effect']['gain']!==undefined){
			if(main['building'][id]['effect']['gain']['add']!==undefined){
				for(let i in main['building'][id]['effect']['gain']['add']){
					if(!n(main['building'][id]['effect']['gain']['add'][i]()).eq(0)){
						gainhr = `<hr><a style='font-size: 14px'>生产</a>`
						gain += effectText(colorText(i)[1], '+', getBuildGainBase(id, i), '/s', player['building'][id], null)
					}
				}
			}
		}
		gain += ''
		let capped = ''
		let cappedhr = ''
		if(main['building'][id]['effect']['capped']!==undefined){
			if(main['building'][id]['effect']['capped']['add']!==undefined){
				for(let i in main['building'][id]['effect']['capped']['add']){
					if(!n(main['building'][id]['effect']['capped']['add'][i]()).eq(0)){
						cappedhr = `<hr><a style='font-size: 14px'>上限</a>`
						capped += effectText(colorText(i)[1], '+', getBuildCappedBase(id, i), '上限', player['building'][id], null)
					}
				}
			}
		}
		capped += ''
		let amount = '('+formatWhole(player['building'][id],0)+')'
		if(main['building'][id]['unique']!==undefined){
			if(main['building'][id]['unique']()){
				amount = ''
			}
		}
		return getTooltipDoc(name+amount+'<small>'+bas+cost+gainhr+gain+cappedhr+capped+'</samll>')
	}

	if(id2=='LoadTooltipCraft'){
		let name = '未命名'
		if(main['craft'][id]['name']!=undefined){
			name = main['craft'][id]['name']()
		}
		if(main['craft'][id]['tooltip']!=undefined){
			return getTooltipDoc(name+'<hr><small>'+main['craft'][id]['tooltip']())
		}else{
			return getTooltipDoc('未命名')
		}
	}

	if(id2=='LoadTooltipCitizens'){
		let too = ''
		let action = ''
		let actionhr = ''
		let gain = ''
		let gainhr = ''
		let other = ''
		let otherhr = ''
		if(civics['citizens'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['citizens'][id]['tooltip']()
		}
		if(civics['citizens'][id]['effect']!==undefined){
			if(civics['citizens'][id]['effect']['action']!==undefined){
				for(let ia in civics['citizens'][id]['effect']['action']){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(main['action'][ia]['name'](), '', nc(civics['citizens'][id]['effect']['action'][ia]()), '/s', player.citizens[id])
				}
			}
			if(civics['citizens'][id]['effect']['craft']!==undefined){
				for(let ic in civics['citizens'][id]['effect']['craft']){
					actionhr = `<hr><a style='font-size: 14px'>行动</a>`
					action += effectText(main['craft'][ic]['name'](), '', nc(civics['citizens'][id]['effect']['craft'][ic]()), '/s', player.citizens[id])
				}
			}
			if(civics['citizens'][id]['effect']['gain']!==undefined){
				if(civics['citizens'][id]['effect']['gain']['add']!==undefined){
					for(let i in civics['citizens'][id]['effect']['gain']['add']){
						gainhr = `<hr><a style='font-size: 14px'>生产</a>`
						gain += effectText(colorText(i)[1], '+', civics['citizens'][id]['effect']['gain']['add'][i](), '/s', player.citizens[id])
					}
				}
			}
			if(civics['citizens'][id]['effect']['other']!==undefined){
				for(let i in civics['citizens'][id]['effect']['other']){
					otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
					other += effectText(civics['citizens'][id]['effect']['other'][i]['name'](), civics['citizens'][id]['effect']['other'][i]['display']()[0], civics['citizens'][id]['effect']['other'][i]['effect'](), civics['citizens'][id]['effect']['other'][i]['display']()[1], player.citizens[id])
				}
			}
		}
		return getTooltipDoc(civics['citizens'][id]['name']()+'<small>'+too+actionhr+action+gainhr+gain+otherhr+other+'</small>')
	}

	if(id2=='LoadTooltipCitizenJobs'){
		let too = ''
		if(civics['jobs'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['jobs'][id]['tooltip']()
		}
		return getTooltipDoc(civics['jobs'][id]['name']()+'<small>'+too+'</small>')
	}

	if(id2=='LoadTooltipWorkshop'){
		let too = ''
		let keep = ''
		let cost = `<hr><a style='font-size: 14px'>需求</a><left>`
		let gainhr = ''
		let gain = ''
		let buildinghr = ''
		let building = ''
		let otherhr = ''
		let other = ''
		let unlockedhr = ''
		let unlocked = ''
		if(civics['workshop'][id]['tooltip']!==undefined){
			too = '<hr>'+civics['workshop'][id]['tooltip']()
		}
		if(civics['workshop'][id]['keep']!==undefined){
			if(civics['workshop'][id]['keep']()){
				keep = '<righttip>文化遗传</righttip>'
			}
		}
		if(civics['workshop'][id]['cost']!==undefined){
			for(let i in civics['workshop'][id]['cost']){
				cost += costText(colorText(i)[1], i, civics['workshop'][id]['cost'][i]())
			}
		}
		if(civics['workshop'][id]['effect']!==undefined){
			if(civics['workshop'][id]['effect']['resource']!==undefined){
				for(let i in civics['workshop'][id]['effect']['resource']){
					if(civics['workshop'][id]['effect']['resource'][i]!==undefined){
						if(civics['workshop'][id]['effect']['resource'][i]['gain']!==undefined){
							if(civics['workshop'][id]['effect']['resource'][i]['gain']['mul']!==undefined){
								gainhr = `<hr><a style='font-size: 14px'>生产</a>`
								gain += effectText(colorText(i)[1], '产量<mul>×</mul>', civics['workshop'][id]['effect']['resource'][i]['gain']['mul'](), '', null, null, false)
							}
						}
					}
				}
			}
			if(civics['workshop'][id]['effect']['building']!==undefined){
				for(let i in civics['workshop'][id]['effect']['building']){
					if(civics['workshop'][id]['effect']['building'][i]['effect']!==undefined){
						if(civics['workshop'][id]['effect']['building'][i]['effect']['mul']!==undefined){
							buildinghr = `<hr><a style='font-size: 14px'>建筑</a>`
							building += effectText(main['building'][i]['name'](), '效率<mul>×</mul>', civics['workshop'][id]['effect']['building'][i]['effect']['mul'](), '', null, null, false)
						}
					}
				}
			}
			if(civics['workshop'][id]['effect']['other']!==undefined){
				for(let i in civics['workshop'][id]['effect']['other']){
					otherhr = `<hr><a style='font-size: 14px'>特殊</a>`
					other += effectText(civics['workshop'][id]['effect']['other'][i]['name'](), civics['workshop'][id]['effect']['other'][i]['display']()[0], civics['workshop'][id]['effect']['other'][i]['effect'](), civics['workshop'][id]['effect']['other'][i]['display']()[1], null, null, false)
				}
			}
			if(civics['workshop'][id]['effect']['unlocked']!==undefined){
				for(let i in civics['workshop'][id]['effect']['unlocked']){
					unlockedhr = `<hr><a style='font-size: 14px'>解锁</a>`
					unlocked += `<left><green>+</green> `+civics['workshop'][id]['effect']['unlocked'][i]()+`</left>`
				}
			}
		}
		cost += '</left>'
		return getTooltipDoc(civics['workshop'][id]['name']()+keep+'<small>'+too+cost+gainhr+gain+buildinghr+building+otherhr+other+unlockedhr+unlocked+'</samll>')
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
		return getTooltipDoc(name+'<hr><small>'+too+'<left><li-hid>-> 总计: '+formatScientific(n(getEfficient(id)).mul(100),1)+'%</left></small>')
	}
}