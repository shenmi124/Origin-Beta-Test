var MainAction = {
    wakeUp:{
        name(){return '醒来'},
        onClick(){
            player.data.start = n(1)
            document.getElementById("rightColumn").style.opacity = 1
            addLog('头痛欲裂。')
            addLog('你醒在一片荒地。')
            addLog('除了无尽头的草原什么都没有。')
        },
        tooltip(){return '苏醒...'},
        unlocked(){return player.data.start.eq(0)},
        cooldown(){return n(3)},
    },
    explore:{
        name(){return '探索'},
        onClick(){
            let find = []
            for(let i in main['action']['explore']['gain']){
                let Base = main['action']['explore']['gain'][i]
                let exp = n(Math.random() * 100).ceil()
                if(n(Base['probability']()).gte(exp)){
                    let gain = n(Base['base']()).add(Math.random(Number(Base['float']())))
                    player['action']['explore'][i] = player['action']['explore'][i].add(gain)
                    player['action']['explore'][i+'Fined'] = true
                    find.push(i)
                }
            }
            if(find[0]!==undefined){
                let t = ''
                for(let i in find){
                    t += main['action']['explore']['gain'][find[i]]['name']()
                }
                addLog('*你找到了一些'+t+'*','#888')
            }else{
                player.action.explore.defined = true
                addLog('*什么都没找到*','#888')
            }
        },
        gain:{
            collect: {
                name(){return ' 泥土'},
                probability(){return n(20)},
                base(){return n(1)},
                float(){return n(2)},
            },
            harvest: {
                name(){return ' 植被'},
                probability(){return n(20)},
                base(){return n(1)},
                float(){return n(2)},
            },
        },
        tooltip(){return '寻找可用资源<br>即使没有工具与食物走不了多远'},
        data:{
            collect(){return n(0)},
            collectFined(){return false},
            harvest(){return n(0)},
            harvestFined(){return false},
        },
        cooldown(){return n(10)},
        unlocked(){return player.data.start.gte(1)},
    },
    collect:{
        name(){return '采集'},
        gain:{
            dirt:{
                probability(){return n(70)},
                base(){return n(0.75)},
                float(){return n(0.75)},
                unlocked(){return true},
            },
        },
        luck(){
            let base = n(1)
            let m11 = player.research.m11.mul(0.2)
            let m22 = player.research.m22.mul(0.2)
            let m32 = player.research.m32.mul(0.5)
            let l = n(base).add(m11).add(m22).add(m32)
            return l
        },
        mul(){
            let base = n(1)
            let m21 = player.research.m21.mul(0.3)
            let m31 = player.research.m31.mul(0.5)
            let m = n(base).add(m21).add(m31)
            return m
        },
        onClick(){
        },
        tooltip(){
            let base = ''
            let gain = ''
            let mul = ''
            let luck = ''
            let hr = ''
            if(n(main['action']['collect']['luck']()).gt(1)){
                luck = '<div>幸运倍率:<br><li-hid>×'+format(main['action']['collect']['luck']())+'</div>'
                hr = '<hr>'
            }
            if(n(main['action']['collect']['mul']()).gt(1)){
                mul = '<div>产出倍率:<br><li-hid>×'+format(main['action']['collect']['mul']())+'</div>'
                hr = '<hr>'
            }
            return "泥土从你的手中漏出"+base+gain+hr+'<small>'+luck+mul+"</small></left>"
        },
        cooldown(){return n(5)},
        data:{
            actionDirt(){return []},
        },
        unlocked(){return player.action.explore.collectFined==true},
    },
    harvest:{
        name(){return '收割'},
        tooltip(){
            let mul = ''
            let hr = ''
            if(n(main.action.harvest.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.action.harvest.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            return '割草'+hr+mul
        },
        mul(){
            let base = n(1)
            let m33 = player.research.m33.mul(0.5)
            let m = n(base).add(m33)
            return m
        },
        onClick(){},
        cooldown(){return n(5)},
        unlocked(){return player.action.explore.harvestFined==true},
    },
}