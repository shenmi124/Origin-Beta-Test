var mainButton = {
    main:{
        name(){return "主页"},
    },
    civics:{
        name(){return '村庄'},
        unlocked(){return player.game.stage.gte(4)}
    },
    setting:{
        name(){return "设置"},
        subTab: {
            setting(){return "设置"},
            stats(){return "统计"}
        }
    },
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

var main = {
    action: MainAction,
    building: MainBuilding,
    craft: MainCraft,
}

var resource = {
    main: ResourceMain,
}

var civics = {
    citizens: CivicsCitizens,
    jobs: CivicsJobs,
    workshop: CivicsWorkshop,
}