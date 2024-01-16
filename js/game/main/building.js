var MainBuilding = {
    colony:{
        name(){return '定居地'},
        tooltip(){return '决定定居?'},
        unlocked(){return player.action.explore.colonyFined && player.building.colony.eq(0) && player.building.city.eq(0)},
        instant(){return true},
        onBuy(){
            addLog('除去杂草,踩平地面,就是这么简单')
            addLog('你安心许多,决定探索更远的地方')
        },
        cost: {
            dirt(){return n(10)}
        },
        costPower(){return n(0)},
        effect: {
            max:{
                dirt(){return n(20)},
                stone(){return n(20)},
                food(){return n(20)},
            }
        }
    },
    city:{
        name(){return '城邦'},
        tooltip(){return '为这座城市卖命'},
        unlocked(){return player.action.explore.city && player.building.colony.eq(0) && player.building.city.eq(0)},
        instant(){return true},
        onBuy(){
            addLog('等待制作')
        },
        cost: {
            food(){return n(3)}
        },
        costPower(){return n(0)}
    },
    farm:{
        name(){return '农田'},
        tooltip(){return '起码先解决温饱'},
        unlocked(){return player.building.colony.eq(1)},
        cost: {
            dirt(){return n(2.5)}
        },
        costPower(){return n(0.05)},
        effect: {
            gain:{
                food(){return n(0.06)},
            }
        }
    },
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
            max:{
                dirt(){return n(50)},
                stone(){return n(30)},
            }
        }
    },
}