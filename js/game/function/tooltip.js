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

function tooltipResourceBaseGain(boolean,name,number,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+format(gainAll)+'</u>'
	}else{
		gainAll = format(gainAll)
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

function tooltipResourceBaseGainMul(boolean,name,base,mul,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+format(gainAll)+'</u>'
	}else{
		gainAll = format(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">- `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceMulGain(boolean,name,number,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+format(gainAll)+'</u>'
	}else{
		gainAll = format(gainAll)
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

function tooltipResourceMulGainMul(boolean,name,base,mul,gainAll,id){
	if(gainAll.eq(getResourceGain(id))){
		gainAll = '<u>'+format(gainAll)+'</u>'
	}else{
		gainAll = format(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>×</green> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell">× `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceBaseCapped(name,base,cappedAll,id){
	if(cappedAll.eq(getResourceCapped(id))){
		cappedAll = '<u>'+format(cappedAll)+'</u>'
	}else{
		cappedAll = format(cappedAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+`</div>`+cappedAll+`
	</span></left>`
}

function tooltipResourceBaseCappedMul(name,base,mul,cappedAll,id){
	if(cappedAll.eq(getResourceCapped(id))){
		cappedAll = '<u>'+format(cappedAll)+'</u>'
	}else{
		cappedAll = format(cappedAll)
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
					gain += tooltipResourceBaseGain(true,gainName,gainBase,gainAll,id)
				}else{
					cost += tooltipResourceBaseGain(false,gainName,gainBase,gainAll,id)
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
										gain += tooltipResourceBaseGainMul(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceBaseGainMul(false,gainName,gainBase,gainMul,gainAll,id)
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
								let gainBase = main['building'][i]['effect']['gain']['add'][ig]()
								let gainMul = player['building'][i]
								if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
									gainAll = gainAll.add(n(gainBase).mul(gainMul))
									if(n(gainBase).mul(gainMul).gt(0)){
										gain += tooltipResourceBaseGainMul(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceBaseGainMul(false,gainName,gainBase,gainMul,gainAll,id)
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
										gain += tooltipResourceBaseGainMul(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceBaseGainMul(false,gainName,gainBase,gainMul,gainAll,id)
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
								if(id==ig && !n(gainBase).mul(gainMul).eq(0)){
									gainAll = gainAll.mul(n(gainBase).mul(gainMul).add(1))
									if(n(gainBase).mul(gainMul).gt(1)){
										gain += tooltipResourceMulGainMul(true,gainName,gainBase,gainMul,gainAll,id)
									}else{
										cost += tooltipResourceMulGainMul(false,gainName,gainBase,gainMul,gainAll,id)
									}
								}
							}
						}
					}
				}
			}
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
									capped += tooltipResourceBaseCappedMul(cappedName,cappedBase,cappedMul,cappedAll,id)
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
									capped += tooltipResourceBaseCappedMul(cappedName,cappedBase,cappedMul,cappedAll,id)
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
						gain += effectText(colorText(i)[1], '+', n(main['building'][id]['effect']['gain']['add'][i]()), '/s', player['building'][id], null)
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
						capped += effectText(colorText(i)[1], '+', n(main['building'][id]['effect']['capped']['add'][i]()), '上限', player['building'][id], null)
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
		let unlocked = ''
		let unlockedhr = ''
		let other = ''
		let otherhr = ''
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
		return getTooltipDoc(civics['workshop'][id]['name']()+keep+'<small>'+too+cost+otherhr+other+unlockedhr+unlocked+'</samll>')
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
	
	if(id2=='LoadTooltipResearch'){
		let cost = '<left><hr>'
		let res = Number(player['research'][id])
		for(i in mainResearch['main'][id]['cost'][res]){
			let time = ''
			if(n(getResourceGain(i)).gt(0) && n(player['resource'][i]).lt(mainResearch['main'][id]['cost'][res][i]()) && n(getResourceCapped(i)).gte(mainResearch['main'][id]['cost'][res][i]())){
			if(main['resource'][i]['gain']!==undefined){
					time = ' ( '+formatTime(n(mainResearch['main'][id]['cost'][res][i]()).sub(player['resource'][i]).div(getResourceGain(i)))+' )'
				}else if(n(getResourceCapped(i)).lt(mainResearch['main'][id]['cost'][res][i]())){
					time = ' ( '+format(n(getResourceCapped(i)).sub(mainResearch['main'][id]['cost'][res][i]()))+' )'
				}else{
					time = ''
				}
			}
			cost += `
			<span>
				<span>
					<div style="width: 80px; display: table-cell">`+colorText(i)[1]+`</div>
					<div style="width: 55px; display: table-cell; color: `+(player['resource'][i].gte(mainResearch['main'][id]['cost'][res][i]()) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][i])+`</div>
				</span>
				<span style="color: rgb(31, 70, 71);"> / 
					<div style="text-align: right; width: 55px; display: table-cell; color: `+(n(getResourceCapped(i)).gte(mainResearch['main'][id]['cost'][res][i]()) ? `` : `red` )+`">`+format(mainResearch['main'][id]['cost'][res][i]())+`</div>
				</span>
			</span>
			<black>`+time+`</black><br>`
		}
		if(player.canMainResearch[id]==true){
			if(player.research.conducted==id){
				cost = '<hr>再次点击取消研究<left>'
			}else{
				cost = player.research.conducted==undefined ? '<hr>再次点击开始研究<left>' : '<hr>再次点击切换研究<left>'
			}
		}
		if(player.research.conducted==undefined || player.research.conducted==id){
			cost += '<hr><span><div style="width: 50px; display: table-cell"><span style="color:'+colorText('researchPoints')[0]+'">科学</span></div>'+format(researchRequire(id))+'</div> ('+format(player.resource.researchPoints)+')</span></left>'
		}else{
			cost += `<hr><span>
				<div style="width: 50px; display: table-cell"><span style="color:`+colorText('researchPoints')[0]+`">科学</span></div>`+format(researchRequire(player.research.conducted))+`</div>
			</span>
			<hr><span>
				正在进行研究: `+mainResearch['main'][player.research.conducted]['name']()+`
			</span>
			<br><li-hid><span>
				<div style="width: 50px; display: table-cell"><span style="color:`+colorText('researchPoints')[0]+`">科学
			</span>
			</div>`+format(researchRequire(id))+`</div> (`+format(player.resource.researchPoints)+`)</span>`
		}
		if(player.research[id].gte(mainResearch['main'][id]['capped']())){
			cost = '<hr>研究完成'
		}
		let effect = '<hr><left>效果( <span style="color:'+colorText('researchPoints')[0]+'">'+res+'</span>'+(player.research[id].gte(mainResearch['main'][id]['capped']()) ? '' : ' + <green>1</green>')+' ):'
		for(i in mainResearch['main'][id]['effect']){
			for(ii in mainResearch['main'][id]['effect'][i]){
				if(n(i).lt(mainResearch['main'][id]['capped']())){
					if(player.research[id].eq(i)){
						effect += `<br>`+(mainResearch['main'][id]['effect'][i][ii]()[1] ? `<green>(<green>+</green>)</green>` : `<yellow>(<i class="fa  fa-rotate-right"></i>)</yellow>`)+'<span style="color: rgb(31, 70, 71);">'+mainResearch['main'][id]['effect'][i][ii]()[0]+'</span>'
					}else if(player.research[id].gte(i)){
						effect += (mainResearch['main'][id]['effect'][i][ii]()[1] ? `<br><li-hid>`+mainResearch['main'][id]['effect'][i][ii]()[0] : '')
					}
				}
			}
		}
		effect += '</left>'
		let tooltip = ''
		for(i in mainResearch['main'][id]['tooltip']){
			if(player.research[id].gte(i)){
				tooltip += (tooltip==='' ? '' : '<br>')+mainResearch['main'][id]['tooltip'][i]()
			}
		}
		return getTooltipDoc(mainResearch['main'][id]['name']()+'<hr><small>'+tooltip+effect+cost+'</small>')
	}

}