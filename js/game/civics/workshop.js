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
        tooltip(){return '用石头做出石镐以开采石头<br><grey>采集土堆时有概率获得石头</grey><joker>开采石头做出石镐以开采石头</joker>'},
        effect: {
            unlocked: {
                1(){return '允许开采石堆'}
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
            craft: {
                stone: {
                    speed: {
                        mul(){return n(1.25)}
                    }
                }
            },
            other: {
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
        name(){return '手杖'},
        tooltip(){return '提供探索加成,同时允许玩家进一步的探索<br><grey>采集石料时有概率获得石头</grey>'},
        effect: {
            action: {
                explore: {
                    speed: {
                        mul(){return n(1.1)}
                    }
                }
            },
            other: {
                lucky: {
                    name(){return '行动探索'},
                    effect(){return n(10)},
                    display(){return ['幸运+','%']},
                },
                explorerHappiness: {
                name(){return '职业'+CIVICS['citizens']['explorer']['name']()},
                    effect(){return n(0.5)},
                    display(){return ['幸福度修正+','%']},
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
    hoe: {
        name(){return '燧石锄头'},
        effect: {
            building: {
                farm: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            }
        },
        cost: {
            wood(){return n(200)},
            stone(){return n(50)},
        },
    },
    lumberyards: {
        name(){return '伐木场'},
        tooltip(){return '<grey>每三个伐木场可以就业一名伐木工</grey>'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 伐木场'},
                2(){return '解锁职业 伐木工'},
            },
        },
        cost: {
            wood(){return n(20)},
            dirt(){return n(25)}
        },
        onBuy(){
            player.building.lumberyards = player.building.lumberyards.add(1)
            componentBuilding('lumberyards')
            CitizensFix()
        },
        unlocked(){return player.workshop.axe && player.action.explore.treeFound}
    },
    knife: {
        name(){return '燧石小刀'},
        tooltip(){return '<grey>力量决定了你类狩猎行为的倍率<br>当你的力量大于对方时可以进行狩猎<br>同时你的力量每溢出一倍的需求最大狩猎数量就+1</grey>'},
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
                1(){return '阶段1 - 手工工场时代'},
                2(){return '解锁建筑 货仓'},
                3(){return '解锁建筑 粮仓'},
                4(){return '建筑修正 庇护所->小屋'},
                5(){return '职业修正 开拓者->探险家'},
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
            addLog('*以免你不知道,将鼠标移动到资源,职业等名字上可以看见对应的信息','#888')
        }
    },

    mine: {
        name(){return '矿井'},
        tooltip(){return '在石头上搭建矿井并派人去开采矿石<br><grey>矿井会基于 行动石料 的倍率<hr>速度倍率 将提升矿井的基础产量<br>幸运倍率 将提升矿井的矿石产量'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 矿井'},
                1(){return '解锁职业 矿工'},
                3(){return '隐藏行动 土堆'},
                4(){return '隐藏行动 石头'}
            },
        },
        cost: {
            dirt(){return n(200)},
            wood(){return n(100)},
            stone(){return n(150)}
        },
        onBuy(){
            player.building.mine = player.building.mine.add(1)
            componentBuilding('mine')
            CitizensFix()
        },
        unlocked(){return player.workshop.campfire}
    },
    kiln: {
        name(){return '窑炉'},
        tooltip(){return '砖瓦匠'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 窑炉'},
            },
        },
        cost: {
            dirt(){return n(500)},
        },
        onBuy(){
            player.building.kiln = player.building.kiln.add(1)
            componentBuilding('kiln')
        },
        unlocked(){return player.workshop.mine}
    },
    hut: {
        name(){return '木屋'},
        tooltip(){return '用木板搭建而成的小屋'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 木屋'},
            },
        },
        cost: {
            plank(){return n(100)}
        },
        onBuy(){
            player.building.hut = player.building.hut.add(1)
            componentBuilding('hut')
        },
        unlocked(){return player.workshop.campfire}
    },
    brewery: {
        name(){return '酿酒厂'},
        tooltip(){return '你的居民十分不幸福,或许你需要提供一些精神物质的支持'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 酿酒厂'},
            },
        },
        cost: {
            plank(){return n(40)},
            food(){return n(600)}
        },
        onBuy(){
            player.building.brewery = player.building.brewery.add(1)
            componentBuilding('brewery')
        },
        unlocked(){return player.workshop.campfire}
    },
    circus: {
        name(){return '马戏团'},
        tooltip(){return '你的居民十分不幸福,或许你需要提供另一些精神物质的支持'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 马戏团'},
            },
        },
        cost: {
            idea(){return n(10000)},
            leather(){return n(200)},
        },
        onBuy(){
            player.building.circus = player.building.circus.add(1)
            componentBuilding('circus')
            CitizensFix()
        },
        unlocked(){return player.workshop.campfire}
    },
    depth: {
        name(){return '深层采集'},
        tooltip(){return '<joker>deeeep</joker>'},
        effect: {
            citizens: {
                miner: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            },
        },
        cost: {
            plank(){return n(200)},
        },
        unlocked(){return player.workshop.mine}
    },
    supportBeam: {
        name(){return '支撑柱'},
        tooltip(){return '安全就业'},
        effect: {
            other: {
                minerHappiness: {
                    name(){return '职业矿工'},
                    effect(){return n(2.5)},
                    display(){return ['幸福度修正+','%']},
                }
            },
        },
        cost: {
            plank(){return n(300)},
        },
        unlocked(){return player.workshop.mine}
    },
    fireBrick: {
        name(){return '耐火砖'},
        tooltip(){return '用你刚刚获得的砖块重修窑炉,降低温度散失速率,变相节省燃料'},
        effect: {
            building: {
                kiln: {
                    gain: {
                        add: {
                            coal: {
                                mul(){return n(0.5)}
                            }
                        }
                    }
                }
            }
        },
        cost: {
            brick(){return n(5)},
        },
        unlocked(){return player.workshop.kiln}
    },
    highTemperature: {
        name(){return '高温生产'},
        tooltip(){return '或许你可以利用这高温炼制一些金属'},
        effect: {
            building: {
                kiln: {
                    gain: {
                        add: {
                            dirt: {
                                mul(){return n(0.8)}
                            }
                        }
                    }
                }
            }
        },
        cost: {
            coal(){return n(150)},
        },
        unlocked(){return player.workshop.kiln}
    },
    highTemperatureProcessing: {
        name(){return '高温炼制'},
        tooltip(){return '淬炼工具'},
        effect: {
            resource: {
                iron: {
                    capped: {
                        add(){return n(150)}
                    },
                },
            },
        },
        cost: {
            knowledge(){return n(200)},
            iron(){return n(20)}
        },
        unlocked(){return player.workshop.fireBrick && player.workshop.highTemperature}
    },
    steel: {
        name(){return '高炉'},
        tooltip(){return '淬炼钢铁'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 高炉'}
            }
        },
        cost: {
            dirt(){return n(1500)},
            iron(){return n(50)},
            blueprint(){return n(5)}
        },
        onBuy(){
            player.building.steel = player.building.steel.add(1)
            componentBuilding('steel')
        },
        unlocked(){return player.workshop.fireBrick && player.workshop.highTemperature}
    },
    dryAirBlastlns: {
        name(){return '自然干化法'},
        tooltip(){return '通过下渗和蒸发自然风干污泥,提升瓦的获取率'},
        effect: {
            building: {
                kiln: {
                    gain: {
                        add: {
                            brick: {
                                mul(){return n(2)}
                            }
                        }
                    }
                }
            }
        },
        cost: {
            plank(){return n(50)},
            knowledge(){return n(30)},
        },
        unlocked(){return player.workshop.kiln && player.workshop.knowledge}
    },
    brickReinforcement: {
        name(){return '砖材加固'},
        effect: {
            building: {
                granary: {
                    effect: {
                        mul(){return n(2)}
                    }
                },
                warehouse: {
                    effect: {
                        mul(){return n(1.2)}
                    },
                    capped: {
                        add: {
                            stone: {
                                add(){return n(50)}
                            }
                        }
                    }
                },
            }
        },
        cost: {
            brick(){return n(20)},
        },
        unlocked(){return player.workshop.kiln}
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){return '现在是真正的手工工厂时代了!'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 工坊'}
            }
        },
        cost: {
            stone(){return n(100)},
            brick(){return n(1)}
        },
        onBuy(){
            player.building.workshop = player.building.workshop.add(1)
            componentBuilding('workshop')
        },
        unlocked(){return player.workshop.kiln}
    },
    lance: {
        name(){return '长矛'},
        tooltip(){return '锻造一些金属长矛,组建一支猎人大军'},
        effect: {
            unlocked: {
                1(){return '解锁职业 猎人'}
            },
            other: {
                power: {
                    name(){return '力量'},
                    effect(){return n(2)},
                    display(){return ['+','']},
                }
            }
        },
        cost: {
            stone(){return n(100)},
            copper(){return n(20)}
        },
        unlocked(){return player.workshop.workshop}
    },
    cooperReinforcement: {
        name(){return '铜材加固'},
        effect: {
            building: {
                warehouse: {
                    capped: {
                        add: {
                            copper: {
                                add(){return n(5)}
                            }
                        }
                    }
                }
            }
        },
        cost: {
            brick(){return n(10)},
            copper(){return n(50)},
        },
        unlocked(){return player.workshop.workshop}
    },
    copperShovel: {
        name(){return '铜铲'},
        effect: {
            citizens: {
                collector: {
                    effect: {
                        mul(){return n(2)}
                    }
                }
            },
            other: {
                collectorHappiness: {
                    name(){return '职业劳工'},
                    effect(){return n(0.5)},
                    display(){return ['幸福度修正+','%']},
                }
            },
        },
        cost: {
            copper(){return n(50)},
        },
        unlocked(){return player.workshop.workshop}
    },
    landImprovement: {
        name(){return '土地改良'},
        effect: {
            building: {
                farm: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            }
        },
        cost: {
            dirt(){return n(1000)}
        },
        unlocked(){return player.workshop.copperShovel}
    },
    copperAxe: {
        name(){return '铜锯'},
        effect: {
            action: {
                plank: {
                    speed:{
                        mul(){return n(2)}
                    }
                }
            },
            citizens: {
                lumberjack: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            },
            other: {
                plankCost: {
                    name(){return '加工木板'},
                    effect(){return n(0.5)},
                    display(){return ['消耗×','']},
                },
                lumberjackHappiness: {
                    name(){return '职业伐木工'},
                    effect(){return n(0.5)},
                    display(){return ['幸福度修正+','%']},
                }
            },
        },
        cost: {
            copper(){return n(40)},
            plank(){return n(180)}
        },
        unlocked(){return player.workshop.workshop}
    },
    copperPickaxe: {
        name(){return '铜镐'},
        effect: {
            citizens: {
                miner: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            },
            other: {
                minerHappiness: {
                    name(){return '职业矿工'},
                    effect(){return n(1)},
                    display(){return ['幸福度修正+','%']},
                }
            },
        },
        cost: {
            copper(){return n(80)}
        },
        unlocked(){return player.workshop.workshop}
    },
    copperPoe: {
        name(){return '耒耜'},
        effect: {
            building: {
                farm: {
                    effect: {
                        mul(){return n(1.2)}
                    }
                }
            },
            other: {
                farmerHappiness: {
                    name(){return '职业农民'},
                    effect(){return n(0.5)},
                    display(){return ['幸福度修正+','%']},
                }
            },
        },
        cost: {
            wood(){return n(50)},
            copper(){return n(149)},
        },
        unlocked(){return player.workshop.workshop}
    },
    copperAnvil: {
        name(){return '铜砧'},
        effect: {
            other:{
                forging: {
                    name(){return '锻造资源'},
                    effect(){return n(20)},
                    display(){return ['+','%']},
                }
            }
        },
        cost: {
            copper(){return n(120)}
        },
        unlocked(){return player.workshop.workshop}
    },
    ironReinforcement: {
        name(){return '金属加固'},
        effect: {
            building: {
                warehouse: {
                    effect: {
                        mul(){return n(1.5)}
                    }
                }
            }
        },
        cost: {
            knowledge(){return n(150)},
            copper(){return n(10)},
            iron(){return n(50)},
        },
        unlocked(){return player.workshop.workshop && player.workshop.highTemperatureProcessing}
    },
    ironShovel: {
        name(){return '金属铲'},
        effect: {
            citizens: {
                collector: {
                    effect: {
                        mul(){return n(1.5)}
                    }
                }
            },
        },
        cost: {
            knowledge(){return n(100)},
            iron(){return n(50)},
        },
        unlocked(){return player.workshop.workshop && player.workshop.highTemperatureProcessing}
    },
    ironAxe: {
        name(){return '金属锯'},
        effect: {
            action: {
                plank: {
                    speed:{
                        mul(){return n(1.5)}
                    }
                }
            },
            citizens: {
                lumberjack: {
                    effect: {
                        mul(){return n(1.1)}
                    }
                }
            },
            other: {
                plankCost: {
                    name(){return '加工木板'},
                    effect(){return n(0.5)},
                    display(){return ['消耗×','']},
                }
            },
        },
        cost: {
            knowledge(){return n(200)},
            iron(){return n(40)},
            plank(){return n(360)}
        },
        unlocked(){return player.workshop.workshop && player.workshop.highTemperatureProcessing}
    },
    ironPickaxe: {
        name(){return '金属镐'},
        effect: {
            citizens: {
                miner: {
                    effect: {
                        mul(){return n(1.1)}
                    }
                }
            },
        },
        cost: {
            knowledge(){return n(300)},
            iron(){return n(80)}
        },
        unlocked(){return player.workshop.workshop && player.workshop.highTemperatureProcessing}
    },
    ironAnvil: {
        name(){return '铁砧'},
        effect: {
            other:{
                forging: {
                    name(){return '锻造资源'},
                    effect(){return n(20)},
                    display(){return ['+','%']},
                }
            }
        },
        cost: {
            knowledge(){return n(200)},
            iron(){return n(120)}
        },
        unlocked(){return player.workshop.workshop && player.workshop.highTemperatureProcessing}
    },
    parchment: {
        name(){return '羊皮纸'},
        tooltip(){return '用羊皮制成纸形薄片,用于书写'},
        effect: {
            unlocked: {
                1(){return '解锁资源 羊皮纸'},
                2(){return '解锁行动 加工羊皮纸'}
            },
        },
        cost: {
            leather(){return n(50)},
        },
        onBuy(){
            gainResource('parchment', n(MAIN['action']['parchment']['gain']()))
        },
        unlocked(){return player.workshop.campfire}
    },
    map: {
        name(){return '地图'},
        tooltip(){return '刻画地图<br><grey>通过地图你可以寻找到铁</grey>'},
        effect: {
            citizens: {
                explorer: {
                    effect: {
                        mul(){return n(1.5)}
                    }
                }
            },
            unlocked: {
                1(){return '探索可以找到更多事物'}
            }
        },
        cost: {
            parchment(){return n(10)},
        },
        onBuy(){
            addLog('效率 不会提升 特殊 一栏下的效果' ,'#888')
        },
        unlocked(){return player.workshop.parchment && player.workshop.workshop}
    },
    compass: {
        name(){return '指南针'},
        tooltip(){return '用磁石做一块指南针'},
        effect: {
            action: {
                explore: {
                    speed: {
                        mul(){return n(1.5)}
                    }
                }
            },
            unlocked: {
                1(){return '探索可以找到更多事物'}
            }
        },
        cost: {
            iron(){return n(5)},
        },
        unlocked(){return player.workshop.parchment && player.action.explore.magnetFound}
    },
    knowledge: {
        name(){return '学院'},
        tooltip(){return '非圣人莫能为,非智者莫能先'},
        effect: {
            unlocked: {
                1(){return '解锁资源 思维'},
                2(){return '解锁建筑 学院'},
                2(){return '解锁职业 学者'}
            },
        },
        cost: {
            idea(){return n(1000)},
            parchment(){return n(1)}
        },
        onBuy(){
            player.building.school = player.building.school.add(1)
            componentBuilding('school')
            CitizensFix()
        },
        unlocked(){return player.workshop.parchment}
    },
    blueprint: {
        name(){return '蓝图'},
        tooltip(){return '记录思维'},
        effect: {
            unlocked: {
                1(){return '解锁资源 蓝图'},
            },
        },
        cost: {
            knowledge(){return n(100)},
            parchment(){return n(1)}
        },
        onBuy(){
            gainResource('blueprint', n(MAIN['action']['blueprint']['gain']()))
        },
        unlocked(){return player.workshop.knowledge}
    },
    papermaking: {
        name(){return '造纸术'},
        tooltip(){return '用木材剩下来的木屑代替毛皮'},
        effect: {
            unlocked: {
                1(){return '行动加工羊皮纸 消耗-20%'}
            },
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(5)},
                    display(){return ['+','%']},
                }
            },
        },
        cost: {
            parchment(){return n(50)},
            knowledge(){return n(220)},
        },
        unlocked(){return player.workshop.parchment && player.workshop.knowledge}
    },
    simplifiedMachinery: {
        name(){return '简单机械'},
        tooltip(){return '工业化的开端'},
        effect: {
            other: {
                action: {
                    name(){return '效率'},
                    effect(){return n(20)},
                    display(){return ['+','%']},
                }
            }
        },
        cost: {
            copper(){return n(100)},
            iron(){return n(10)},
            blueprint(){return n(1)},
        },
        unlocked(){return player.workshop.workshop}
    },
    pulley: {
        name(){return '吊轮'},
        tooltip(){return '有效提升建筑效率'},
        effect: {
            markdown: {
                building: {
                    shelter: {
                        effect: {
                            mul(){return n(1.2)}
                        }
                    },
                    hut: {
                        effect: {
                            mul(){return n(1.2)}
                        }
                    }
                }
            }
        },
        cost: {
            copper(){return n(50)},
            iron(){return n(10)},
            blueprint(){return n(3)},
        },
        unlocked(){return player.workshop.simplifiedMachinery}
    },
    truck: {
        name(){return '手推车'},
        effect: {
            citizens: {
                collector: {
                    effect: {
                        mul(){return n(1.3)}
                    }
                }
            },
        },
        cost: {
            copper(){return n(60)},
            iron(){return n(40)},
        },
        unlocked(){return player.workshop.simplifiedMachinery}
    },
    elevator: {
        name(){return '升降机'},
        effect: {
            unlocked: {
                1(){return '允许在矿井中获得铁'}
            }
        },
        cost: {
            copper(){return n(100)},
            blueprint(){return n(5)},
        },
        unlocked(){return player.workshop.pulley}
    },
    brickHouse: {
        name(){return '砖瓦房'},
        effect: {
            unlocked: {
                1(){return '解锁建筑 砖瓦房'}
            }
        },
        cost: {
            brick(){return n(30)}
        },
        onBuy(){
            player.building.brickHouse = player.building.brickHouse.add(1)
            componentBuilding('brickHouse')
        },
        unlocked(){return player.workshop.pulley && player.workshop.truck}
    },
    camp: {
        name(){return '营地'},
        keep(){return true},
        tooltip(){return '逐步进入工业化'},
        effect: {
            resource: {
                idea: {
                    capped: {
                        mul(){return n(1.2)}
                    },
                },
            },
            unlocked: {
                1(){return '阶段2 - 工业时代'},
                2(){return '在开发中解锁 决策'},
                3(){return '在调配中解锁 贸易'},
                4(){return '解锁建筑 蒸汽机'},
                4(){return '解锁资源 蒸汽'},
                5(){return '以及更多...'},
                6(){return '<grey>#购买此项已达到游戏的残局</grey>'},
            },
        },
        cost: {
            knowledge(){return n(500)},
            copper(){return n(100)},
            iron(){return n(50)},
            steel(){return n(1)},
            brick(){return n(50)},
        },
        onBuy(){
            getStage(5)
        },
        unlocked(){return player.workshop.campfire}
    },
}

let WORKSHOPBOUGHT = false