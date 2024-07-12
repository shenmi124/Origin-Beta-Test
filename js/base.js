function getNumberByID(id,id2){
	document.getElementById(id+"ID").innerHTML = format(id2);
}

function getByID(id,id2){
	document.getElementById(id).innerHTML = id2;
}

function addByID(id,id2){
	document.getElementById(id).innerHTML += id2;
}

function misByID(id,id2){
	document.getElementById(id).innerHTML = id2 + document.getElementById(id).innerHTML;
}

function getTooltipDoc(id){
	document.getElementById('tooltip').innerHTML = id;
}

function Close(id){
	if(document.getElementById(id)!==null){
		document.getElementById(id).style.display = 'none'
	}
}

function Open(id,id2=''){
	if(document.getElementById(id)!==null){
    	document.getElementById(id).style.display = id2
	}
}

function addedCss(id,id2){
	document.getElementById(id).classList.add(id2)
}

function removeCss(id,id2){
	document.getElementById(id).classList.remove(id2)
}

function unlockedLoad(id,unlocked){
	if(unlocked){
		document.getElementById(id).style.display = ''
        setTimeout(function(){
            document.getElementById(id).style.opacity = 1
        },100)
	}else{
		document.getElementById(id).style.display = 'none'
		document.getElementById(id).style.opacity = 0
	}
}

function showTab(tab){
	for(let i in mainButton){
		Close('tab_'+i)
		document.getElementById(i+"MainTabID").style.color = ''
		document.getElementById(i+"MainTabID").style.opacity = ''
		document.getElementById(i+"MainTabID").style.cursor = 'pointer'
	}
	Open('tab_'+tab)
	document.getElementById(tab+"MainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById(tab+"MainTabID").style.opacity = '0.8'
	document.getElementById(tab+"MainTabID").style.cursor = 'default'
}

function showSubTab(tab, subTab){
	for(let i in mainButton[tab]['subTab']){
		Close('subtab_'+tab+'_'+i)
		document.getElementById(tab+'_'+i+"SubMainTabID").style.color = ''
		document.getElementById(tab+'_'+i+"SubMainTabID").style.opacity = ''
		document.getElementById(tab+'_'+i+"SubMainTabID").style.cursor = 'pointer'
	}
	Open('subtab_'+tab+'_'+subTab)
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.color = 'rgb(0 145 255)'
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.opacity = '0.8'
	document.getElementById(tab+'_'+subTab+"SubMainTabID").style.cursor = 'default'
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