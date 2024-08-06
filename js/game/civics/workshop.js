var CivicsWorkshop = {
    minute: {
        name(){return '沙漏轮翻'},
        keep(){return true},
        tooltip(){return '观察沙漏,以此来判断分钟'},
        cost: {
            idea(){return n(5000)},
        },
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            unlocked:{
                1(){return '允许玩家知晓实时游戏分'},
            }
        },
        unlocked(){return player.workshop.hour}
    },
    hour: {
        name(){return '日晷渐移'},
        keep(){return true},
        tooltip(){return '观察影子的位移,以此来判断时期'},
        cost: {
            idea(){return n(500)},
        },
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            unlocked:{
                1(){return '允许玩家知晓实时游戏时'},
            }
        },
        unlocked(){return player.workshop.day}
    },
    day: {
        name(){return '东升西落'},
        keep(){return true},
        tooltip(){return '观察太阳的东升西落,以此来判断日期'},
        cost: {
            idea(){return n(200)},
        },
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            unlocked:{
                1(){return '允许玩家知晓已经进行了多少个游戏日'},
            }
        },
        unlocked(){return player.game.time.gte(144)}
    },
    month: {
        name(){return '阴晴圆缺'},
        keep(){return true},
        tooltip(){return '观察月亮的阴晴圆缺,以此来判断月份'},
        cost: {
            idea(){return n(1000)},
        },
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            unlocked:{
                1(){return '允许玩家知晓已经进行了多少个游戏月'},
            }
        },
        unlocked(){return player.workshop.day && player.game.time.gte(4320)}
    },
    year: {
        name(){return '四季轮转'},
        keep(){return true},
        tooltip(){return '观察四季变换,以此来判断年份'},
        cost: {
            idea(){return n(2000)},
        },
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            unlocked:{
                1(){return '允许玩家知晓已经进行了多少个游戏年'},
            }
        },
        unlocked(){return player.workshop.month && player.game.time.gte(51840)}
    },
    pickaxe: {
        name(){return '燧石镐'},
        tooltip(){return '用石头做出石镐以开采石头<br><grey>收集时有概率获得石头</grey><joker>开采石头做出石镐以开采石头</joker>'},
        effect: {
            unlocked: {
                1(){return '允许开采露天石料'}
            }
        },
        cost: {
            stone(){return n(1)},
        },
    },
    binding: {
        name(){return '绑定结'},
        tooltip(){return '绑定好你的燧石镐'},
        effect: {
            other: {
                speed: {
                    name(){return '行动石堆'},
                    effect(){return n(25)},
                    display(){return ['速度+','%']},
                },
                lucky: {
                    name(){return '行动石堆'},
                    effect(){return n(50)},
                    display(){return ['幸运+','%']},
                }
            },
        },
        cost: {
            wood(){return n(5)},
            stone(){return n(10)},
        },
        unlocked(){return player.workshop.pickaxe}
    },
    mountaineeringPickaxe: {
        name(){return '登山镐'},
        tooltip(){return '提供探索加成,同时允许玩家进一步的探索'},
        effect: {
            other: {
                speed: {
                    name(){return '行动探索'},
                    effect(){return n(20)},
                    display(){return ['速度+','%']},
                },
                lucky: {
                    name(){return '行动探索'},
                    effect(){return n(20)},
                    display(){return ['幸运+','%']},
                }
            },
            unlocked: {
                1(){return '探索可以找到更多事物'}
            }
        },
        cost: {
            stone(){return n(30)},
            copper(){return n(2)},
        },
        unlocked(){return player.workshop.pickaxe}
    },
    axe: {
        name(){return '燧石斧'},
        effect: {
            unlocked: {
                1(){return '允许将木头加工成木梁'},
                2(){return '允许砍树<grey>#你需要先找到树</gery>'},
            }
        },
        cost: {
            wood(){return n(5)},
            stone(){return n(30)},
        },
    },
    lumberyards: {
        name(){return '伐木场'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 伐木场'},
                2(){return '解锁职业 伐木工'},
                3(){return '获得建筑 伐木场'},
            },
        },
        cost: {
            wood(){return n(20)},
            dirt(){return n(25)}
        },
        onBuy(){
            player.building.lumberyards = player.building.lumberyards.add(1)
            componentBuilding('lumberyards')
        },
        unlocked(){return player.workshop.axe && player.action.explore.treeFined}
    },
    hoe: {
        name(){return '燧石锄头'},
        effect: {
            building: {
                farm: {
                    effect: {
                        mul(){return n(1.5)}
                    }
                }
            }
        },
        cost: {
            wood(){return n(200)},
            stone(){return n(50)},
        },
    },
    landImprovement: {
        name(){return '土地改良'},
        effect: {
            building: {
                farm: {
                    effect: {
                        mul(){return n(1.5)}
                    }
                }
            }
        },
        cost: {
            dirt(){return n(1000)}
        },
        unlocked(){return player.workshop.hoe}
    },
    knife: {
        name(){return '燧石小刀'},
        effect: {
            other: {
                power: {
                    name(){return '力量'},
                    effect(){return n(3)},
                    display(){return ['+','']},
                }
            }
        },
        cost: {
            wood(){return n(5)},
            stone(){return n(30)},
        },
        onBuy(){
            addLog('力量决定了你类狩猎行为的倍率')
            addLog('当你的力量大于对方时可以进行狩猎')
            addLog('同时你的力量每溢出一倍的需求最大狩猎数量就+1')
        },
    },
    armor: {
        name(){return '护甲'},
        effect: {
            other: {
                power: {
                    name(){return '力量'},
                    effect(){return n(2)},
                    display(){return ['+','']},
                }
            }
        },
        cost: {
            leather(){return n(30)},
        },
    },
    clothes: {
        name(){return '皮衣'},
        effect: {
            other: {
                action: {
                    name(){return '效率'},
                    effect(){return n(15)},
                    display(){return ['+','%']},
                }
            }
        },
        cost: {
            leather(){return n(20)},
        },
    },
    campfire: {
        name(){return '营火'},
        keep(){return true},
        tooltip(){return '人们聚在一起谈论自己的想法<br>真正的开始'},
        effect: {
            resource: {
                idea: {
                    capped: {
                        mul(){return n(1.2)}
                    },
                },
            },
            unlocked: {
                1(){return '阶段1'},
                2(){return '解锁建筑 货仓'},
                3(){return '解锁建筑 粮仓'},
                4(){return '建筑修正 庇护所->小屋'},
                5(){return '职业修正 开括者->探险家'},
                6(){return '以及更多...'},
            },
        },
        cost: {
            dirt(){return n(50)},
            wood(){return n(20)},
            stone(){return n(20)},
        },
        onBuy(){
            nameCorrection('building', 'shelter', '小屋')
            nameCorrection('citiznes', 'explorer', '探险家')
        }
    },
    huts: {
        name(){return '木屋'},
        tooltip(){return '用木板搭建而成的小屋'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 木屋'},
            },
        },
        cost: {
            plank(){return n(50)}
        },
        onBuy(){
            player.building.huts = player.building.huts.add(1)
            componentBuilding('huts')
        },
        unlocked(){return player.workshop.campfire && false}
    },
    brewery: {
        name(){return '酿酒厂'},
        tooltip(){return '多余粮食将被用于酿酒以免浪费'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 酿酒厂'},
            },
        },
        cost: {
            plank(){return n(40)},
            food(){return n(800)}
        },
        onBuy(){
            player.building.brewery = player.building.brewery.add(1)
            componentBuilding('brewery')
        },
        unlocked(){return player.workshop.campfire && false}
    },
    camp: {
        name(){return '营地'},
        keep(){return true},
        tooltip(){return '逐渐形成一个部落<br>入口逐渐增多'},
        effect: {
            unlocked: {
                1(){return '阶段2'},
                2(){return '以及更多...'},
            },
        },
        cost: {
            copper(){return Infinity},
            iron(){return Infinity},
            plank(){return Infinity},
            bricks(){return Infinity},
            tile(){return Infinity},
        },
        unlocked(){return player.workshop.campfire}
    },
}

let WORKSHOPBOUGHT = false