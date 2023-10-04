var MainBuilding = {
    farmland:{
        name(){return '农田'},
        unlocked(){return player.research.m42.gte(1)},
        tooltip:{
            base(){return '经过处理,植物生长异常活跃'},
            cost: {
                dirt(){return n(5)},
                plant(){return n(1)}
            },
            costPower(){return n(0.025)},
            effect: {
                gain:{
                    plant(){return n(0.025)}
                }
            }
        },
    },
    mine:{
        name(){return '采石场'},
        unlocked(){return player.research.m41.gte(1)},
        base(){return n(main.action.collectionDirt.luck()).add(main.action.collectionDirt.mul()).sub(2).mul(0.01)},
        tooltip:{
            base(){
                let mul = ''
                if(n(main.action.collectionDirt.luck()).gt(1)){
                    mul += '<br><li-hid>- 幸运加成+ '+format(n(main.action.collectionDirt.luck()).sub(1))
                }
                if(n(main.action.collectionDirt.luck()).gt(1)){
                    mul += '<br><li-hid>- 产量加成+ '+format(n(main.action.collectionDirt.mul()).sub(1))
                }
                mul += '<br><li-hid>- 基础倍率× 0.01'
                return '自动获得石头<fun>等等...自动?</fun><hr><left>基础获取: '+format(main.building.mine.base())+'<small>'+mul+'</small></left><hr><tip>基础获取加成基于行动采集泥土</tip>'
            },
            cost: {
                stone(){return n(2)}
            },
            costPower(){return n(0.08)},
            effect: {
                gain:{
                    stone(){return n(main.building.mine.base())}
                }
            }
        },
    },
    storage:{
        name(){return '仓库'},
        unlocked(){return player.research.m51.gte(1)},
        base(){return n(main.action.collectionDirt.luck()).add(main.action.collectionDirt.mul()).sub(2)},
        tooltip:{
            base(){
                return '储存'
            },
            cost: {
                dirt(){return n(20)},
                stone(){return n(10)}
            },
            costPower(){return n(0.05)},
            effect: {
                max:{
                    dirt(){return n(30)},
                    fiber(){return n(10)},
                    stone(){return n(20)},
                }
            }
        },
    },
}