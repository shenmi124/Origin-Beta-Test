var MainBuilding = {
    civics: {
        name(){return '定居地'},
        tooltip(){return '决定定居?'},
        unlocked(){return player.action.explore.civicsFound && player.building.civics.eq(0)},
        unique(){return true},
        onBuy(){
            addLog('你找到了一片平地')
            addLog('你决定将此地作为暂时的定居点')
            addLog('以此为基础你可以探索更远的地方')
        },
        cost: {
            dirt(){return n(10)}
        },
        costPower(){return n(0)},
        effect: {
            capped:{
                add: {
                    food(){return n(20)},
                    dirt(){return n(20)},
                    wood(){return n(20)},
                    stone(){return n(20)},
                }
            }
        }
    },
    shelter: {
        name(){
            if(player.workshop.campfire){
                return '小屋'
            }
            return '庇护所'
        },
        tooltip(){
            if(player.workshop.campfire){
                return '用泥土搭建起来的简易小屋'
            }
            return '一个用泥土搭建的临时庇护所,无法提供什么安全感,但是可以遮风挡雨'
        },
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(8)},
        },
        costPower(){return n(0.15)},
        effect: {
            capped: {
                add: {
                    citizens(){return n(1)},
                }
            }
        }
    },
    hut: {
        name(){
            return '木屋'
        },
        tooltip(){
            return '真正意义上的家,在居住的同时可以提升幸福度'
        },
        unlocked(){return player.workshop.hut},
        cost: {
            plank(){return n(80)},
        },
        costPower(){return n(0.15)},
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
                }
            },
            capped: {
                add: {
                    citizens(){return n(2)},
                }
            }
        }
    },
    brickHouse: {
        name(){
            return '砖瓦房'
        },
        tooltip(){
            return '真正意义上的家,在居住的同时可以提升幸福度'
        },
        unlocked(){return player.workshop.brickHouse},
        cost: {
            brick(){return n(30)}
        },
        costPower(){return n(0.15)},
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(3)},
                    display(){return ['+','%']},
                }
            },
            capped: {
                add: {
                    citizens(){return n(2)},
                }
            }
        }
    },
    circus: {
        name(){
            return '马戏团'
        },
        tooltip(){
            return '单有马戏团并没有什么用,你还需要招募一些小丑'
        },
        unlocked(){return player.workshop.circus},
        cost: {
            idea(){return n(10000)},
            leather(){return n(200)},
        },
        costPower(){return n(0.02)},
        onBuy(){
            CitizensFix()
        },
    },
    workshop: {
        name(){return '工坊'},
        tooltip(){
            return '手工工坊,提升全锻造材料获取倍率<br><grey>类加工行动的获取也会增加</grey>'
        },
        unlocked(){return player.workshop.workshop},
        cost: {
            stone(){return n(100)},
            brick(){return n(1)}
        },
        costPower(){return n(0.02)},
        effect: {
            other:{
                forging: {
                    name(){return '锻造资源'},
                    effect(){return n(6)},
                    display(){return ['+','%']},
                }
            }
        }
    },
    granary: {
        name(){return '粮仓'},
        tooltip(){return '储存食物'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(20)},
            wood(){return n(20)},
            stone(){return n(10)},
        },
        costPower(){return n(0.1)},
        effect: {
            capped: {
                add: {
                    food(){return n(150)},
                }
            }
        },
        unlocked(){return player.workshop.campfire},
    },
    warehouse: {
        name(){return '货仓'},
        tooltip(){return '储存物资'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            plank(){return n(5)},
        },
        costPower(){return n(0.15)},
        effect: {
            capped: {
                add: {
                    leather(){return n(25)},
                    dirt(){return n(80)},
                    wood(){return n(50)},
                    stone(){return n(50)},
                    copper(){return n(0)},
                }
            }
        },
        unlocked(){return player.workshop.campfire},
    },
    school: {
        name(){return '学院'},
        unlocked(){return player.workshop.knowledge},
        cost: {
            brick(){return n(5)},
            parchment(){return n(2)}
        },
        costPower(){return n(0.2)},
        effect: {
            capped: {
                add: {
                    knowledge(){return n(100)},
                }
            },
            citizens: {
                scholar: {
                    effect: {
                        addmul(){return n(0.15)}
                    }
                }
            }
        },
        onBuy(){
            CitizensFix()
        },
    },
    farm: {
        name(){return '农田'},
        time(){
            if(getGametime()[1]){
                return true
            }
            return false
        },
        tooltip(){return '<grey>在 夜晚 农田的基础产量会减少25%</grey>'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            food(){return n(2.5)}
        },
        costPower(){return n(0.14)},
        effect: {
            gain: {
                add: {
                    food(){
                        if(main['building']['farm']['time']()){
                            return n(0.075)
                        }
                        return n(0.1)
                    },
                }
            }
        }
    },
    lumberyards: {
        name(){return '伐木场'},
        unlocked(){return player.workshop.lumberyards},
        cost: {
            wood(){return n(20)},
            dirt(){return n(25)}
        },
        costPower(){return n(0.065)},
        effect: {
            gain: {
                add: {
                    wood(){return n(0.25)},
                }
            }
        },
        onBuy(){
            CitizensFix()
        },
    },
    mine:{
        name(){return '矿井'},
        unlocked(){return player.workshop.mine},
        base(){return n(main.craft.collect.luck()).add(main.craft.collect.mul()).sub(2).mul(0.05)},
        tooltip(){
            let speed = ''
            let lucky = ''
            let hr = ''
            if(n(main['craft']['stone']['speed']()).gt(1)){
                speed = '<left>速度倍率: <mul>×</mul>'+format(main['craft']['stone']['speed']())+' <grey>#提升全局产量</grey></left>'
                hr = '<hr>'
            }
            if(n(main['craft']['stone']['lucky']()).gt(1)){
                lucky = '<left>幸运倍率: <mul>×</mul>'+format(main['craft']['stone']['lucky']())+' <grey>#提升矿石产量</grey></left>'
                hr = '<hr>'
            }
            return '建造矿井采集矿石<br><grey>矿井会继承 行动石料 的倍率</grey>'+hr+speed+lucky
        },
        cost: {
            dirt(){return n(200)},
            wood(){return n(100)},
            stone(){return n(150)}
        },
        costPower(){return n(0.1)},
        effect: {
            gain: {
                add: {
                    stone(){return n(2).mul(main['craft']['stone']['speed']())},
                    copper(){return n(0.01).mul(main['craft']['stone']['speed']()).mul(main['craft']['stone']['lucky']())},
                    coal(){return n(0.001).mul(main['craft']['stone']['speed']()).mul(main['craft']['stone']['lucky']())},
                    iron(){
                        let base = n(0)
                        if(player.workshop.elevator){
                            base = base.add(0.01)
                        }
                        return n(base).mul(main['craft']['stone']['speed']()).mul(main['craft']['stone']['lucky']())
                    },
                }
            }
        },
        onBuy(){
            CitizensFix()
        },
    },
    kiln: {
        name(){return '窑炉'},
        tooltip(){return '将松散泥土精炼成坚固瓦'},
        unlocked(){return player.workshop.kiln},
        allocation(){return true},
        cost: {
            dirt(){return n(500)}
        },
        costPower(){return n(0.05)},
        effect: {
            gain: {
                add: {
                    pollution(){return n(10)},
                    dirt(){return n(5).neg()},
                    coal(){return n(0.05).neg()},
                    brick(){return n(0.005)},
                }
            }
        }
    },
    steel: {
        name(){return '高炉'},
        tooltip(){return '炼制钢材'},
        unlocked(){return player.workshop.steel},
        allocation(){return true},
        cost: {
            dirt(){return n(1500)},
            iron(){return n(50)},
            blueprint(){return n(5)}
        },
        costPower(){return n(0.05)},
        effect: {
            gain: {
                add: {
                    pollution(){return n(50)},
                    coal(){return n(0.1).neg()},
                    iron(){return n(0.002).neg()},
                    steel(){return n(0.002)},
                }
            }
        }
    },
    brewery: {
        name(){return '酿酒厂'},
        tooltip(){return '酿酒厂的存在提升了每位村民消耗食物的基础值'},
        unlocked(){return player.workshop.brewery},
        allocation(){return true},
        cost: {
            plank(){return n(40)},
            food(){return n(600)}
        },
        costPower(){return n(0.04)},
        effect: {
            resource: {
                citizens: {
                    gain: {
                        add: {
                            food: {
                                addmul(){return n(0.2)}
                            }
                        }
                    }
                }
            },
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(6)},
                    display(){return ['+','%']},
                },
            }
        }
    },
}