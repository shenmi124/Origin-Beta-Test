var CivicsCitizens = {
    explorer: {
        name(){return '开阔者'},
        tooltip(){return '开阔者将自动进行探索行动'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            action: {
                explore(){return n(0.15)},
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(0).sub(1)},
                },
                memory: {
                    name(){return '遗忘修正'},
                    effect(){return n(0.5)},
                }
            }
        },
        active(){
            GameCraftFix()
        },
    },
    collector: {
        name(){return '劳工'},
        unlocked(){return true},
        tooltip(){return '劳工会缓慢的自动采集泥土<br>同时也会缓慢进行收集以及树枝行动'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            craft: {
                collect(){return n(0.1)},
                drop(){return n(0.05)},
            },
            gain: {
                add: {
                    dirt(){return n(0.1)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(0).sub(3)},
                },
            }
        },
    }
}

var CivicsJobs = {
    unemployed: {
        name(){return '无业游民'},
        number(){return n(player.resource.citizens)},
    }
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}