var CivicsCitizens = {
    explorer: {
        name(){return '开阔者'},
        tooltip(){return '开阔者将自动进行探索行动<hr><grey>每位开阔者-1幸福度</grey><br>(总计:'+format(this.effect.other.happiness())+')<hr><grey>每位开阔者+50%通过探索发现的行动的记忆</grey><br>(总计:'+format(n(this.effect.other.memory()).mul(100))+'%)'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            action: {
                explore(){return n(0.15)},
            },
            other: {
                happiness(){return n(0).sub(player['citizens']['explorer'].mul(1))},
                memory(){return n(0.5).mul(player['citizens']['explorer']).add(1)},
            }
        },
        active(){
            GameCraftFix()
        },
    },
    collector: {
        name(){return '劳工'},
        unlocked(){return true},
        tooltip(){return '劳工会缓慢的自动采集泥土<br>同时也会缓慢进行收集以及树枝行动<hr><grey>每位劳工-3幸福度</grey><br>(总计:'+format(this.effect.other.happiness())+')'},
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
                happiness(){return n(0).sub(player['citizens']['explorer'].mul(3))},
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