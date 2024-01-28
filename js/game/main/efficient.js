let efficient = {
    action:{
        food:{
            name(){return '缺少食物'},
            effect(){return n(-25)},
            active(){return player.resource.food.lte(0)}
        },
        home:{
            name(){return '缺少定居地'},
            effect(){return n(-25)},
            active(){return player.building.civics.eq(0)}
        }
    }
}