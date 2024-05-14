var CivicsWorkshop = {
    pickaxe: {
        name(){return '燧石镐'},
        tooltip(){return '<i>你需要用石头做出燧石稿以开采石头</i><br><gery>收集时有概率获得石头</gery>'},
        cost: {
            stone(){return n(1)}
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