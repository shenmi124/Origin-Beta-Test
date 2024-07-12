var CivicsCitizens = {
    explorer: {
        name(){
            if(player.workshop.campfire){
                return '探险家'
            }
            return '开括者'
        },
        tooltip(){return '开括者将自动进行探索行动'},
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
                    display(){return ['','%']},
                },
                memory: {
                    name(){return '遗忘延迟'},
                    effect(){return n(0.5)},
                    display(){return ['<mul>×</mul>+','']},
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
                    dirt(){return n(0.5)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(0).sub(3)},
                    display(){return ['','%']},
                },
            }
        },
    },
    lumberjack: {
        name(){return '伐木工'},
        unlocked(){return player.workshop.lumberyards},
        tooltip(){return '伐木工可以收集木材并加工它们'},
        allocated: {
            unemployed(){return n(1)},
            lumberyards(){return n(1)},
        },
        effect: {
            action: {
                plank(){return n(0.5)},
            },
            gain: {
                add: {
                    wood(){return n(0.5)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(0).sub(5)},
                    display(){return ['','%']},
                },
            }
        },
    },
}

var CivicsJobs = {
    unemployed: {
        name(){return '无业游民'},
        number(){return n(player.resource.citizens)},
    },
    lumberyards: {
        name(){return '空闲伐木场'},
        tooltip(){return '每个伐木场可以就业一名伐木工'},
        number(){return n(player.building.lumberyards)},
    },
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}