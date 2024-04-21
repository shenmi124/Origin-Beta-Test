var TOOLTIPSEL

function tooltipLoad(id,id2,onClick=`onclick='document.getElementById("tooltip").style.display="none"`){
	return `onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display="none";window.clearInterval(TOOLTIPSEL)'`+onClick+`;window.clearInterval(TOOLTIPSEL)'`
}

function mouseLoad(id,id2){
	document.getElementById("tooltip").style.display = ''
	tooltip(id,id2)
	TOOLTIPSEL = self.setInterval(function(){
		tooltip(id,id2)
	},50)
}

function tooltipResource(boolean,name,number,gainAll,id){
	if(gainAll.eq(getResourceBaseGain(id))){
		gainAll = '<u>'+format(gainAll)+'</u>'
	}else{
		gainAll = format(gainAll)
	}
	if(boolean){
		return `<left><span>
			<div style="width: 160px; display: table-cell"><green>+</green></i> `+name+`</div>
			<div style="width: 160px; display: table-cell">+`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}else{
		return `<left><span style="color: red">
			<div style="width: 160px; display: table-cell"><red>-</red> `+name+`</div>
			<div style="width: 160px; display: table-cell">`+format(number)+`</div>`+gainAll+`
		</span></left>`
	}
}

function tooltipResourceMul(boolean,name,base,mul,gainAll,id){
	if(gainAll.eq(getResourceBaseGain(id))){
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

function tooltip(id,id2){
	if(id2=='TooltipLoadResource'){
		let bas = ''
		if(main['resource'][id]['tooltip']!=undefined){
			bas = '<hr>'+main['resource'][id]['tooltip']()
		}
		let gain = ''
		let time = ''
		let cost = ''
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
					gain += tooltipResource(true,gainName,gainBase,gainAll,id)
				}else{
					cost += tooltipResource(false,gainName,gainBase,gainAll,id)
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
									if(!n(gainBase).eq(0)){
										if(n(gainBase).mul(gainMul).gt(0)){
											gain += tooltipResourceMul(true,gainName,gainBase,gainMul,gainAll,id)
										}else{
											cost += tooltipResourceMul(false,gainName,gainBase,gainMul,gainAll,id)
										}
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
									if(!n(gainBase).eq(0)){
										if(n(gainBase).mul(gainMul).gt(0)){
											gain += tooltipResourceMul(true,gainName,gainBase,gainMul,gainAll,id)
										}else{
											cost += tooltipResourceMul(false,gainName,gainBase,gainMul,gainAll,id)
										}
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
									if(!n(gainBase).eq(0)){
										if(n(gainBase).mul(gainMul).gt(0)){
											gain += tooltipResourceMul(true,gainName,gainBase,gainMul,gainAll,id)
										}else{
											cost += tooltipResourceMul(false,gainName,gainBase,gainMul,gainAll,id)
										}
									}
								}
							}
						}
					}
				}
			}
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + cost + gain
			if(gainAll.eq(0)){
				gain = ''
			}
			if(main['resource'][id]['max']!==undefined){
				time = '<hr>无法抵达上限'
				if(player['resource'][id].gte(getResourceBaseMax(id))){
					time = '<hr>已抵达上限'
				}else if(main['resource'][id]['gain']!==undefined){
					if(n(getResourceBaseGain(id)).gt(0)){
						time = '<hr>'+formatTime(n(getResourceBaseMax(id)).sub(player['resource'][id]).div(getResourceBaseGain(id)))+'后抵达上限'
					}else if(n(getResourceBaseGain(id)).lt(0) && !player['resource'][id].eq(0)){
						time = '<hr>'+formatTime(player['resource'][id].div(getResourceBaseGain(id)).abs())+'后耗尽'
					}
				}
			}
		}
		let max = ''
		let maxNumber = n(0)
		if(main['resource'][id]['max']!==undefined){
			max += "<hr><a style='font-size: 14px'>资源储存</a>"
			maxNumber = maxNumber.add(main['resource'][id]['max']())
			let now = format(maxNumber)
			if(maxNumber.eq(getResourceBaseMax(id))){
				now = '<u>'+format(maxNumber)+'</u>'
			}else{
				now = format(maxNumber)
			}
			if(!maxNumber.eq(0)){
				max += `<left><span>
					<div style="width: 160px; display: table-cell"><green>+</green> 基础</div>
					<div style="width: 160px; display: table-cell">+`+format(main['resource'][id]['max']())+`</div>`+now+`
				</span></left>`
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['max']!==undefined){
						for(let im in main['resource'][i]['effect']['max']){
							if(id==im && !n(main['resource'][i]['effect']['max'][im]()).mul(player['resource'][i]).eq(0)){
								maxNumber = maxNumber.add(n(main['resource'][i]['effect']['max'][im]()).mul(player['resource'][i]))
								if(maxNumber.eq(getResourceBaseMax(id))){
									now = '<u>'+format(maxNumber)+'</u>'
								}else{
									now = format(maxNumber)
								}
								if(!maxNumber.eq(0)){
									max += `<left><span>
										<div style="width: 160px; display: table-cell"><green>+</green> `+main['resource'][i]['name']()+`</div>
										<div style="width: 160px; display: table-cell">+`+format(main['resource'][i]['effect']['max'][im]())+` <a style="font-size: small">×</a> `+formatWhole(player['resource'][i])+`</div>`+now+`
									</span></left>`
								}
							}
						}
					}
				}
			}
			for(let i in main['building']){
				if(main['building'][i]['effect']!==undefined){
					if(main['building'][i]['effect']['max']!==undefined){
						for(let im in main['building'][i]['effect']['max']){
							if(id==im && !n(main['building'][i]['effect']['max'][im]()).mul(player['building'][i]).eq(0)){
								maxNumber = maxNumber.add(n(main['building'][i]['effect']['max'][im]()).mul(player['building'][i]))
								if(maxNumber.eq(getResourceBaseMax(id))){
									now = '<u>'+format(maxNumber)+'</u>'
								}else{
									now = format(maxNumber)
								}
								if(!maxNumber.eq(0)){
									max += `<left><span>
										<div style="width: 160px; display: table-cell"><green>+</green> `+main['building'][i]['name']()+`</div>
										<div style="width: 160px; display: table-cell">+`+format(main['building'][i]['effect']['max'][im]())+` <a style="font-size: small">×</a> `+formatWhole(player['building'][i])+`</div>`+now+`
									</span></left>`
								}
							}
						}
					}
				}
			}
			if(maxNumber.eq(0)){
				max = ''
			}
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

	if(id2=='TooltipLoadAction'){
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

	if(id2=='TooltipLoadBuilding'){
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
					if(n(getResourceBaseGain(i)).gt(0) && player['resource'][i].lt(res) && n(getResourceBaseMax(i)).gte(res)){
						time = ' ( '+formatTime(n(res).sub(player['resource'][i]).div(getResourceBaseGain(i)))+' )'
					}else if(n(getResourceBaseMax(i)).lt(res)){
						time = ' ( '+format(n(getResourceBaseMax(i)).sub(res))+' )'
					}
				}
				cost += `
				<span>
					<span>
						<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
						<div style="width: 55px; display: table-cell; color: `+(player['resource'][i].gte(res) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][i])+`</div>
					</span>
					<span style="color: rgb(31, 70, 71);"> / 
						<div style="text-align: right; width: 55px; display: table-cell; color: `+(n(getResourceBaseMax(i)).gte(res) ? `` : `red` )+`">`+format(res)+`</div>
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
			for(let i in main['building'][id]['effect']['max']){
				if(!n(main['building'][id]['effect']['max'][i]()).eq(0)){
					maxhr = '<hr>'
					max += `<span>
						<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
						上限+`+format(main['building'][id]['effect']['max'][i]())+`
						<br><div style="width: 65px; display: table-cell"></div>
						`+(instant ? `` : `<tip><li-hid>(总计: `+format(getBuildMax(id,i))+`)</tip>`)+`
					</span><br>`
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

	if(id2=='TooltipLoadCraft'){
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

	if(id2=='TooltipLoadCitizens'){
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

	if(id2=='efficient'){
		let name = ''
		let too = ''
		let active = false
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
				active = true
				if(n(efficient[id][i]['effect']()).lt(0)){
					too += `<red><left><span>
						<span style="width: 70px; display: table-cell">`+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left></red>`
				}else if(n(efficient[id][i]['effect']()).gt(0)){
					too += `<left><span>
						<span style="width: 70px; display: table-cell">`+efficient[id][i]['name']()+`:</span>
						<span>`+formatScientific(n(efficient[id][i]['effect']()),1)+`%</span>
					</span></left>`
				}
			}
		}
		return getTooltipDoc(name+'<hr><small>'+too+'<left><li-hid>- 总计: '+formatScientific(n(getEfficient(id)).mul(100),1)+'%</left></small>')
	}
	
	if(id2=='TooltipLoadResearch'){
		let cost = '<left><hr>'
		let res = Number(player['research'][id])
		for(i in mainResearch['main'][id]['cost'][res]){
			let time = ''
			if(n(getResourceBaseGain(i)).gt(0) && n(player['resource'][i]).lt(mainResearch['main'][id]['cost'][res][i]()) && n(getResourceBaseMax(i)).gte(mainResearch['main'][id]['cost'][res][i]())){
			if(main['resource'][i]['gain']!==undefined){
					time = ' ( '+formatTime(n(mainResearch['main'][id]['cost'][res][i]()).sub(player['resource'][i]).div(getResourceBaseGain(i)))+' )'
				}else if(n(getResourceBaseMax(i)).lt(mainResearch['main'][id]['cost'][res][i]())){
					time = ' ( '+format(n(getResourceBaseMax(i)).sub(mainResearch['main'][id]['cost'][res][i]()))+' )'
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
					<div style="text-align: right; width: 55px; display: table-cell; color: `+(n(getResourceBaseMax(i)).gte(mainResearch['main'][id]['cost'][res][i]()) ? `` : `red` )+`">`+format(mainResearch['main'][id]['cost'][res][i]())+`</div>
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