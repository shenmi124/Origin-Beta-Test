function NumberFix(){
	for(i in main['resource']){
		if(main['resource'][i]['capped']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceCappedBase(i))
			getResourceID(i)
		}
	}
}

function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
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
                                gain = gain.add(getBuildGain(i, im))
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
                                gain = gain.mul(n(main['resource'][i]['effect']['gain']['mul'][im]()).mul(player['resource'][i]))
                            }
                        }
                    }
                }
            }
        }
        for(let i in civics['workshop']){
            if(player['workshop'][i]){
                if(civics['workshop'][i]['effect']!==undefined){
                    if(civics['workshop'][i]['effect']['resource']!==undefined){
                        for(let iw in civics['workshop'][i]['effect']['resource']){
                            if(civics['workshop'][i]['effect']['resource'][iw]['gain']!==undefined){
                                if(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']!==undefined){
                                    if(resource==iw){
                                        gain = gain.mul(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']())
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return gain
}

function getResourceGain(researce){
    return n(getResourceGainBase(researce)).mul(getResourceGainMul(researce))
}

function getResourceCappedBase(resource){
    let capped = n(0)
    if(main['resource'][resource]['capped']!==undefined){
        capped = capped.add(main['resource'][resource]['capped']())
        for(let i in main['resource']){
            if(main['resource'][i]['effect']!==undefined){
                if(main['resource'][i]['effect']['capped']!==undefined){
                    if(main['resource'][i]['effect']['capped']['add']!==undefined){
                        for(let im in main['resource'][i]['effect']['capped']['add']){
                            if(resource==im){
                                capped = capped.add(n(main['resource'][i]['effect']['capped']['add'][im]()).mul(player['resource'][i]))
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
                            if(resource==im){
                                capped = capped.add(getBuildCapped(i, im))
                            }
                        }
                    }
                }
            }
        }
    }
    return capped
}

function getResourceCappedMul(resource){
    let capped = n(1)
    if(main['resource'][resource]['capped']!==undefined){
        if(main['resource'][resource]['cappedMul']!==undefined){
            capped = capped.mul(n(main['resource'][resource]['cappedMul']()))
        }
    }
    return capped
}

function getResourceCapped(researce){
    return n(getResourceCappedBase(researce)).mul(getResourceCappedMul(researce))
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

function getBuildGainBase(building,resource){
    let mul = n(1)
    for(let i in civics['workshop']){
        if(civics['workshop'][i]['effect']!==undefined){
            if(civics['workshop'][i]['effect']['building']!==undefined){
                for(let ib in civics['workshop'][i]['effect']['building']){
                    if(civics['workshop'][i]['effect']['building'][ib]['effect']!==undefined){
                        if(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']!==undefined){
                            if(player['workshop'][i]){
                                mul = mul.mul(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return n(main['building'][building]['effect']['gain']['add'][resource]()).mul(mul)
}

function getBuildGain(building,resource){
    return n(getBuildGainBase(building, resource)).mul(player['building'][building])
}

function getBuildCappedBase(building,resource){
    let mul = n(1)
    for(let i in civics['workshop']){
        if(civics['workshop'][i]['effect']!==undefined){
            if(civics['workshop'][i]['effect']['building']!==undefined){
                for(let ib in civics['workshop'][i]['effect']['building']){
                    if(civics['workshop'][i]['effect']['building'][ib]['effect']!==undefined){
                        if(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']!==undefined){
                            if(player['workshop'][i]){
                                mul = mul.mul(civics['workshop'][i]['effect']['building'][ib]['effect']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return n(main['building'][building]['effect']['capped']['add'][resource]()).mul(mul)
}

function getBuildCapped(building,resource){
    return n(main['building'][building]['effect']['capped']['add'][resource]()).mul(player['building'][building])
}

function getCitizensEffect(citizens,effect){
    return player['citizens'][citizens].mul(civics['citizens'][citizens]['effect']['other'][effect]['effect']())
}

function effectText(name,begin,resource,end,mul,Class=null,display=true){
    let unique = ``
    let beginClass = ``
    let endClass = ``
    if(display){
        unique = `<grey><li-hid>(`+begin+format(resource)+end+`)</grey>`
    }else{
        mul = n(1)
    }
    if(Class!==null){
        beginClass = `<`+Class+`>`
        endClass = `</`+Class+`>`
    }
    return `<left><span>
                <div style="width: 80px; display: table-cell">`+name+`</div>
                <div style="width: 124px; display: table-cell">`+beginClass+begin+format(n(resource).mul(mul))+end+endClass+`</div>
                `+unique+`
            </span></left>`
}

function costText(name,resource,cost,type){
    let time = ''
    if(main['resource'][resource]['gain']!==undefined){
        if(n(getResourceGain(resource)).gt(0) && player['resource'][resource].lt(cost) && (n(getResourceCapped(resource)).gte(cost) || main['resource'][resource]['capped']==undefined)){
            time = '( '+formatTime(n(cost).sub(player['resource'][resource]).div(getResourceGain(resource)))+' )'
        }else if(n(getResourceCapped(resource)).lt(cost)){
            time = '( '+format(n(getResourceCapped(resource)).sub(cost))+' )'
        }
    }
    if(main['resource'][resource]['unlocked']!==undefined){
        if(!main['resource'][resource]['unlocked']()){
            name = '<gery>???</gery>'
            time = ''
        }
    }
    if(type=="workshop" && WORKSHOPBOUGHT){
        return `<span>
                    <div style="width: 80px; display: table-cell">`+name+`</div>
                    <div style="width: 55px; display: table-cell; color: rgb(31, 70, 71)">`+format(cost)+`</div>
                </span><br>`
    }
    return `<span>
				<span>
					<div style="width: 80px; display: table-cell">`+name+`</div>
					<div style="width: 55px; display: table-cell; color: `+(player['resource'][resource].gte(cost) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][resource])+`</div>
				</span>
				<span style="width: 30px; display: table-cell; color: rgb(31, 70, 71);"> / 
				</span>
				<span style="width: 55px; display: table-cell; color: rgb(31, 70, 71);">
					<div style="color: `+((n(getResourceCapped(resource)).gte(cost) || main['resource'][resource]['capped']==undefined) ? `` : `red` )+`">`+format(cost)+`</div>
				</span>
			</span>`+time+`<br>`
}

function nameCorrection(type,old,name){
    if(type=='building'){
        getByID(old+'BuildingButtonID', name+'('+formatWhole(player['building'][old])+')')
    }
    if(type=='citiznes'){
        getByID(old+'CitizensNameID', name)
    }
}

function colorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in main['resource']){
		if(id==resourceColor){
			if(main['resource'][resourceColor]['color']!==undefined){
				color = main['resource'][resourceColor]['color']()
			}
			if(main['resource'][resourceColor]['name']!==undefined){
				Text = main['resource'][resourceColor]['name']()
			}
			if(main['resource'][resourceColor]['Class']!==undefined){
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



function getTooltipLoot(resource,effect,start=n(0),type='research'){
    return formatWhole(player[type][resource].sub(n(start)).capped(1).mul(n(effect)))
}

function getEffectLoot(resource,effect,start=n(0),type='research'){
    return n(player[type][resource].sub(n(start)).capped(0).mul(n(effect)).add(1))
}

function getResourceUnlocked(resource){
    return player['resource'][resource].gt(0) || player['resource'][resource+'Unlocked']
}