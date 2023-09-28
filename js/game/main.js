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
        name(){return '行动'},
        id(){return 'action'},
    },
    building:{
        name(){return '建筑'},
        id(){return 'building'},
    },
}

var main = {
    resource: MainResource,
    action: MainAction,
    building: MainBuilding,
}