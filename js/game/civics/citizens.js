var CivicsCitizens = {
    unemployed:{
        name(){return '失业者'},
        number(){return getUnemployedsNumber()},
        mass(){return n(0)}
    },
    explorer:{
        name(){return '探索者'},
        allocated(){return true},
        effect(){return n(getActionEmployedEffect('explorer')).mul(0.25)},
    }
}