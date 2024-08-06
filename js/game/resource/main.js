var ResourceMain = {
    explore:{
        name(){return "探索"},
        color(){return '#2ca02c'},
        gain(){return n(0)},
        unlocked(){return false},
    },
    citizens:{
        name(){return "居民"},
        color(){return '#000'},
        capped(){return n(0)},
        effect: {
            gain: {
                add: {
                    idea(){return n(1).mul(getEfficient('happiness'))},
                    food(){return n(-0.1).mul(getEfficient('happiness').max(1)).mul(player.building.brewery.add(1))}
                }
            },
            capped: {
                add: {
                    idea(){return n(1000).mul(getEfficient('happiness'))},
                }
            },
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(1)},
                    display(){return ['+','%']},
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
    idea:{
        name(){return "思想"},
        color(){return 'rgb(186, 0, 192)'},
        gain(){return n(0)},
        capped(){return n(0)},
        tooltip(){return '默默收集散落的想法,只是思想也会被遗忘'},
        unlocked(){return getResourceUnlocked('citizens')},
    },
    food:{
        name(){return "粮食"},
        color(){return '#cf7004'},
        capped(){return n(20)},
        gain(){return n(-0.1)},
        gainTooltip(){return '食用'},
        tooltip(){return '立足根本'},
        unlocked(){return true},
    },
    leather:{
        name(){return "皮革"},
        color(){return '#763f00'},
        capped(){return n(50)},
        tooltip(){return '具有贸易价值'},
        unlocked(){return getResourceUnlocked('leather')},
    },
    dirt:{
        name(){return "泥土"},
        color(){return 'rgb(150, 108, 74)'},
        capped(){return n(30)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('dirt')},
    },
    wood:{
        name(){return "木材"},
        color(){return 'rgb(180,144,90)'},
        capped(){return n(30)},
        gain(){return n(0)},
        unlockAction(){
            addLog('在这样的平原上你几乎找不到树')
            addLog('但起码你可以确定这里是有木头的')
        },
        unlocked(){return getResourceUnlocked('wood')},
    },
    stone:{
        name(){return "石料"},
        color(){return '#666'},
        capped(){return n(50)},
        gain(){return n(0)},
        unlockAction(){
            addLog('你从泥土中发现了一些石子')
        },
        unlocked(){return getResourceUnlocked('stone')},
    },
    copper:{
        name(){return "铜"},
        color(){return '#FF9224'},
        capped(){return n(50)},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('copper')},
    },
    iron:{
        name(){return "铁"},
        color(){return '#999'},
        capped(){return n(0)},
        unlocked(){return getResourceUnlocked('iron')},
    },

    plank:{
        name(){return "木板"},
        tooltip(){return '锻造资源'},
        color(){return 'rgb(158 103 19)'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('plank')},
    },
    bricks:{
        name(){return "石砖"},
        tooltip(){return '锻造资源'},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('bricks')},
    },
    tile:{
        name(){return "瓦"},
        tooltip(){return '锻造资源'},
        color(){return '#000'},
        gain(){return n(0)},
        unlocked(){return getResourceUnlocked('tile')},
    },
    
    meteorite:{
        name(){return "陨石"},
        color(){return '#000'},
        Class(){return 'meteorite'},
        capped(){return n(0.1)},
        tooltip(){return '陨石坠落'},
        unlockAction(){
            addLog('这些陨石的碎片应该有特殊的用处')
        },
        unlocked(){return getResourceUnlocked('meteorite')},
    },
    stardust:{
        name(){return "星尘"},
        color(){return '#00ffff'},
        Class(){return 'stardust'},
        effect: {
            capped: {
                mul: {
                    meteorite(){return n(10)},
                }
            },
            other:{
                happiness: {
                    name(){return '幸福度'},
                    effect(){return n(10)},
                    display(){return ['+','%']},
                }
            },
        },
        tooltip(){
            return `群星闪耀`
        },
        unlockAction(){
            addLog('这是你的第一颗<span class="stardust">星尘</span>')
            addLog('它可以提高陨石碎片的储存上限与幸福度')
        },
        unlocked(){return getResourceUnlocked('stardust')},
    },
}