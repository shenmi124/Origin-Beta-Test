var MainBuilding = {
    civics: {
        name(){return '定居地'},
        tooltip(){return '决定定居?'},
        unlocked(){return player.action.explore.civicsFined && player.building.civics.eq(0)},
        unique(){return true},
        onBuy(){
            addLog('事实上你现在压根没有条件去修一座庇护所')
            addLog('所以你只是除了除草,填平了地面而已')
            addLog('不过起码也算有了一个定居地')
            addLog('你决定探索更远的地方')
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
        tooltip(){return '实在算不上家,但好歹也能遮风避雨'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            food(){return n(10)},
            dirt(){return n(8)},
        },
        costPower(){return n(0.1)},
        effect: {
            capped: {
                add: {
                    citizens(){return n(1)},
                }
            }
        }
    },
    granary: {
        name(){return '粮仓'},
        tooltip(){return '储存食物<joker>鼠鼠我呀...</joker>'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            food(){return n(20)},
            dirt(){return n(10)},
            wood(){return n(10)},
        },
        costPower(){return n(0.1)},
        effect: {
            capped: {
                add: {
                    food(){return n(140)},
                }
            }
        },
        unlocked(){return player.workshop.campfire},
    },
    warehouse: {
        name(){return '货仓'},
        tooltip(){return '储存物资<joker>鼠鼠我呀...???</joker>'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            woodenBeams(){return n(5)},
        },
        costPower(){return n(0.15)},
        effect: {
            capped: {
                add: {
                    leather(){return n(25)},
                    dirt(){return n(60)},
                    wood(){return n(60)},
                    stone(){return n(60)},
                }
            }
        },
        unlocked(){return player.workshop.campfire},
    },
    farm: {
        name(){return '农田'},
        tooltip(){return '先解决温饱'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(2.5)}
        },
        costPower(){return n(0.15)},
        effect: {
            gain: {
                add: {
                    food(){return n(0.1)},
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
        costPower(){return n(0.05)},
        effect: {
            gain: {
                add: {
                    wood(){return n(0.25)},
                }
            }
        }
    },
    /*
    mine:{
        name(){return '采石场'},
        unlocked(){return false},
        base(){return n(main.craft.collect.luck()).add(main.craft.collect.mul()).sub(2).mul(0.05)},
        tooltip(){
            let mul = ''
            if(n(main.craft.collect.luck()).gt(1)){
                mul += '<br><li-hid>- 幸运加成+ '+format(n(main.craft.collect.luck()).sub(1))
            }
            if(n(main.craft.collect.luck()).gt(1)){
                mul += '<br><li-hid>- 产量加成+ '+format(n(main.craft.collect.mul()).sub(1))
            }
            mul += '<br><li-hid>- 基础倍率× 0.05'
            return '自动获得石头<fun>等等...自动?</fun><hr><left>基础获取: '+format(main.building.mine.base())+'<small>'+mul+'</small></left><hr><tip>基础获取加成基于行动采集泥土</tip>'
        },
        cost: {
            stone(){return n(2)}
        },
        costPower(){return n(0.08)},
        effect: {
            gain:{
                stone(){return n(main.building.mine.base())},
            }
        }
    },
    storage:{
        name(){return '仓库'},
        unlocked(){return false},
        cost: {
            dirt(){return n(20)},
            stone(){return n(10)}
        },
        costPower(){return n(0.045)},
        effect: {
            capped:{
                dirt(){return n(50)},
                stone(){return n(30)},
            }
        }
    },*/
}