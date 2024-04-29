var mainButton = {
    main:{
        name(){return "主页"},
    },
    civics:{
        name(){return '村庄'},
        unlocked(){return player.game.stage.gte(4)}
    },
    research:{
        name(){return "研究"},
        unlocked(){return false}
    },
    setting:{
        name(){return "设置"},
    },
    data:{
        name(){return "数据"},
    },
}

var mainTab = {
    action:{
        name(){return '探索'},
        id(){return 'action'},
    },
    building:{
        name(){return '建筑'},
        id(){return 'building'},
    },
    craft:{
        name(){return '行动'},
        id(){return 'craft'},
    },
}

var main = {
    resource: MainResource,

    action: MainAction,
    building: MainBuilding,
    craft: MainCraft,
}

var civics = {
    citizens: CivicsCitizens,
    jobs: CivicsJobs,
}