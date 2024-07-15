function getResourceTitleID(id,res_name){
	let Class = ''
	if(resource['main'][res_name]['Class']!==undefined){
		Class = resource['main'][res_name]['Class']()
	}
	getByID(id+'TitleID', `
		<tooltip `+loadTooltip(res_name, 'LoadTooltipResource', null)+` style="cursor: help;">
			<div class="resourceTitle resourceName `+Class+`" style="color: `+colorText(res_name)[0]+`; position: relative;">
			`+i18n(resource['main'][res_name]['name']())+`
		</tooltip></div>`
	)
	getByID(id+'BorderID', `<div class="resourceBorder" id="`+res_name+`BorderID" style="background: `+colorText(res_name)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`)
}

function getResourceDoc(id){
	getByID(id+'ID', format(player['resource'][id]))
	if(resource['main'][id]['capped']!==undefined){
		getByID(id+'CappedID', format(getResourceCapped(id)))
		document.getElementById(id+"slashID").style.display = ''
	}else{
		document.getElementById(id+"slashID").style.display = 'none'
	}
	if(resource['main'][id]['gain']!==undefined){
		if(!getResourceGain(id).eq(0)){
			if(getResourceGain(id).gt(0)){
				getByID(id+'GainID','(+ '+format(getResourceGain(id))+' /s)')
			}else{
				getByID(id+'GainID','(- '+format(n(getResourceGain(id)).abs())+' /s)')
			}
		}
	}
}

function getResourceID(res){
	getByID(res+'LoadResourceID',`
		<div class="resourceTitle" id="`+res+`ID" style="width: 90px;"></div>
		<div class="resourceTitle" style="width: 12px;">
			<div class="resourceTitle" style="width: 12px; color: #888" id="`+res+`slashID">/</div>
		</div>
		<div class="resourceTitle" style="width: 90px;">
			<div class="resourceTitle" style="color: #888; width: 90px;" id="`+res+`CappedID"></div>
		</div>
		<div class="resourceTitle" style="width: 130px;">
			<div class="resourceTitle" id="`+res+`GainID" style="width: 140px;"></div>
		</div>
		`
	)
    if(resource['main'][res]['unlocked']!==undefined){
        let unlocked = false
		if(resource['main'][res]['unlocked']!==undefined){
			unlocked = resource['main'][res]['unlocked']()
		}
		if(unlocked){
			document.getElementById(res+"LoadResourceTitleID").style.display = ''
			document.getElementById(res+"LoadResourceID").style.display = ''
			document.getElementById(res+"BorderID").style.display = ''
			if(resource['main'][res]['newType']!==undefined){
				document.getElementById(res+"TypeID").style.display = ''
			}
			if(unlocked && player['resource'][res+'Unlocked']==false){
				if(resource['main'][res]['unlockAction']!==undefined){
					resource['main'][res]['unlockAction']()
				}
			}
			player['resource'][res+'Unlocked'] = true
		}else{
			document.getElementById(res+"LoadResourceTitleID").style.display = 'none'
			document.getElementById(res+"LoadResourceID").style.display = 'none'
			document.getElementById(res+"BorderID").style.display = 'none'
			if(resource['main'][res]['newType']!==undefined){
				document.getElementById(res+"TypeID").style.display = 'none'
			}
		}
    }else{
		document.getElementById(res+"LoadResourceTitleID").style.display = ''
		document.getElementById(res+"LoadResourceID").style.display = ''
		player['resource'][res+'Unlocked'] = true
	}
	if(resource['main'][res]['capped']!==undefined){
		let border = n(100).sub(player['resource'][res].div(n(getResourceCapped(res)).max(0.01)).mul(100))
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}
	getResourceDoc(res)
}

function resourceCompute(id){
	if(resource['main'][id]['number']!==undefined){
		player['resource'][id] = n(resource['main'][id]['number']())
	}else{
		if(!n(getResourceGain(id)).eq(-1)){
			let unlocked = true
			if(resource['main'][id]['unlocked']!==undefined){
				unlocked = resource['main'][id]['unlocked']()
			}
			if(unlocked){
				let gain = getResourceGain(id)
				gain = n(gain).mul(DIFF)
				if(gain.gte(0)){
					if(!n(getResourceCapped(id)).eq(-1)){
						gain = gain.min(n(getResourceCapped(id)).sub(player['resource'][id])).max()
					}
					player['resource'][id] = player['resource'][id].add(gain)
					player['resource'][id+'Total'] = player['resource'][id+'Total'].add(gain)
				}else{
					player['resource'][id] = player['resource'][id].add(gain).max(0)
				}
			}
		}
	}
	player['resource'][id+'Best'] = player['resource'][id+'Best'].max(player['resource'][id])
}

function getResourceGain(res){
    if(resource['main'][res]['gain']==undefined){
        return n(-1)
    }
    return n(getResourceGainBase(res)).mul(getResourceGainMul(res))
}

function getResourceGainBase(res){
    let gain = n(0)
    if(resource['main'][res]['gain']!==undefined){
        gain = gain.add(resource['main'][res]['gain']())
        for(let i in resource['main']){
            if(resource['main'][i]['effect']!==undefined){
                if(resource['main'][i]['effect']['gain']!==undefined){
                    if(resource['main'][i]['effect']['gain']['add']!==undefined){
                        for(let im in resource['main'][i]['effect']['gain']['add']){
                            if(res==im){
                                gain = gain.add(n(resource['main'][i]['effect']['gain']['add'][im]()).mul(player['resource'][i]))
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
                            if(res==im){
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
                            if(res==im){
                                gain = gain.add(nc(civics['citizens'][i]['effect']['gain']['add'][im]()).mul(player.citizens[i]))
                            }
                        }
                    }
                }
            }
        }
    }
    return formatScientific(gain, 8)
}

function getResourceGainMul(res){
    let gain = n(1)
    if(resource['main'][res]['gain']!==undefined){
        if(resource['main'][res]['mul']!==undefined){
            gain = gain.mul(n(resource['main'][res]['mul']()))
        }
        for(let i in resource['main']){
            if(resource['main'][i]['effect']!==undefined){
                if(resource['main'][i]['effect']['gain']!==undefined){
                    if(resource['main'][i]['effect']['gain']['mul']!==undefined){
                        for(let im in resource['main'][i]['effect']['gain']['mul']){
                            if(res==im){
                                gain = gain.mul(n(resource['main'][i]['effect']['gain']['mul'][im]()).mul(player['resource'][i]))
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
                                    if(res==iw){
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
    return formatScientific(gain, 8)
}

function getResourceCapped(res){
    if(resource['main'][res]['capped']==undefined){
        return n(-1)
    }
    return n(getResourceCappedBase(res)).mul(getResourceCappedMul(res))
}

function getResourceCappedBase(res){
    let capped = n(0)
    if(resource['main'][res]['capped']!==undefined){
        capped = capped.add(resource['main'][res]['capped']())
        for(let i in resource['main']){
            if(resource['main'][i]['effect']!==undefined){
                if(resource['main'][i]['effect']['capped']!==undefined){
                    if(resource['main'][i]['effect']['capped']['add']!==undefined){
                        for(let im in resource['main'][i]['effect']['capped']['add']){
                            if(res==im){
                                capped = capped.add(n(resource['main'][i]['effect']['capped']['add'][im]()).mul(player['resource'][i]))
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
                            if(res==im){
                                capped = capped.add(getBuildCapped(i, im))
                            }
                        }
                    }
                }
            }
        }
    }
    return formatScientific(capped, 8)
}

function getResourceCappedMul(res){
    let capped = n(1)
    if(resource['main'][res]['capped']!==undefined){
        if(resource['main'][res]['cappedMul']!==undefined){
            capped = capped.mul(n(resource['main'][res]['cappedMul']()))
        }
    }
    return formatScientific(capped, 8)
}

function getResourceBaseNumber(res){
    let num = n(0)
    if(resource['main'][res]['num']!==undefined){
        num = num.add(resource['main'][res]['num']())
    }
    return num
}