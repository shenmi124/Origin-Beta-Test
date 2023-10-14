var tooltipSel

function tooltipLoad(id,id2){
	return `onmouseenter='mouseLoad("`+id+`","`+id2+`")' onmouseleave='document.getElementById("tooltip").style.display = "none";window.clearInterval(tooltipSel)' onclick='document.getElementById("tooltip").style.display = "none";window.clearInterval(tooltipSel)'`
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
				res += '<hr><span style="color:'+colorText('researchPoints')[0]+'">研究难度</span>: '+main['resource'][id]['research']()
			}
			let gain = ''
			let gainNumber = n(0)
			let time = ''
			if(main['resource'][id]['gain']!==undefined){
				gain += "<hr><a style='font-size: 14px'>资源生产</a>"
				gainNumber = gainNumber.add(main['resource'][id]['gain']())
				let now = format(gainNumber)
				if(gainNumber.eq(getResourceBaseGain(id))){
					now = '<u>'+format(gainNumber)+'</u>'
				}else{
					now = format(gainNumber)
				}
				if(!gainNumber.eq(0)){
					gain += `<left><span>
						<div style="width: 155px; display: table-cell"><i class="fa fa-plus-circle"></i> 基础</div>
						<div style="width: 155px; display: table-cell">+`+format(main['resource'][id]['gain']())+`</div>`+now+`
					</span></left>`
				}
				for(let i in main['building']){
					if(main['building'][i]['effect']!==undefined){
						if(main['building'][i]['effect']['gain']!==undefined){
							for(let ig in main['building'][i]['effect']['gain']){
								if(id==ig && !n(main['building'][i]['effect']['gain'][ig]()).mul(player['building'][i]).eq(0)){
									gainNumber = gainNumber.add(n(main['building'][i]['effect']['gain'][ig]()).mul(player['building'][i]))
									if(gainNumber.eq(getResourceBaseGain(id))){
										now = '<u>'+format(gainNumber)+'</u>'
									}else{
										now = format(gainNumber)
									}
									if(!gainNumber.eq(0)){
										gain += `<left><span>
											<div style="width: 155px; display: table-cell"><i class="fa fa-home"></i> `+main['building'][i]['name']()+`</div>
											<div style="width: 155px; display: table-cell">+`+format(main['building'][i]['effect']['gain'][ig]())+` × `+formatWhole(player['building'][i])+`</div>`+now+`
										</span></left>`
									}
								}
							}
						}
					}
				}

				if(main['resource'][id]['mulResearch']!==undefined){
					gainNumber = gainNumber.mul(main['resource'][id]['mulResearch']())
					if(gainNumber.eq(getResourceBaseGain(id))){
						now = '<u>'+format(gainNumber)+'</u>'
					}else{
						now = format(gainNumber)
					}
					if(!gainNumber.eq(0)){
						gain += `<left><span>
							<div style="width: 155px; display: table-cell"><i class="fa fa-flask"></i> 研究</div>
							<div style="width: 155px; display: table-cell">×`+format(main['resource'][id]['mulResearch']())+`</div>`+now+`
						</span></left>`
					}
				}

				if(gainNumber.eq(0)){
					gain = ''
				}

				if(main['resource'][id]['max']!==undefined){
					time = '<hr>无法抵达上限'
					if(player['resource'][id].gte(getResourceBaseMax(id))){
						time = '<hr>已抵达上限'
					}else if(main['resource'][id]['gain']!==undefined){
						if(n(getResourceBaseGain(id)).gt(0)){
							time = '<hr>'+formatTime(n(getResourceBaseMax(id)).sub(player['resource'][id]).div(getResourceBaseGain(id)))+'<br>抵达上限'
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
						<div style="width: 155px; display: table-cell"><i class="fa fa-plus-circle"></i> 基础</div>
						<div style="width: 155px; display: table-cell">+`+format(main['resource'][id]['max']())+`</div>`+now+`
					</span></left>`
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
											<div style="width: 155px; display: table-cell"><i class="fa fa-home"></i> `+main['building'][i]['name']()+`</div>
											<div style="width: 155px; display: table-cell">+`+format(main['building'][i]['effect']['max'][im]())+` × `+formatWhole(player['building'][i])+`</div>`+now+`
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
						<div style="width: 155px; display: table-cell"><i class="fa fa-plus-circle"></i> 基础</div>
						<div style="width: 155px; display: table-cell">+`+format(main['resource'][id]['number']())+`</div>`+now+`
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
		let cost = '<hr><left>'
		if(main['building'][id]['tooltip']!=undefined){
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
						(+`+format(getBuildGain(id,i))+`/s)
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
						(+`+format(getBuildMax(id,i))+`)
					</span><br>`
				}
			}
		}
		max += '</left>'
		return getTooltipDoc(name+"("+formatWhole(player['building'][id],0)+")"+'<small>'+bas+cost+gainhr+gain+maxhr+max+'</samll>')
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
			cost += '<hr><span><div style="width: 50px; display: table-cell"><span style="color:'+colorText('researchPoints')[0]+'">科学</span></div>'+format(researchNeeds(id))+'</div> ('+format(player.resource.researchPoints)+')</span></left>'
		}else{
			cost += '<hr><span>正在进行研究: '+mainResearch['main'][id]['name']()
		}
		if(player.research[id].gte(mainResearch['main'][id]['max']())){
			cost = '<hr>研究完成'
		}
		let effect = '<hr><left>效果( <span style="color:'+colorText('researchPoints')[0]+'">'+res+'</span>'+(player.research[id].gte(mainResearch['main'][id]['max']()) ? '' : ' + <green>1</green>')+' ):'
		for(i in mainResearch['main'][id]['effect']){
			for(ii in mainResearch['main'][id]['effect'][i]){
				if(n(i).lt(mainResearch['main'][id]['max']())){
					if(player.research[id].eq(i)){
						effect += `<br>`+(mainResearch['main'][id]['effect'][i][ii]()[1] ? `<green>(<i class="fa fa-plus"></i>)</green>` : `<yellow>(<i class="fa  fa-rotate-right"></i>)</yellow>`)+'<span style="color: rgb(31, 70, 71);">'+mainResearch['main'][id]['effect'][i][ii]()[0]+'</span>'
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
	}else{
		return getTooltipDoc('未命名')
	}
}