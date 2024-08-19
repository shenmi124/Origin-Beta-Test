function gainResource(res,gain){
    if(gain.gte(0)){
        if(getResourceCapped(res)!==null){
            gain = gain.min(n(getResourceCapped(res)).sub(player['resource'][res]))
        }
        player['resource'][res] = player['resource'][res].add(gain)
        player['resource'][res+'Total'] = player['resource'][res+'Total'].add(gain)
        player['resource'][res+'Best'] = player['resource'][res+'Best'].max(player['resource'][res])
    }else{
        player['resource'][res] = player['resource'][res].add(gain).max(0)
    }
}

function getResourceTitleID(id,res){
	let Class = ''
	if(resource['main'][res]['Class']!==undefined){
		Class = resource['main'][res]['Class']()
	}
	if(resource['main'][res]['type']!==undefined){
        if(resource['main'][res]['type']()=='node'){
            getByID(id+'TitleID', `
                <div class="resourceTitle resourceName `+Class+`" style="position: relative; visibility: hidden;">null</div>`
            )
            getByID(id+'BorderID', `<div class="resourceBorder" id="`+res+`BorderID" style="background: `+colorText(res)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 100% 0% 0%);"></div>`)
            return null
        }
    }
	getByID(id+'TitleID', `
		<tooltip `+loadTooltip(res, 'LoadTooltipResource', null)+` style="cursor: help;">
			<div class="resourceTitle resourceName `+Class+`" style="color: `+colorText(res)[0]+`; position: relative;">
			    `+i18n(resource['main'][res]['name']())+`
            </div>
        </tooltip>`
	)
	getByID(id+'BorderID', `<div class="resourceBorder" id="`+res+`BorderID" style="background: `+colorText(res)[0]+`; z-index: -1; transition-duration: 0.2s; clip-path: inset(0% 0% 0% 0%);"></div>`)
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
            let negative = false
            if(resource['main'][id]['negative']!==undefined){
                negative = resource['main'][id]['negative']()
            }
            if(negative){
                if(getResourceGain(id).gt(0)){
                    getByID(id+'GainID','<red>(+ '+format(getResourceGain(id))+' /s)</red>')
                }else{
                    getByID(id+'GainID','(- '+format(n(getResourceGain(id)).abs())+' /s)')
                }
            }else{
                if(getResourceGain(id).gt(0)){
                    getByID(id+'GainID','(+ '+format(getResourceGain(id))+' /s)')
                }else{
                    getByID(id+'GainID','<red>(- '+format(n(getResourceGain(id)).abs())+' /s)</red>')
                }
            }
		}
	}
}

function resourceUnlocked(res){
    if(resource['main'][res]['unlocked']!==undefined){
        let unlocked = false
		if(resource['main'][res]['unlocked']!==undefined){
			unlocked = resource['main'][res]['unlocked']()
		}
		if(unlocked){
            RESOURCEUNLOCKEDTIMES += 1
			document.getElementById(res+"LoadResourceTitleID").style.display = ''
			document.getElementById(res+"LoadResourceID").style.display = ''
			document.getElementById(res+"BorderID").style.display = ''
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
		}
    }else{
        RESOURCEUNLOCKEDTIMES += 1
		document.getElementById(res+"LoadResourceTitleID").style.display = ''
		document.getElementById(res+"LoadResourceID").style.display = ''
		player['resource'][res+'Unlocked'] = true
	}
    if(!(RESOURCEUNLOCKEDTIMES%2)){
        if(resource['main'][res]['type']!==undefined){
            if(resource['main'][res]['type']()=='node'){
                document.getElementById(res+"LoadResourceBackground").style.background = ''
            }else{
                document.getElementById(res+"LoadResourceBackground").style.background = '#dfdfdf55'
            }
        }else{
            document.getElementById(res+"LoadResourceBackground").style.background = '#dfdfdf55'
        }
    }else{
        document.getElementById(res+"LoadResourceBackground").style.background = ''
    }
}

function getResourceID(res){
	if(resource['main'][res]['type']!==undefined){
        if(resource['main'][res]['type']()=='node'){
            resourceUnlocked(res)
            return null
        }
    }
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
    resourceUnlocked(res)
	if(resource['main'][res]['capped']!==undefined){
		let border = n(100).sub(player['resource'][res].div(n(getResourceCapped(res)).max(0.01)).mul(100))
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
	}else{
		document.getElementById(res+"BorderID").style.clipPath = 'inset(0% 100% 0% 0%)'
	}
	getResourceDoc(res)
}

function resourceUpdate(id){
	if(resource['main'][id]['amount']!==undefined){
		player['resource'][id] = n(resource['main'][id]['amount']())
	}else{
		if(getResourceGain(id)!==null){
            gainResource(id, n(getResourceGain(id)).mul(DIFF))
		}
	}
	player['resource'][id+'Best'] = player['resource'][id+'Best'].max(player['resource'][id])
}

function getResourceEffectGainBase(i,im){
    let base = resource['main'][i]['effect']['gain']['add'][im]()
    for(let building in main['building']){
        if(main['building'][building]['effect']?.['resource']!==undefined){
            for(let ib in main['building'][building]['effect']['resource']){
                if(main['building'][building]['effect']['resource'][ib]['gain']?.['add']!==undefined){
                    for(let iga in main['building'][building]['effect']['resource'][i]['gain']?.['add']){
                        if(main['building'][building]['effect']['resource'][ib]['gain']?.['add'][iga]['addmul']!==undefined){
                            base = base.mul(n(main['building'][building]['effect']['resource'][ib]['gain']['add'][iga]['addmul']()).mul(player['building'][building+'Allocation'] ?? player['building'][building]).add(1))
                        }
                    }
                }
            }
        }
    }
    return base
}

