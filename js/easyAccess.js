function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
}

function getResourceBaseGain(resource){
    let gain = n(0)
    if(main['resource'][resource]['gain']!==undefined){
        gain = gain.add(main['resource'][resource]['gain']())
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['gain']!==undefined){
                    for(let im in main['resource'][i]['effect']['gain']){
                        if(resource==im){
                            gain = gain.add(n(main['resource'][i]['effect']['gain'][im]()).mul(player['resource'][i]))
                        }
                    }
                }
            }
        }
        for(let i in main['building']){
            if(main['building'][i]['effect']!==undefined){
                if(main['building'][i]['effect']['gain']!==undefined){
                    for(let im in main['building'][i]['effect']['gain']){
                        if(resource==im){
                            gain = gain.add(n(main['building'][i]['effect']['gain'][im]()).mul(player['building'][i]))
                        }
                    }
                }
            }
        }
		for(let i in civics['citizens']){
            if(civics['citizens'][i]['effect']!==undefined){
                if(civics['citizens'][i]['effect']['gain']!==undefined){
                    for(let im in civics['citizens'][i]['effect']['gain']){
                        if(resource==im){
                            gain = gain.add(nc(civics['citizens'][i]['effect']['gain'][im]()).mul(player.citizens[i]))
                        }
                    }
                }
            }
        }
    }
    return gain
}

function getResourceBaseMax(resource){
    let max = n(0)
    if(main['resource'][resource]['max']!==undefined){
        max = max.add(main['resource'][resource]['max']())
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['max']!==undefined){
                    for(let im in main['resource'][i]['effect']['max']){
                        if(resource==im){
                            max = max.add(n(main['resource'][i]['effect']['max'][im]()).mul(player['resource'][i]))
                        }
                    }
                }
            }
        }
        for(let i in main['building']){
            if(main['building'][i]['effect']!==undefined){
                if(main['building'][i]['effect']['max']!==undefined){
                    for(let im in main['building'][i]['effect']['max']){
                        if(resource==im){
                            max = max.add(n(main['building'][i]['effect']['max'][im]()).mul(player['building'][i]))
                        }
                    }
                }
            }
        }
    }
    return max
}

function getResourceBaseNumber(resource){
    let num = n(0)
    if(main['resource'][resource]['num']!==undefined){
        num = num.add(main['resource'][resource]['num']())
    }
    return num
}

function getBuildGain(building,resource){
    return n(main['building'][building]['effect']['gain'][resource]()).mul(player['building'][building])
}

function getBuildMax(building,resource){
    return n(main['building'][building]['effect']['max'][resource]()).mul(player['building'][building])
}

function getTooltipLoot(resource,effect,start=n(0),type='research'){
    return formatWhole(player[type][resource].sub(n(start)).max(1).mul(n(effect)))
}

function getEffectLoot(resource,effect,start=n(0),type='research'){
    return n(player[type][resource].sub(n(start)).max(0).mul(n(effect)).add(1))
}

function getResourceUnlocked(resource){
    return player['resource'][resource].gt(0) || player['resource'][resource+'Unlocked']
}

function getUnemployedsNumber(){
    let sub = n(0)
    for(let i in civics['citizens']){
        let mass = n(1)
        if(civics['citizens'][i]['mass']!==undefined){
            mass = n(civics['citizens'][i]['mass']())
        }
        sub = sub.add(player.citizens[i].mul(mass))
    }
    return player.resource.citizens.sub(sub)
}

function getEmployedsNumber(){
    let add = n(0)
    for(let i in civics['citizens']){
        let mass = n(1)
        if(civics['citizens'][i]['mass']!==undefined){
            mass = n(civics['citizens'][i]['mass']())
        }
        add = add.add(player.citizens[i].mul(mass))
    }
    return add
}

function colorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in main['resource']){
		if(id==resourceColor){
			if(main['resource'][resourceColor]['color']!=undefined){
				color = main['resource'][resourceColor]['color']()
			}
			if(main['resource'][resourceColor]['name']!=undefined){
				Text = main['resource'][resourceColor]['name']()
			}
			if(main['resource'][resourceColor]['Class']!=undefined){
				Class = main['resource'][resourceColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888',"<a style='color: #888'>未知</a>",'rgba(136, 136, 136, 0.5)']
	}
	let color2 = tinycolor(color).setAlpha(.5);
	return [color,"<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>",color2]
}
