function NumberFix(){
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceMaxBase(i))
			getResourceID(i)
		}
	}
}

function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
}

function getResourceGain(researce){
    return n(getResourceGainBase(researce)).mul(getResourceGainMul(researce))
}

function getResourceMax(researce){
    return n(getResourceMaxBase(researce)).mul(getResourceMaxMul(researce))
}

function getResourceGainBase(resource){
    let gain = n(0)
    if(main['resource'][resource]['gain']!==undefined){
        gain = gain.add(main['resource'][resource]['gain']())
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['gain']!==undefined){
                    if(main['resource'][i]['effect']['gain']['add']!==undefined){
                        for(let im in main['resource'][i]['effect']['gain']['add']){
                            if(resource==im){
                                gain = gain.add(n(main['resource'][i]['effect']['gain']['add'][im]()).mul(player['resource'][i]))
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
                        for(let im in main['building'][i]['effect']['gain']['add']){
                            if(resource==im){
                                gain = gain.add(n(main['building'][i]['effect']['gain']['add'][im]()).mul(player['building'][i]))
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
                        for(let im in civics['citizens'][i]['effect']['gain']['add']){
                            if(resource==im){
                                gain = gain.add(nc(civics['citizens'][i]['effect']['gain']['add'][im]()).mul(player.citizens[i]))
                            }
                        }
                    }
                }
            }
        }
    }
    return gain
}

function getResourceGainMul(resource){
    let gain = n(1)
    if(main['resource'][resource]['gain']!==undefined){
        if(main['resource'][resource]['mul']!==undefined){
            gain = gain.mul(n(main['resource'][resource]['mul']()))
        }
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['gain']!==undefined){
                    if(main['resource'][i]['effect']['gain']['mul']!==undefined){
                        for(let im in main['resource'][i]['effect']['gain']['mul']){
                            if(resource==im){
                                gain = gain.mul(n(main['resource'][i]['effect']['gain']['mul'][im]()).mul(player['resource'][i]).add(1))
                            }
                        }
                    }
                }
            }
        }
    }
    return gain
}

function getResourceMaxBase(resource){
    let max = n(0)
    if(main['resource'][resource]['max']!==undefined){
        max = max.add(main['resource'][resource]['max']())
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['max']!==undefined){
                    if(main['resource'][i]['effect']['max']['add']!==undefined){
                        for(let im in main['resource'][i]['effect']['max']['add']){
                            if(resource==im){
                                max = max.add(n(main['resource'][i]['effect']['max']['add'][im]()).mul(player['resource'][i]))
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
                            if(resource==im){
                                max = max.add(n(main['building'][i]['effect']['max']['add'][im]()).mul(player['building'][i]))
                            }
                        }
                    }
                }
            }
        }
    }
    return max
}

function getResourceMaxMul(resource){
    let max = n(1)
    if(main['resource'][resource]['max']!==undefined){
        if(main['resource'][resource]['maxMul']!==undefined){
            max = max.mul(n(main['resource'][resource]['maxMul']()))
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

function hasActionClick(id){
    return player['action'][id+'Click']
}

function hasCraftClick(id){
    return player['craft'][id+'Click']
}

function getActionUnlocked(id){
    let unlocked = true
    if(main['action'][id]['unlocked']!==undefined){
        unlocked = main['action'][id]['unlocked']()
    }
    return unlocked
}

function getCraftUnlocked(id){
    let unlocked = true
    if(main['craft'][id]['unlocked']!==undefined){
        unlocked = main['craft'][id]['unlocked']()
    }
    return unlocked
}

function getActionCanClick(id){
    let click = true
    if(main['action'][id]['canClick']!==undefined){
        click = main['action'][id]['canClick']()
    }
    return click && getActionUnlocked(id)
}

function getCraftCanClick(id){
    let click = true
    if(main['craft'][id]['canClick']!==undefined){
        click = main['craft'][id]['canClick']()
    }
    return click && getCraftUnlocked(id)
}

function getActionCooldown(id){
    return n(main['action'][id]['cooldown']())
}

function getCraftCooldown(id){
    return n(main['craft'][id]['cooldown']())
}

function getActionAuto(action){
    let auto = n(0)
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['effect']!==undefined){
            if(civics['citizens'][i]['effect']['action']!==undefined){
                for(let im in civics['citizens'][i]['effect']['action']){
                    if(action==im){
                        auto = auto.add(nc(civics['citizens'][i]['effect']['action'][im]()).mul(player.citizens[i]))
                    }
                }
            }
        }
    }
    return auto
}

function getCraftAuto(craft){
    let auto = n(0)
    for(let i in civics['citizens']){
        if(civics['citizens'][i]['effect']!==undefined){
            if(civics['citizens'][i]['effect']['craft']!==undefined){
                for(let im in civics['citizens'][i]['effect']['craft']){
                    if(craft==im){
                        auto = auto.add(nc(civics['citizens'][i]['effect']['craft'][im]()).mul(player.citizens[i]))
                    }
                }
            }
        }
    }
    return auto
}

function getBuildGain(building,resource){
    return n(main['building'][building]['effect']['gain']['add'][resource]()).mul(player['building'][building])
}

function getBuildMax(building,resource){
    return n(main['building'][building]['effect']['max']['add'][resource]()).mul(player['building'][building])
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

function buildingText(name,begin,resource,end,mul){
    return `<left><span>
        <div style="width: 90px; display: table-cell">`+name+`</div>`+begin+format(resource)+end+`
        <br><div style="width: 90px; display: table-cell"></div>
        <black><li-hid>(总计: `+begin+format(n(resource).mul(mul))+end+`)</black>
    </span></left>`
}