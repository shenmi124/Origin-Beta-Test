var MainResource = {
    dirt:{
        name(){return i18n("resource.dirt")},
        color(){return '#cf7004'},
        max(){return n(30)},
        gain(){return n(0)},
        mulResearch(){return player.research.m53.mul(0.5).add(1)},
        research(){return n(0.5)},
        unlocked(){return true},
    },
    plant:{
        name(){return '植被'},
        color(){return 'green'},
        max(){return n(20)},
        gain(){return n(0)},
        tooltip(){return '在这样荒芜的地方植物确实是不常见的东西'},
        research(){return n(1)},
        unlocked(){return getResourceUnlocked('plant')},
    },
    fiber:{
        name(){return i18n("resource.fiber")},
        color(){return '#bac485'},
        max(){return n(10)},
        gain(){return n(0)},
        research(){return n(2)},
        unlockAction(){
            addLog('你现在可以在研究选项卡下进行研究了','#888')
        },
        unlocked(){return getResourceUnlocked('fiber')},
    },
    water:{
        name(){return '水'},
        color(){return 'blue'},
        max(){return n(3)},
        gain(){return n(0)},
        tooltip(){return '从水下第一个萌芽开始'},
        research(){return n(1)},
        unlocked(){return false},
    },
    stone:{
        name(){return i18n("resource.stone")},
        color(){return '#666'},
        max(){return n(50)},
        gain(){return n(0)},
        research(){return n(5)},
        unlockAction(){
            addLog('你发现了一些石子','#000')
        },
        unlocked(){return getResourceUnlocked('stone')},
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
        max(){return researchNeeds(player.research.conducted)},
        gain(){return n(1)},
        tooltip(){return '智慧最好的体现<hr>科学抵达基础上限后完成研究<hr>科学基础上限取决于[消耗数量×研究难度]'},
        unlocked(){return getResourceUnlocked('researchPoints') || main['resource']['researchPoints']['max']().gt(0)},
    },
    copperOre:{
        newType(){return '原料资源'},
        name(){return i18n("resource.copperOre")},
        color(){return 'rgb(256, 174, 58)'},
        gain(){return n(0)},
        research(){return n(100)},
        unlocked(){return getResourceUnlocked('copperOre')},
    },
    craft:{
        newType(){return '能力资源'},
        name(){return '巧物'},
        color(){return '#000'},
        number(){return abilityCraft()},
        tooltip(){return '巧物决定你了制作的速度'},
        unlocked(){return getResourceUnlocked('craft')},
    },
    devSpeed:{
        newType(){return '特殊资源'},
        name(){return '时速'},
        color(){return 'rgb(74, 161, 254)'},
        number(){return player.data.devSpeed},
        tooltip(){return '真实游戏速度'},
        unlocked(){return !n(player.data.devSpeed).eq(1)},
    },
}