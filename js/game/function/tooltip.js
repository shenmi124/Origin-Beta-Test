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

function tooltipResourceBaseMax(name,base,maxAll,id){
	if(maxAll.eq(getResourceMaxBase(id))){
		maxAll = '<u>'+format(maxAll)+'</u>'
	}else{
		maxAll = format(maxAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+`</div>`+maxAll+`
	</span></left>`
}

function tooltipResourceBaseMaxMul(name,base,mul,maxAll,id){
	if(maxAll.eq(getResourceMaxBase(id))){
		maxAll = '<u>'+format(maxAll)+'</u>'
	}else{
		maxAll = format(maxAll)
	}
	return `<left><span>
		<div style="width: 160px; display: table-cell"><green>+</green> `+name+`</div>
		<div style="width: 160px; display: table-cell">+`+format(base)+` <a style="font-size: small">×</a> `+formatWhole(mul)+`</div>`+maxAll+`
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
			if(main['resource'][id]['max']!==undefined){
				time = '<hr>无法抵达上限'
				if(player['resource'][id].gte(getResourceMaxBase(id))){
					time = '<hr>已抵达上限'
				}else if(main['resource'][id]['gain']!==undefined){
					if(n(getResourceGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceMaxBase(id)).sub(player['resource'][id]).div(getResourceGain(id)))+'后抵达上限'
					}else if(n(getResourceGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceGain(id)).abs())+'后耗尽'
					}
				}
			}
		}
		let max = ''
		let maxAll = n(0)
		if(main['resource'][id]['max']!==undefined){
			maxAll = maxAll.add(main['resource'][id]['max']())
			if(!maxAll.eq(0)){
				let maxName = '基础'
				let maxBase = main['resource'][id]['max']()
				if(main['resource'][id]['maxTooltip']!==undefined){
					maxName = main['resource'][id]['maxTooltip']()
				}
				max += tooltipResourceBaseMax(maxName,maxBase,maxAll,id)
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['max']!==undefined){
						if(main['resource'][i]['effect']['max']['add']!==undefined){
							for(let im in main['resource'][i]['effect']['max']['add']){
								let maxName = main['resource'][i]['name']()
								let maxBase = main['resource'][i]['effect']['max']['add'][im]()
								let maxMul = player['resource'][i]
								if(id==im && !n(maxBase).mul(maxMul).eq(0)){
									maxAll = maxAll.add(n(maxBase).mul(maxMul))
									max += tooltipResourceBaseMaxMul(maxName,maxBase,maxMul,maxAll,id)
								}
							}
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']!==undefined){
					if(main['building'][i]['effect']['max']!==undefined){
						if(main['building'][i]['effect']['max']['add']!==undefined){
							for(let im in main['building'][i]['effect']['max']['add']){
								let maxName = main['building'][i]['name']()
								let maxBase = main['building'][i]['effect']['max']['add'][im]()
								let maxMul = player['building'][i]
								if(id==im && !n(maxBase).mul(maxMul).eq(0)){
									maxAll = maxAll.add(n(maxBase).mul(maxMul))
									max += tooltipResourceBaseMaxMul(maxName,maxBase,maxMul,maxAll,id)
								}
							}
						}
					}
				}
			}
			if(maxAll.eq(0)){
				max = ''
			}
			max = "<hr><a style='font-size: 14px'>资源储存</a>" + max
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
		return getTooltipDoc(colorText(id)[1]+"<small>"+bas+gain+max+num+time+'</small>')
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
		let instant = false
		if(main['building'][id]['instant']!==undefined){
			instant = main['building'][id]['instant']()
		}
		let cost = '<hr><left>'
		if(main['building'][id]['tooltip']!==undefined){
			bas = '<hr>'+main['building'][id]['tooltip']()
		}
		if(main['building'][id]['name']!==undefined){
			name = main['building'][id]['name']()
		}
		if(main['building'][id]['cost']!==undefined){
			for(let i in main['building'][id]['cost']){
				let res = n(main['building'][id]['cost'][i]()).add(1).mul(player['building'][id].add(1)).pow(player['building'][id].mul(main['building'][id]['costPower']()).add(1)).sub(1)
				let time = ''
				if(main['resource'][i]['gain']!==undefined){
					if(n(getResourceGain(i)).gt(0) && player['resource'][i].lt(res) && n(getResourceMaxBase(i)).gte(res)){
						time = ' ( '+formatTime(n(res).sub(player['resource'][i]).div(getResourceGain(i)))+' )'
					}else if(n(getResourceMaxBase(i)).lt(res)){
						time = ' ( '+format(n(getResourceMaxBase(i)).sub(res))+' )'
					}
				}
				cost += `
				<span>
					<span>
						<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
						<div style="width: 55px; display: table-cell; color: `+(player['resource'][i].gte(res) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][i])+`</div>
					</span>
					<span style="color: rgb(31, 70, 71);"> / 
						<div style="text-align: right; width: 55px; display: table-cell; color: `+(n(getResourceMaxBase(i)).gte(res) ? `` : `red` )+`">`+format(res)+`</div>
					</span>
				</span><tip>
				`+time+`</tip><br>`
			}
		}
		cost += '</left>'
		let gain = '<left>'
		let gainhr = ''
		if(main['building'][id]['effect']['gain']!==undefined){
			if(main['building'][id]['effect']['gain']['add']!==undefined){
				for(let i in main['building'][id]['effect']['gain']['add']){
					if(!n(main['building'][id]['effect']['gain']['add'][i]()).eq(0)){
						gainhr = '<hr>'
						gain += `<span>
							<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
							+`+format(main['building'][id]['effect']['gain']['add'][i]())+`/s
							<br><div style="width: 65px; display: table-cell"></div>
							<tip><li-hid>(总计: `+format(getBuildGain(id,i))+`/s)</tip>
						</span><br>`
					}
				}
			}
		}
		gain += '</left>'
		let max = '<left>'
		let maxhr = ''
		if(main['building'][id]['effect']['max']!==undefined){
			if(main['building'][id]['effect']['max']['add']!==undefined){
				for(let i in main['building'][id]['effect']['max']['add']){
					if(!n(main['building'][id]['effect']['max']['add'][i]()).eq(0)){
						maxhr = '<hr>'
						max += `<span>
							<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
							上限+`+format(main['building'][id]['effect']['max']['add'][i]())+`
							<br><div style="width: 65px; display: table-cell"></div>
							`+(instant ? `` : `<tip><li-hid>(总计: `+format(getBuildMax(id,i))+`)</tip>`)+`
						</span><br>`
					}
				}
			}
		}
		max += '</left>'
		let amount = '('+formatWhole(player['building'][id],0)+')'
		if(main['building'][id]['instant']!==undefined){
			if(main['building'][id]['instant']()){
				amount = ''
			}
		}
		return getTooltipDoc(name+amount+'<small>'+bas+cost+gainhr+gain+maxhr+max+'</samll>')
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
		if(civics['citizens'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['citizens'][id]['tooltip']()
		}
		if(civics['citizens'][id]['effect']!==undefined){
			if(civics['citizens'][id]['effect']['action']!==undefined){
				for(let ia in civics['citizens'][id]['effect']['action']){
					actionhr = '<hr>'
					action += `<grey>每位`+civics['citizens'][id]['name']()+`将以`+format(civics['citizens'][id]['effect']['action'][ia]())+`的效率去自动进行`+main['action'][ia]['name']()+`</grey>`
					action += `<br>(总计:`+format(nc(civics['citizens'][id]['effect']['action'][ia]()).mul(getEfficient('action')).mul(player.citizens[id]))+`)`
				}
			}
			if(civics['citizens'][id]['effect']['craft']!==undefined){
				for(let ic in civics['citizens'][id]['effect']['craft']){
					actionhr = '<hr>'
					action += `<grey>每位`+civics['citizens'][id]['name']()+`将以`+format(civics['citizens'][id]['effect']['craft'][ic]())+`的效率去自动进行`+main['craft'][ic]['name']()+`</grey>`
					action += `<br>(总计:`+format(nc(civics['citizens'][id]['effect']['craft'][ic]()).mul(getEfficient('craft')).mul(player.citizens[id]))+`)`
				}
			}
			if(civics['citizens'][id]['effect']['gain']!==undefined){
				if(civics['citizens'][id]['effect']['gain']['add']!==undefined){
					for(let i in civics['citizens'][id]['effect']['gain']['add']){
						gainhr = '<hr>'
						gain += `<span>
							<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
							+`+format(civics['citizens'][id]['effect']['gain']['add'][i]())+`/s
							<br><div style="width: 65px; display: table-cell"></div>
							<tip><li-hid>(总计: `+format(nc(civics['citizens'][id]['effect']['gain']['add'][i]()).mul(player.citizens[id]))+`/s)</tip>
						</span><br>`
					}
				}
			}
		}
		return getTooltipDoc(civics['citizens'][id]['name']()+'<small>'+too+actionhr+action+gainhr+'<left>'+gain+'</left>')
	}
	if(id2=='LoadTooltipCitizenJobs'){
		let too = ''
		if(civics['jobs'][id]['tooltip']!==undefined){
			too += '<hr>'+civics['jobs'][id]['tooltip']()
		}
		return getTooltipDoc(civics['jobs'][id]['name']()+'<small>'+too)
	}

	if(id2=='efficient'){
		let name = ''
		let too = ''
		let act = true
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
			if(n(getResourceGain(i)).gt(0) && n(player['resource'][i]).lt(mainResearch['main'][id]['cost'][res][i]()) && n(getResourceMaxBase(i)).gte(mainResearch['main'][id]['cost'][res][i]())){
			if(main['resource'][i]['gain']!==undefined){
					time = ' ( '+formatTime(n(mainResearch['main'][id]['cost'][res][i]()).sub(player['resource'][i]).div(getResourceGain(i)))+' )'
				}else if(n(getResourceMaxBase(i)).lt(mainResearch['main'][id]['cost'][res][i]())){
					time = ' ( '+format(n(getResourceMaxBase(i)).sub(mainResearch['main'][id]['cost'][res][i]()))+' )'
				}else{
					time = ''
				}
			}
			cost += `
			<span>
				<span>
					<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
					<div style="width: 55px; display: table-cell; color: `+(player['resource'][i].gte(mainResearch['main'][id]['cost'][res][i]()) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][i])+`</div>
				</span>
				<span style="color: rgb(31, 70, 71);"> / 
					<div style="text-align: right; width: 55px; display: table-cell; color: `+(n(getResourceMaxBase(i)).gte(mainResearch['main'][id]['cost'][res][i]()) ? `` : `red` )+`">`+format(mainResearch['main'][id]['cost'][res][i]())+`</div>
				</span>
			</span><tip>
			`+time+`</tip><br>`
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
		if(player.research[id].gte(mainResearch['main'][id]['max']())){
			cost = '<hr>研究完成'
		}
		let effect = '<hr><left>效果( <span style="color:'+colorText('researchPoints')[0]+'">'+res+'</span>'+(player.research[id].gte(mainResearch['main'][id]['max']()) ? '' : ' + <green>1</green>')+' ):'
		for(i in mainResearch['main'][id]['effect']){
			for(ii in mainResearch['main'][id]['effect'][i]){
				if(n(i).lt(mainResearch['main'][id]['max']())){
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