var CivicsCitizens = {
    farmer: {
        name(){return '农民'},
        tooltip(){return '<grey>农民的产量基于农田</grey>'},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            craft: {
                harvest(){return n(0.255)},
            },
            gain: {
                add: {
                    food(){return n(getBuildGainBase('farm', 'food'))},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){
                        let base = n(1)
                        if(player.workshop.copperPoe){
                            base = base.sub(0.5)
                        }
                        return n(base).neg()
                    },
                    display(){return ['','%']},
                }
            }
        }
    },
    explorer: {
        name(){
            if(player.workshop.campfire){
                return '探险家'
            }
            return '开拓者'
        },
        tooltip(){return '自动进行探索行动'},
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
                    effect(){
                        let base = n(0.5)
                        if(player.workshop.mountaineeringPickaxe){
                            base = base.sub(0.5)
                        }
                        return n(base).neg()
                    },
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
                collect(){
                    if(main['craft']['collect']['unlocked']()){
                        return n(0.1)
                    }
                    return n(0)
                },
                drop(){
                    if(main['craft']['collect']['unlocked']()){
                        return n(0.05)
                    }
                    return n(0)
                },
            },
            gain: {
                add: {
                    dirt(){return n(0.5)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){
                        let base = n(1.5)
                        if(player.workshop.copperShovel){
                            base = base.sub(0.5)
                        }
                        return n(base).neg()
                    },
                    display(){return ['','%']},
                },
            }
        },
    },
    hunt: {
        name(){return '猎人'},
        tooltip(){return '辅助狩猎'},
        unlocked(){return player.workshop.lance},
        allocated: {
            unemployed(){return n(1)},
        },
        effect: {
            gain: {
                add: {
                    leather(){return n(0.5)}
                }
            },
            craft: {
                beast(){return n(0.4)},
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1).neg()},
                    display(){return ['','%']},
                }
            }
        },
        active(){
            GameCraftFix()
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
            craft: {
                tree(){return n(0.2)},
            },
            gain: {
                add: {
                    wood(){return n(0.5)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){
                        let base = n(2.5)
                        if(player.workshop.copperAxe){
                            base = base.sub(0.5)
                        }
                        return n(base).neg()
                    },
                    display(){return ['','%']},
                },
            }
        },
    },
    miner: {
        name(){return '矿工'},
        unlocked(){return player.workshop.mine},
        tooltip(){return '危险就业<br><grey>矿工的产量基于矿井</grey>'},
        allocated: {
            unemployed(){return n(1)},
            mine(){return n(1)},
        },
        effect: {
            gain: {
                add: {
                    stone(){return n(getBuildGain('mine', 'stone'))},
                    copper(){return n(getBuildGain('mine', 'copper')).mul(2)},
                    coal(){return n(getBuildGain('mine', 'coal')).mul(5)},
                    iron(){return n(getBuildGain('mine', 'iron')).mul(0.25)},
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){
                        let base = n(7.5)
                        if(player.workshop.supportBeam){
                            base = base.sub(2.5)
                        }
                        if(player.workshop.copperPickaxe){
                            base = base.sub(1)
                        }
                        return n(base).neg()
                    },
                    display(){return ['','%']},
                },
            }
        },
    },
    scholar: {
        name(){return '学者'},
        tooltip(){return '智者虑未萌,愚者惑已成<hr>学者能散发更多思想,同时可以将思想变成思维'},
        unlocked(){return player.workshop.knowledge},
        allocated: {
            unemployed(){return n(1)},
            scholar(){return n(1)},
        },
        effect: {
            gain: {
                add: {
                    idea(){return n(5)},
                    knowledge(){return n(0.1)}
                }
            },
        },
    },
    joker: {
        name(){return '小丑'},
        unlocked(){return player.workshop.circus},
        allocated: {
            unemployed(){return n(1)},
            circus(){return n(1)},
        },
        effect: {
            gain: {
                add: {
                    idea(){return n(10).neg()}
                }
            },
            other: {
                happiness: {
                    name(){return '幸福度'},
                    effect(){
                        let base = n(7)
                        return n(base)
                    },
                    display(){return ['','%']},
                }
            }
        },
    },
}

var CivicsJobs = {
    unemployed: {
        name(){return '无业游民'},
        amount(){return n(player.resource.citizens)},
        display(){return false}
    },
    lumberyards: {
        name(){return '空闲伐木场'},
        tooltip(){return '每三个伐木场可以就业一名伐木工'},
        amount(){return n(player.building.lumberyards).div(3).floor()},
    },
    mine: {
        name(){return '空闲矿井'},
        tooltip(){return '每一个矿井可以就业一名矿工'},
        amount(){return n(player.building.mine)},
    },
    circus: {
        name(){return '空闲马戏团'},
        tooltip(){return '每个马戏团需要一位小丑'},
        amount(){return n(player.building.circus)},
    },
    scholar: {
        name(){return '空闲学院'},
        tooltip(){return '每个学院可以容纳两位学者'},
        amount(){return n(player.building.school).mul(2)},
    },
}

var CitizensTip = function(){
    return formatWhole(player.resource.citizens)
}