var CivicsCitizens = {
    unemployed:{
        name(){return '失业者'},
        number(){return getUnemployedsNumber()},
        mass(){return n(1)}
    },
    explorer:{
        name(){return '开阔者'},
        allocated(){return true},
        tooltip(){return '开阔者将自动进行探索行动'},
        effect:{
            action:{
                explore(){return n(0.15)},
            },
        },
    },
    collector:{
        name(){return '劳工'},
        allocated(){return true},
        unlocked(){return true},
        tooltip(){return '劳工会缓慢的自动采集泥土,同时也会缓慢进行收集行动'},
        effect:{
            craft:{
                collect(){return n(0.15)},
            },
            gain:{
                add: {
                    dirt(){return n(0.1)},
                }
            },
        },
    }
}