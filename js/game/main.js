var mainButton = {
    main:{
        name(){return "主页"},
        subTab: {
            action: {
                name(){return "行动"},
                data(){return ""},
                unlocked(){return false}
            },
            allocation: {
                name(){return "配置"},
                data(){return ""},
                unlocked(){return false}
            }
        }
    },
    civics:{
        name(){return '村庄'},
        unlocked(){return player.game.stage.gte(4)}
    },
    setting:{
        name(){return "设置"},
        subTab: {
            setting: {
                name(){return "设置"},
                data(){return ""},
            },
            stats: {
                name(){return "统计"},
                data(){return ""},
            },
        }
    },
}

var resource = {
    main: ResourceMain,
}

var main = {
    action: MainAction,
    building: MainBuilding,
    craft: MainCraft,
}

var mainTab = {
    action:{
        name(){return '行动'},
        id(){return 'action'},
    },
    building:{
        name(){return '建筑'},
        id(){return 'building'},
    },
    craft:{
        name(){return '采集'},
        id(){return 'craft'},
    },
}

var civics = {
    citizens: CivicsCitizens,
    jobs: CivicsJobs,
    workshop: CivicsWorkshop,
}