var CivicsCitizens = {
    explorer: {
        name(){return '开阔者'},
        tooltip(){return '开阔者将自动进行探索行动<hr><grey>每位开阔者-1幸福度</grey><br>(总计:-'+format(player['citizens']['explorer'].mul(1))+')'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            action: {
                explore(){return n(0.15)},
            },
        },
    },
    collector: {
        name(){return '劳工'},
        unlocked(){return true},
        tooltip(){return '劳工会缓慢的自动采集泥土,同时也会缓慢进行收集行动<hr><grey>每位劳工-3幸福度</grey><br>(总计:-'+format(player['citizens']['collector'].mul(3))+')'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            craft: {
                collect(){return n(0.15)},
            },
            gain: {
                add: {
                    dirt(){return n(0.1)},
                }
            },
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