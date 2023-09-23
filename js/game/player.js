function calcPlayer(){
    dataLoader()
    baseLoader()
    autoLoader()
    gameLoader()
}

function dataLoader(){
    loader(['data','offline'],n(0))

    loader(['data','devSpeed'],n(1))
    loader(['data','startGame'],false)

	loader(['setting','autoSave'],true)
	loader(['setting','saveTick'],false)
	loader(['setting','countingMethod'],"standard")
	loader(['setting','mouseSetting'],true)
	loader(['setting','language'],undefined)
}

function baseLoader(){
    loader(['research','conducted'],undefined)

    loader(['events','time'],n(0))
}

function autoLoader(){
    for(let i in main['resource']){
		loader(['resource',i],n(0))
        loader(['resource',i+'Unlock'],false)
        loader(['resource',i+'Unlocked'],false)
	}
    for(let i in main['building']){
		loader(['building',i],n(0))
	}

    for(let i in mainResearch['main']){
		loader(['research',i],n(0))
		loader(['mainResearch',i],false)
		loader(['canMainResearch',i],false)
	}
}