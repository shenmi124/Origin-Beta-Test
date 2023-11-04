var mainButton = {
    main:{
        name(){return i18n('mainButton.main')},
    },
    research:{
        name(){return i18n('mainButton.research')},
        unlocked(){return getResourceUnlocked('fiber')}
    },
    setting:{
        name(){return i18n('mainButton.setting')},
    },
}

var mainTab = {
    action:{
        name(){return ''},
        id(){return 'action'},
    },
    building:{
        name(){return '建筑'},
        id(){return 'building'},
    },
    craft:{
        name(){return '制作'},
        id(){return 'craft'},
    },
}

var main = {
    resource: MainResource,

    action: MainAction,
    building: MainBuilding,
    craft: MainCraft
}