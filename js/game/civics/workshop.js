var CivicsWorkshop = {
    minute: {
        name(){return '五轮沙漏'},
        keep(){return true},
        tooltip(){return '观察沙漏,以此来判断分钟<joker>不能暂时性减速敌人</joker>'},
        cost: {
            idea(){return n(10000)},
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
        unlocked(){return player.workshop.hour && false}
    },
    hour: {
        name(){return '日晷渐移'},
        keep(){return true},
        tooltip(){return '观察影子的位移,以此来判断时期'},
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
            idea(){return n(50000)},
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
        tooltip(){return '用石头做出石稿以开采石头<br><grey>收集时有概率获得石头</grey><joker>开采石头做出石镐以开采石头</joker>'},
        effect: {
            unlocked: {
                1(){return '允许玩开采露天石料'}
            }
        },
        cost: {
            stone(){return n(1)},
        },
    },
    axe: {
        name(){return '燧石斧'},
        effect: {
            unlocked: {
                1(){return '允许玩家将木头加工成木板'},
                2(){return '允许玩家砍树<grey>#你需要先找到树</gery>'},
            }
        },
        cost: {
            wood(){return n(10)},
            stone(){return n(20)},
        },
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
    sword: {
        name(){return '燧石小刀'},
        effect: {
            unlocked: {
                1(){return '允许玩家追猎野兽'},
            }
        },
        cost: {
            wood(){return n(5)},
            stone(){return n(30)},
        },
    },
    campfire: {
        name(){return '营火'},
        tooltip(){return '人民聚在一起谈论自己的想法<br>真正的开始'},
        effect: {
            resource: {
                idea: {
                    gain: {
                        mul(){return n(1.2)}
                    },
                },
            },
            unlocked: {
                1(){return '阶段1'},
                2(){return '解锁后续内容'},
            },
        },
        cost: {
            dirt(){return n(50)},
            wood(){return n(15)},
            stone(){return n(30)},
        },
    },
}

let WORKSHOPBOUGHT = true