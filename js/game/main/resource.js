var MainResource = {
    dirt:{
        name(){return i18n("resource.dirt")},
        color(){return '#cf7004'},
        max(){return getResourceBaseMax('dirt')},
        gain(){return n(0)},
        tooltip:{
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(30)
                    }
                }
            }
        },
        research(){return n(0.5)},
        unlocked(){return true},
    },
    grass:{
        name(){return '植被'},
        color(){return 'green'},
        max(){return getResourceBaseMax('grass')},
        gain(){return getBuildGain('farmland','grass')},
        tooltip:{
            base(){return '在这样荒芜的地方植物确实是不常见的东西'},
            gain: {
                buildingFar: {
                    name: '建筑农田',
                    number(){
                        return getBuildGain('farmland','grass')
                    }
                }
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(20)
                    }
                }
            }
        },
        research(){return n(2)},
        unlocked(){return getResourceUnlocked('grass')},
    },
    fiber:{
        name(){return i18n("resource.fiber")},
        color(){return '#bac485'},
        max(){return getResourceBaseMax('fiber')},
        gain(){return n(0)},
        tooltip:{
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(10)
                    }
                }
            }
        },
        research(){return n(1)},
        unlockAction(){
            addLog('你现在可以在研究选项卡下进行研究了','#888')
        },
        unlocked(){return getResourceUnlocked('fiber')},
    },
    water:{
        name(){return '水'},
        color(){return 'blue'},
        max(){return getResourceBaseMax('water')},
        gain(){return n(0)},
        tooltip:{
            base: '从水下第一个萌芽开始',
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(3)
                    }
                }
            }
        },
        research(){return n(1)},
        unlocked(){return false},
    },
    stone:{
        name(){return i18n("resource.stone")},
        color(){return '#444'},
        max(){return getResourceBaseMax('stone')},
        gain(){return n(0)},
        tooltip:{
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(50)
                    }
                }
            }
        },
        research(){return n(5)},
        unlockAction(){
            addLog('你在泥土中发现了一些石子','#000')
        },
        unlocked(){return getResourceUnlocked('stone')},
    },
    tin:{
        name(){return i18n("resource.tin")},
        color(){return '#999'},
        max(){return getResourceBaseMax('tin')},
        gain(){return n(0)},
        tooltip:{
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(30)
                    }
                }
            }
        },
        research(){return n(5)},
        unlockAction(){
            addLog('你在泥土中发现了一些金属','#000')
        },
        unlocked(){return getResourceUnlocked('tin')},
    },
    gem:{
        name(){return i18n("resource.gem")},
        Class(){return 'box'},
        color(){return '#15a1a9'},
        max(){return getResourceBaseMax('gem')},
        gain(){return n(0)},
        tooltip:{
            gain: {
            },
            max: {
                baseMax: {
                    name: "基础",
                    number(){
                        return n(5)
                    }
                }
            }
        },
        research(){return n(5)},
        unlocked(){return getResourceUnlocked('gem')},
    },
    researchPoints:{
        newType(){return '研究资源'},
        name(){return '研究'},
        color(){return 'rgb(74, 161, 254)'},
        max(){return researchNeeds(player.research.conducted)},
        gain(){return n(1)},
        tooltip:{
            base(){return '智慧最好的体现<hr>研究到达上限后完成研究<hr>研究上限取决于[消耗数量×研究难度]'},
            gain: {
                base: {
                    name: '自身',
                    number(){
                        return n(1)
                    }
                }
            },
            max: {
                baseMax: {
                    name: "正在进行的研究",
                    number(){
                        return researchNeeds(player.research.conducted)
                    }
                }
            }
        },
        unlocked(){return getResourceUnlocked('researchPoints') || main['resource']['researchPoints']['max']().gt(0)},
    },
    devSpeed:{
        newType(){return '特殊资源'},
        name(){return '时速'},
        color(){return 'rgb(74, 161, 254)'},
        tooltip:{
            base: '真实游戏速度',
        },
        unlocked(){return !n(player.data.devSpeed).eq(1)},
    },
}