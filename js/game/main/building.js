var MainBuilding = {
    farmland:{
        name(){return '农田'},
        unlocked(){return false},
        tooltip:{
            base(){return '经过处理,植物生长异常活跃'},
            cost: {
                dirt(){return n(5)},
                stone(){return n(1)},
                grass(){return n(0.05)}
            },
            costPower(){return n(0.025)},
            effect: {
                gain:{
                    grass(){return n(0.005)}
                }
            }
        },
    },
}