var ResourceMain = {
    explore: {
        name(){return "探索"},
        color(){return '#2ca02c'},
        gain(){return n(0)},
        unlocked(){return false},
    },
    pollution: {
        name(){return "污染"},
        tooltip(){return '每分钟污染会减少1%外加2000点<joker>- GregTech</joker>'},
        color(){return '#603708'},
        gain(){return n(2000).add(player.resource.pollution.mul(0.01)).div(60).neg()},
        unlocked(){return getResourceUnlocked('pollution') || player.building.kiln.gte(1)},
        negative(){return true}
    },
    node1: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('pollution')},
    },

    citizens: {
        name(){return "居民"},
        color(){return '#000'},
        capped(){return n(0)},
        effect: {
            gain: {
                add: {
                    idea(){return n(1).mul(getEfficient('happiness'))},
                    food(){return n(-0.1).mul(getEfficient('happiness').max(1))}
                }
            },
            capped: {
                add: {
                    idea(){return n(1000)},
                }
            },
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['-','%']},
                }
            },
        },
        tooltip(){
            return `一旦居民不再幸福他们很可能会离开你<br>同时居民的增加意味着安定度的降低`
        },
        unlockAction(){
            getStage(3)
            addLog('你招揽到了第一批原住民,看起来他们和普通的人类没什么区别,你也能与他们正常交流')
            addLog('检查村庄选项卡', '#888')
            addLog('居民产生思想,但思想也会枯竭')
        },
        unlocked(){return getResourceUnlocked('citizens')},
    },
    idea: {
        name(){return "思想"},
        color(){return 'rgb(186, 0, 192)'},
        gain(){return n(0)},
        capped(){return n(0)},
        tooltip(){return '默默收集散落的想法,只是思想也会被遗忘'},
        unlocked(){return getResourceUnlocked('citizens')},
    },
    knowledge: {
        name(){return "思维"},
        color(){return 'rgb(0 143 255)'},
        gain(){return n(MAIN['action']['blueprint']['costSecond']()[1]).neg()},
        gainTooltip(){return '加工'},
        capped(){return n(0)},
        tooltip(){return '非圣人莫能为,非智者莫能先'},
        unlocked(){return getResourceUnlocked('knowledge') || player.workshop.parchment},
    },
    node2: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('citizens')},
    },

    food: {
        name(){return "粮食"},
        color(){return '#cf7004'},
        capped(){return n(20)},
        gain(){return n(-0.1)},
        gainTooltip(){return '食用'},
        tooltip(){return '立足根本'},
        unlocked(){return true},
    },
    leather: {
        name(){return "皮革"},
        color(){return '#763f00'},
        gain(){return n(MAIN['action']['parchment']['costSecond']()).neg()},
        gainTooltip(){return '加工'},
        capped(){return n(50)},
        unlocked(){return getResourceUnlocked('leather')},
    },
    dirt: {
        name(){return "泥土"},
        color(){return 'rgb(150, 108, 74)'},
        capped(){return n(30)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('dirt')},
    },
    wood: {
        name(){return "木材"},
        color(){return 'rgb(180,144,90)'},
        capped(){return n(30)},
        gain(){return n(MAIN['action']['plank']['costSecond']()).neg()},
        gainTooltip(){return '加工'},
        unlockAction(){
            addLog('在这样的平原上你几乎找不到树')
            addLog('但起码你可以确定这里是有木头的')
        },
        unlocked(){return getResourceUnlocked('wood')},
    },
    stone: {
        name(){return "石料"},
        color(){return '#666'},
        capped(){return n(50)},
        gain(){return n(0)},
        unlockAction(){
            addLog('你从泥土中发现了一些石子')
        },
        unlocked(){return getResourceUnlocked('stone')},
    },
    copper: {
        name(){return "铜"},
        color(){return '#FF9224'},
        capped(){return n(50)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('copper')},
    },
    coal: {
        name(){return "煤"},
        color(){return 'rgb(23 21 21)'},
        capped(){return n(500)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('coal')},
    },
    iron: {
        name(){return "铁"},
        color(){return '#999'},
        gain(){return n(0)},
        capped(){return n(50)},
        unlocked(){return getResourceUnlocked('iron')},
    },
    steel: {
        name(){return "钢"},
        color(){return '#444'},
        gain(){return n(0)},
        capped(){return n(50)},
        unlocked(){return getResourceUnlocked('steel')},
    },
    node3: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('plank')},
    },

    plank: {
        name(){return "木板"},
        tooltip(){return '锻造资源'},
        color(){return 'rgb(158 103 19)'},
        gain(){return MAIN['action']['plank']['gainSecond']()},
        gainTooltip(){return '加工'},
        mul(){return gameGetForging()},
        unlocked(){return getResourceUnlocked('plank')},
    },
    brick: {
        name(){return "砖"},
        tooltip(){return '锻造资源'},
        color(){return '#68533f'},
        gain(){return n(0)},
        mul(){return gameGetForging()},
        max(){return n(1000)},
        unlocked(){return getResourceUnlocked('brick')},
    },
    parchment: {
        name(){return "羊皮纸"},
        tooltip(){return '锻造资源'},
        color(){return '#a37d59'},
        gain(){return n(MAIN['action']['parchment']['gainSecond']()).sub(MAIN['action']['blueprint']['costSecond']()[0])},
        gainTooltip(){return '加工'},
        mul(){return gameGetForging()},
        unlocked(){return getResourceUnlocked('parchment')},
    },
    blueprint: {
        name(){return "蓝图"},
        tooltip(){return '锻造资源'},
        color(){return '#00aaff'},
        gain(){return MAIN['action']['blueprint']['gainSecond']()},
        gainTooltip(){return '加工'},
        effect: {
            capped: {
                add: {
                    knowledge(){return n(5)}
                }
            }
        },
        mul(){return gameGetForging()},
        unlocked(){return getResourceUnlocked('blueprint')},
    },
    node4: {
        type(){return 'node'},
        unlocked(){return getResourceUnlocked('stardust') || getResourceUnlocked('bloodStone')},
    },
    
    stardust: {
        name(){return "瓶装星尘"},
        color(){return '#0000ff88'},
        Class(){return 'stardust'},
        capped(){return n(1)},
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(2)},
                    display(){return ['+','%']},
                }
            },
        },
        unlockAction(){
        },
        unlocked(){return getResourceUnlocked('stardust')},
    },
    bloodStone: {
        name(){return "血石"},
        color(){return '#ff000088'},
        Class(){return 'bloodStone'},
        capped(){return n(1)},
        effect: {
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(2)},
                    display(){return ['+','%']},
                }
            },
        },
        unlockAction(){
        },
        unlocked(){return getResourceUnlocked('bloodStone')},
    },
}