function getResourceGainBase(res){
    let gain = n(0)
    if(resource['main'][res]['gain']!==undefined){
        gain = gain.add(resource['main'][res]['gain']())
        for(let i in resource['main']){
            if(resource['main'][i]['effect']?.['gain']?.['add']!==undefined){
                for(let im in resource['main'][i]['effect']['gain']['add']){
                    if(res==im){
                        gain = gain.add(n(getResourceEffectGainBase(i, im)).mul(player['resource'][i]))
                    }
                }
            }
        }
        for(let i in main['building']){
            if(main['building'][i]['effect']?.['gain']?.['add']!==undefined){
                for(let ib in main['building'][i]['effect']['gain']['add']){
                    if(res==ib){
                        gain = gain.add(getBuildGain(i, ib))
                    }
                }
            }
        }
		for(let i in civics['citizens']){
            if(civics['citizens'][i]['effect']?.['gain']?.['add']!==undefined){
                for(let ic in civics['citizens'][i]['effect']['gain']['add']){
                    if(res==ic){
                        gain = gain.add(getCitizensGain(i, ic))
                    }
                }
            }
        }
    }
    return gain
}

function getResourceGainMul(res){
    let gain = n(1)
    if(resource['main'][res]['gain']!==undefined){
        if(resource['main'][res]['mul']!==undefined){
            gain = gain.mul(n(resource['main'][res]['mul']()))
        }
        for(let i in resource['main']){
            if(resource['main'][i]['effect']?.['gain']?.['mul']!==undefined){
                for(let im in resource['main'][i]['effect']['gain']['mul']){
                    if(res==im){
                        gain = gain.mul(n(resource['main'][i]['effect']['gain']['mul'][im]()).mul(player['resource'][i]))
                    }
                }
            }
        }
        for(let i in civics['workshop']){
            if(player['workshop'][i]){
                if(civics['workshop'][i]['effect']?.['resource']!==undefined){
                    for(let iw in civics['workshop'][i]['effect']['resource']){
                        if(civics['workshop'][i]['effect']['resource'][iw]['gain']?.['mul']!==undefined){
                            if(res==iw){
                                gain = gain.mul(civics['workshop'][i]['effect']['resource'][iw]['gain']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return gain
}

function getResourceGain(res){
    if(resource['main'][res]['gain']==undefined){
        return null
    }
    return n(getResourceGainBase(res)).mul(getResourceGainMul(res))
}

function getResourceCappedBase(res){
    let capped = n(0)
    if(resource['main'][res]['capped']!==undefined){
        capped = capped.add(resource['main'][res]['capped']())
        for(let i in resource['main']){
            if(resource['main'][i]['effect']?.['capped']?.['add']!==undefined){
                for(let im in resource['main'][i]['effect']['capped']['add']){
                    if(res==im){
                        capped = capped.add(n(resource['main'][i]['effect']['capped']['add'][im]()).mul(player['resource'][i]))
                    }
                }
            }
        }
        for(let i in main['building']){
            if(main['building'][i]['effect']?.['capped']?.['add']!==undefined){
                for(let im in main['building'][i]['effect']['capped']['add']){
                    if(res==im){
                        capped = capped.add(getBuildCapped(i, im))
                    }
                }
            }
        }
        for(let i in civics['workshop']){
            if(player['workshop'][i]){
                if(civics['workshop'][i]['effect']?.['resource']!==undefined){
                    for(let iw in civics['workshop'][i]['effect']['resource']){
                        if(civics['workshop'][i]['effect']['resource'][iw]['capped']?.['add']!==undefined){
                            if(res==iw){
                                capped = capped.add(civics['workshop'][i]['effect']['resource'][iw]['capped']['add']())
                            }
                        }
                    }
                }
            }
        }
    }
    return capped
}

function getResourceCappedMul(res){
    let capped = n(1)
    if(resource['main'][res]['capped']!==undefined){
        if(resource['main'][res]['cappedMul']!==undefined){
            capped = capped.mul(n(resource['main'][res]['cappedMul']()))
        }
        for(let i in resource['main']){
            if(resource['main'][i]['effect']?.['capped']?.['mul']!==undefined){
                for(let im in resource['main'][i]['effect']['capped']['mul']){
                    if(res==im){
                        capped = capped.mul(n(resource['main'][i]['effect']['capped']['mul'][im]()).pow(player['resource'][i]))
                    }
                }
            }
        }
        for(let i in civics['workshop']){
            if(player['workshop'][i]){
                if(civics['workshop'][i]['effect']?.['resource']!==undefined){
                    for(let iw in civics['workshop'][i]['effect']['resource']){
                        if(civics['workshop'][i]['effect']['resource'][iw]['capped']?.['mul']!==undefined){
                            if(res==iw){
                                capped = capped.mul(civics['workshop'][i]['effect']['resource'][iw]['capped']['mul']())
                            }
                        }
                    }
                }
            }
        }
    }
    return capped
}

function getResourceCapped(res){
    if(resource['main'][res]['capped']==undefined){
        return null
    }
    return n(getResourceCappedBase(res)).mul(getResourceCappedMul(res))
}

function getResourceBaseNumber(res){
    let num = n(0)
    if(resource['main'][res]['num']!==undefined){
        num = num.add(resource['main'][res]['num']())
    }
    return num
}