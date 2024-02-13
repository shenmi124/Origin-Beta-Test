var CivicsCitizens = {
    unemployed:{
        name(){return '失业者'},
        number(){return getUnemployedsNumber()},
        mass(){return n(0)}
    },
    explorer:{
        name(){return '探索者'},
        allocated(){return true},
        tooltip(){return '帮助你进行探索'},
        base(){return n(0.25)},
        effect(){return n(getActionEmployedEffect('explorer'))},
    },
    collector:{
        name(){return '收集者'},
        allocated(){return true},
        tooltip(){return '帮助你进行收集'},
        base(){return n(0.4)},
        effect(){return n(getActionEmployedEffect('collector'))},
    },
    farm:{
        name(){return '收割者'},
        allocated(){return true},
        tooltip(){return '帮助你进行收割'},
        base(){return n(0.5)},
        effect(){return n(getActionEmployedEffect('farm'))},
    }
}