function calcPlayer(){
    calcData()
    calcAutomator()
    calcGame()
}

function calcData(){
    loader(['data','click'], n(0))
    loader(['data','offline'], n(0))
    loader(['data','devSpeed'], n(1))
    loader(['data','version'], null)
    loader(['data','versiontimes'], n(0))
}

function calcAutomator(){
    for(let i in RESOURCE['main']){
		loader(['resource',i], n(0))
		loader(['resource',i+'Total'], n(0))
		loader(['resource',i+'Best'], n(0))
        loader(['resource',i+'Unlocked'], false)
	}

    for(let i in MAIN['action']){
        loader(['action',i+'Total'], n(0))
        if(MAIN['action'][i]['cooldown']!==undefined){
            loader(['action',i+'Cooldown'], n(0))
            loader(['action',i+'Click'], false)
        }
        if(MAIN['action'][i]['data']!==undefined){
            for(let id in MAIN['action'][i]['data']){
                loader(['action',i,id], MAIN['action'][i]['data'][id]())
            }
        }
    }

    for(let i in MAIN['building']){
		loader(['building',i], n(0))
        if(MAIN['building'][i]['allocation']!==undefined){
            if(MAIN['building'][i]['allocation']()){
                loader(['building',i+'Allocation'], n(0))
            }
        }
	}

    for(let i in MAIN['craft']){
        loader(['craft',i+'Total'], n(0))
        if(MAIN['craft'][i]['cooldown']!==undefined){
            loader(['craft',i+'Cooldown'], n(0))
            loader(['craft',i+'Click'], false)
        }
        if(MAIN['craft'][i]['data']!==undefined){
            for(let id in MAIN['craft'][i]['data']){
                loader(['craft',i,id], MAIN['craft'][i]['data'][id]())
            }
        }
    }

    for(let i in CIVICS['citizens']){
        loader(['citizens',i], n(0))
    }

    for(let i in CIVICS['workshop']){
        loader(['workshop',i], false)
    }

    for(let i in settings){
        if(settings[i]['type']()=="boolean"){
            loader(['setting',i], settings[i]['boolean']())
        }
        if(settings[i]['type']()=="choose"){
            loader(['setting',i], 'default')
        }
	}
}