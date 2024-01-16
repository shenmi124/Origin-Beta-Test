var MainResource = {
    explore:{
        name(){return i18n("resource.explore")},
        color(){return '#2ca02c'},
        gain(){return n(0)},
        mulResearch(){return n(1)},
        unlocked(){return player.resource.explore.gte(1000)},
    },
    dirt:{
        name(){return i18n("resource.dirt")},
        color(){return 'rgb(150, 108, 74)'},
        max(){return n(30)},
        gain(){return n(0)},
        mulResearch(){return n(1)},
        unlocked(){return true},
    },
    wood:{
        name(){return i18n("resource.wood")},
        color(){return 'rgb(193 65 0)'},
        max(){return n(30)},
        gain(){return n(0)},
        mulResearch(){return n(1)},
        unlocked(){return getResourceUnlocked('wood') && false},
    },
    stone:{
        name(){return i18n("resource.stone")},
        color(){return '#666'},
        max(){return n(50)},
        gain(){return n(0)},
        research(){return n(5)},
        unlockAction(){
            addLog('你从泥土中发现了一些石子')
        },
        unlocked(){return getResourceUnlocked('stone')},
    },
    food:{
        name(){return '食物'},
        color(){return '#cf7004'},
        max(){return n(20)},
        gain(){return n(-0.2)},
        gainTooltip(){return '食用'},
        tooltip(){return '在这样荒芜的地方植物确实是不常见的东西'},
        unlockAction(){
            addLog('你找到了一些食物')
        },
        research(){return n(1)},
        unlocked(){return getResourceUnlocked('food')},
    },
    coal:{
        name(){return i18n("resource.coal")},
        color(){return '#000'},
        max(){return n(30)},
        gain(){return n(0)},
        research(){return n(10)},
        unlockAction(){
            addLog('你发现了一些煤炭','#000')
        },
        unlocked(){return getResourceUnlocked('coal')},
    },
    copper:{
        name(){return i18n("resource.copper")},
        color(){return 'rgb(256, 174, 58)'},
        max(){return n(30)},
        gain(){return n(0)},
        research(){return n(20)},
        unlockAction(){
            addLog('你发现了一些金属','#000')
        },
        unlocked(){return getResourceUnlocked('copper')},
    },
    tin:{
        name(){return i18n("resource.tin")},
        color(){return '#999'},
        max(){return n(30)},
        gain(){return n(0)},
        research(){return n(50)},
        unlockAction(){
            addLog('你发现了一些金属','#000')
        },
        unlocked(){return getResourceUnlocked('tin')},
    },
    gem:{
        name(){return i18n("resource.gem")},
        Class(){return 'box'},
        color(){return '#15a1a9'},
        max(){return n(5)},
        gain(){return n(0)},
        research(){return n(5)},
        unlockAction(){
            addLog('你发现了一种昂贵的宝石,或许可以用来贸易','#000')
        },
        unlocked(){return getResourceUnlocked('gem')},
    },
    researchPoints:{
        newType(){return '研究资源'},
        name(){return '科学'},
        color(){return 'rgb(74, 161, 254)'},
        max(){return researchRequire(player.research.conducted)},
        gain(){return n(1)},
        tooltip(){return '智慧最好的体现<hr>科学抵达基础上限后完成研究<hr>科学基础上限取决于[消耗数量×研究难度]'+(player.research.conducted!==undefined ? '<hr>'+mainResearch['main'][player.research.conducted]['name']() : '')},
        unlocked(){return getResourceUnlocked('researchPoints') || main['resource']['researchPoints']['max']().gt(0)},
    },
}