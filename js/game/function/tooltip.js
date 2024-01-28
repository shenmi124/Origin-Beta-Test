var tooltipSel

function tooltipLoad(id,id2,onClick=`onclick='document.getElementById("tooltip").style.display = "none"`){
	return `onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display = "none";window.clearInterval(tooltipSel)' `+onClick+`;window.clearInterval(tooltipSel)'`
}

function tooltipU(number,id){
	let c = n(number).gte(0) ? '' : 'red'
	let nowNumber = format(number)
	if(n(number).eq(getResourceBaseGain(id))){
		nowNumber = '<u style="color: '+c+'">'+format(number)+'</u>'
	}else{
		nowNumber = '<t style="color: '+c+'">'+format(number)+'</t>'
	}
	return nowNumber
}

function mouseLoad(id,id2){
	document.getElementById("tooltip").style.display = ''
	tooltip(id,id2)
	tooltipSel = self.setInterval(function(){
		tooltip(id,id2)
	},50)
}

function tooltip(id,id2){
	if(id2=='TooltipLoadResource'){
		let bas = ''
		if(main['resource'][id]['tooltip']!=undefined){
			bas = '<hr>'+main['resource'][id]['tooltip']()
		}
		let res = ''
		if(main['resource'][id]['research']!=undefined){
			if(false){
				res += '<hr><span style="color:'+colorText('researchPoints')[0]+'">研究难度</span>: '+main['resource'][id]['research']()
			}
		}
		let gain = ''
		let cost = ''
		let gainNumber = n(0)
		let time = ''
		if(main['resource'][id]['gain']!==undefined){
			gainNumber = gainNumber.add(main['resource'][id]['gain']())
			let now = tooltipU(gainNumber,id)
			if(!gainNumber.eq(0)){
				let gT = '基础'
				let gN = n(main['resource'][id]['gain']()).gt(0) ? true : false
				if(main['resource'][id]['gainTooltip']!==undefined){
					gT = main['resource'][id]['gainTooltip']()
				}
				if(gN){
					gain += `<left><span>
						<div style="width: 160px; display: table-cell"><green>+</green></i> `+gT+`</div>
						<div style="width: 160px; display: table-cell">+`+format(main['resource'][id]['gain']())+`</div>`+now+`
					</span></left>`
				}else{
					cost += `<left><span style="color: red">
						<div style="width: 160px; display: table-cell"><red>-</red> `+gT+`</div>
						<div style="width: 160px; display: table-cell">`+format(main['resource'][id]['gain']())+`</div>`+now+`
					</span></left>`
				}
			}
			for(let i in main['resource']){
				if(main['resource'][i]['effect']!==undefined){
					if(main['resource'][i]['effect']['gain']!==undefined){
						for(let ig in main['resource'][i]['effect']['gain']){
							if(id==ig && !n(main['resource'][i]['effect']['gain'][ig]()).mul(player['resource'][i]).eq(0)){
								gainNumber = gainNumber.add(n(main['resource'][i]['effect']['gain'][ig]()).mul(player['resource'][i]))
								now = tooltipU(gainNumber,id)
								if(!gainNumber.eq(0)){
									let gN = n(main['resource'][i]['effect']['gain'][ig]()).mul(player['resource'][i]).gt(0) ? true : false
									if(gN){
										gain += `<left><span>
											<div style="width: 160px; display: table-cell"><green>+</green> `+main['resource'][i]['name']()+`</div>
											<div style="width: 160px; display: table-cell">+`+format(main['resource'][i]['effect']['gain'][ig]())+` <a style="font-size: small">×</a> `+formatWhole(player['resource'][i])+`</div>`+now+`
										</span></left>`
									}else{
										cost += `<left><span style="color: red">
											<div style="width: 160px; display: table-cell">- `+main['resource'][i]['name']()+`</div>
											<div style="width: 160px; display: table-cell">`+format(main['resource'][i]['effect']['gain'][ig]())+` <a style="font-size: small">×</a> `+formatWhole(player['resource'][i])+`</div>`+now+`
										</span></left>`
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
						for(let ig in main['building'][i]['effect']['gain']){
							if(id==ig && !n(main['building'][i]['effect']['gain'][ig]()).mul(player['building'][i]).eq(0)){
								gainNumber = gainNumber.add(n(main['building'][i]['effect']['gain'][ig]()).mul(player['building'][i]))
								now = tooltipU(gainNumber,id)
								if(!gainNumber.eq(0)){
									let gN = n(main['building'][i]['effect']['gain'][ig]()).mul(player['building'][i]).gt(0) ? true : false
									if(gN){
										gain += `<left><span>
											<div style="width: 160px; display: table-cell"><green>+</green> `+main['building'][i]['name']()+`</div>
											<div style="width: 160px; display: table-cell">+`+format(main['building'][i]['effect']['gain'][ig]())+` <a style="font-size: small">×</a> `+formatWhole(player['building'][i])+`</div>`+now+`
										</span></left>`
									}else{
										gain = `<left><span style="color: red">
											<div style="width: 160px; display: table-cell">- `+main['building'][i]['name']()+`</div>
											<div style="width: 160px; display: table-cell">`+format(main['building'][i]['effect']['gain'][ig]())+` <a style="font-size: small">×</a> `+formatWhole(player['building'][i])+`</div>`+now+`
										</span></left>` + gain
									}
								}
							}
						}
					}
				}
			}
			/*if(main['resource'][id]['mulResearch']!==undefined){
				gainNumber = gainNumber.mul(main['resource'][id]['mulResearch']())
				now = tooltipU(gainNumber,id)
				if(!gainNumber.eq(0)){
					gain += `<left><span>
						<div style="width: 160px; display: table-cell"><i class="fa fa-flask"></i> 研究</div>
						<div style="width: 160px; display: table-cell">×`+format(main['resource'][id]['mulResearch']())+`</div>`+now+`
					</span></left>`
				}
			}*/
			gain = "<hr><a style='font-size: 14px'>资源生产</a>" + cost + gain
			if(gainNumber.eq(0)){
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
		return getTooltipDoc(colorText(id)[1]+"<small>"+bas+res+gain+max+num+time+'</small>')
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
			for(let i in main['building'][id]['effect']['gain']){
				if(!n(main['building'][id]['effect']['gain'][i]()).eq(0)){
					gainhr = '<hr>'
					gain += `<span>
						<div style="width: 65px; display: table-cell">`+colorText(i)[1]+`</div>
						+`+format(main['building'][id]['effect']['gain'][i]())+`/s
						<br><div style="width: 65px; display: table-cell"></div>
						<tip><li-hid>(总计: `+format(getBuildGain(id,i))+`/s)</tip>
					</span><br>`
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

	if(id2=='TooltipLoadResearch'){
		let cost = '<left><hr>'
		let res = Number(player['research'][id])
		for(i in mainResearch['main'][id]['cost'][res]){
			let time = ''
			if(main['resource'][i]['gain']!==undefined){
				if(n(getResourceBaseGain(i)).gt(0) && n(player['resource'][i]).lt(mainResearch['main'][id]['cost'][res][i]()) && n(getResourceBaseMax(i)).gte(mainResearch['main'][id]['cost'][res][i]())){
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

	if(id2=='else'){
		if(id=='actionEfficient'){
			let too = ''
			let action = false
			for(i in efficient['action']){
				if(efficient['action'][i]['active']()){
					active = true
					if(n(efficient['action'][i]['effect']()).lte(0)){
						too += `<red><span>
							<div style="width: 100px; display: table-cell">`+efficient['action'][i]['name']()+`:</div>
							<span>`+formatScientific(n(efficient['action'][i]['effect']()),1)+`%</div>
						</span></red><br>`
					}else{
						too += `<span>
							<div style="width: 350px; display: table-cell">`+efficient['action'][i]['name']()+`:</div>
							<div>`+formatScientific(n(efficient['action'][i]['effect']()),1)+`%</div>
						</span><br>`
					}
				}
			}
			if(action){
				too += '<hr>'
			}else{
				too = ''
			}
			return getTooltipDoc('行动效率<hr><left><small>'+too+'<li-hid>- 总计: '+formatScientific(n(actionEfficient()).mul(100),1)+'%</left></small>')
		}
	}
}