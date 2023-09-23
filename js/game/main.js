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
    resource:{
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
        grass:{
            name(){return '植被'},
            color(){return 'green'},
            max(){return n(main.resource.grass.tooltip.max.baseMax.number())},
            gain(){return n(main.resource.grass.tooltip.gain.buildingFar.number())},
            tooltip:{
                base: '在这样荒芜的地方植物确实是不常见的东西',
                gain: {
                    buildingFar: {
                        name: '建筑农田',
                        number(){
                            return n(getBuildGain('farmland','grass'))
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
            unlocked(){return false},
        },
        water:{
            name(){return '水'},
            color(){return 'blue'},
            max(){return n(main.resource.water.tooltip.max.baseMax.number())},
            gain(){return n(0)},
            tooltip:{
                base: '生命之源',
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
    },
    action:{
        collectionDirt:{
            name(){return '采集泥土'},
            gain(){
                let a = []
                let res = [
                    'dirt','stone','tin','gem'
                ]
                let pro = [
                    n(70),n(5),n(0.5),n(0.05)
                ]
                let bas = [
                    n(0.75),n(0.05),n(0.005),n(0)
                ]
                let ran = [
                    n(0.75),n(0.15),n(0.005),n(0.001)
                ]
                let unl = [
                    true,true,true,true
                ]
                for(let i in res){
                    a.push([res[i],n(pro[i]).mul(this.luck()),bas[i],ran[i],unl[i]])
                }
                return a
            },
            luck(){return n(1).add(player.research.m11.mul(0.2).add(1))},
            mul(){return n(1)},
            onClick(){
                for(let i in main['action']['collectionDirt']['gain']()){
                    let res = main['action']['collectionDirt']['gain']()[i]
                    let p = n(Math.random() * 99)
                    if(res[1].gte(p) && res[4]){
                        player['resource'][res[0]] = player['resource'][res[0]].add(n(res[2]).add(n(Math.random()).mul(res[3])).mul(n(main['action']['collectionDirt']['mul']()))).min(main['resource'][res[0]]['max']())
                        if(!player.game.actionDirt.includes(res[0])){
                            player.game.actionDirt.push(res[0])
                        }
                    }
                }
            },
            tooltip(){
                let base = ''
                let gain = ''
                let mul = ''
                for(let i in main['action']['collectionDirt']['gain']()){
                    let res = main['action']['collectionDirt']['gain']()[i]
                    if(res[4] && player.game.actionDirt.includes(res[0])){
                        base = '<hr><left>获取:'
                        gain += '<br><li-hid>'+colorText(res[0])[1]
                        //formatScientific(res[1],1)+'%'
                        //format(n((res[2]).add(n(0).mul(res[3]))))+'~'+format(n((res[2]).add(n(1).mul(res[3]))))
                    }
                }
                if(n(main['action']['collectionDirt']['mul']()).gt(1)){
                    mul = '<hr>效果倍率:<br><li-hid>×'+formatScientific(main['action']['collectionDirt']['mul'](),0)
                }
                return "泥土从你的手中漏出"+base+gain+mul+"</left>"
            },
            unlocked(){return true},
        },
        mow:{
            name(){return '割草'},
            tooltip(){return '割草,然后制取纤维'},
            onClick(){player.resource.fiber = player.resource.fiber.add(n(Math.random() * 0.2).mul(player.research.m12.mul(0.25).add(1)))}
        }
    },
    building:{
        farmland:{
            name(){return '农田'},
            unlocked(){return false},
            tooltip:{
                base(){return '经过处理,植物生长异常活跃'},
                cost: {
                    dirt(){return n(5)},
                    stone(){return n(1)},
                    grass(){return n(0.05)}
                },
                costPower(){return n(0.025)},
                effect: {
                    gain:{
                        grass(){return n(0.005)}
                    }
                }
            },
        },
    },
}

var mainResearch = {
    main:{
        m21:{
            name(){return '燧石打磨'},
            tooltip:{
                0(){return '尝试在泥土中寻找其他物质'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 获取概率×120%',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(12)},
                    fiber(){return n(5)}
                },
            },
            max(){return n(1)},
            map(){return 2},
            canvas(){return ['m11']},
            unlocked(){return player.research.m11.gte(1) && getResourceUnlocked('stone')}
        },
        m11:{
            name(){return '泥筛工艺'},
            tooltip:{
                0(){return '尝试在泥土中寻找其他物质'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 获取概率×120%',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(12)},
                    fiber(){return n(4)}
                },
            },
            max(){return n(1)},
            map(){return 1}
        },
        m12:{
            name(){return '纤维绳'},
            tooltip:{
                0(){return '用植物纤维来搓成纤维绳'},
            },
            effect:{
                0:{
                    1(){return ['行动割草 获取倍率×125%',true]},
                },
            },
            cost: {
                0:{
                    fiber(){return n(6)}
                },
            },
            max(){return n(1)},
            map(){return 1}
        }
    }
}