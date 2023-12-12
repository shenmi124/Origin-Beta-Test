var MainBuilding = {
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
        base(){return n(main.action.collect.luck()).add(main.action.collect.mul()).sub(2)},
        cost: {
            dirt(){return n(20)},
            stone(){return n(10)}
        },
        costPower(){return n(0.045)},
        effect: {
            max:{
                dirt(){return n(50)},
                fiber(){return n(10)},
                stone(){return n(30)},
            }
        }
    },
}