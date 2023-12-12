var mainButton = {
    main:{
        name(){return i18n('mainButton.main')},
    },
    research:{
        name(){return i18n('mainButton.research')},
        unlocked(){return false}
    },
    setting:{
        name(){return i18n('mainButton.setting')},
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
    craft: MainCraft
}