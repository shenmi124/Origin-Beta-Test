var CivicsWorkshop = {
    pickaxe: {
        name(){return '燧石镐'},
        tooltip(){return '事实上,你需要先找到一些坚硬的材料才能做出燧石镐以开采石料'},
        unlocked(){return player.building.civics.gte(1)},
        cost: {
            dirt(){return n(2.5)}
        },
        costPower(){return n(0.05)},
        effect: {
            gain:{
                add: {
                    food(){return n(0.1)},
                }
            }
        }
    },
}