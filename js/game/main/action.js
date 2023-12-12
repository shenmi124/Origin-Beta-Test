var MainAction = {
    wakeUp:{
        name(){return '醒来'},
        onClick(){
            gameStage(1)
            addLog('头痛欲裂。')
            addLog('你醒在一片荒地。')
            addLog('除了无尽的草原什么都没有。')
        },
        tooltip(){return '苏醒...'},
        unlocked(){return player.data.stage.eq(0)},
        cooldown(){return n(2.5)},
    },
    explore:{
        name(){return '探索'},
        onClick(){
            let find = []
            for(let i in main['action']['explore']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['action']['explore']['gain'][i]['probability']()).gte(exp)){
                    let gain = n(main['action']['explore']['gain'][i]['base']()).add(n(Math.random()).mul(main['action']['explore']['gain'][i]['float']())).ceil()
                    player['action']['explore'][i] = player['action']['explore'][i].add(gain).min(main['craft'][i]['max']())
                    player['action']['explore'][i+'Fined'] = true
                    find.push(i)
                }
            }
            if(find[0]!==undefined){
                let t = ''
                let f = false
                for(let i in find){
                    t += (f ? ' ' : '')+main['action']['explore']['gain'][find[i]]['name']()
                    f = true
                }
                addLog('*你找到了一些'+t+'*','#888')
            }else{
                player.action.explore.defined = true
                addLog('*什么都没找到*','#888')
            }
        },
        gain:{
            collect: {
                name(){return '泥土'},
                probability(){return n(25)},
                base(){return n(1)},
                float(){return n(2)},
            },
            harvest: {
                name(){return '植被'},
                probability(){return n(20)},
                base(){return n(1)},
                float(){return n(2)},
            },
        },
        tooltip(){
            let con = ''
            if(player.resource.food.gt(0)){
                con = '<hr>食物帮助你深入探索'
            }
            return '寻找可用资源<br>即使没有工具与食物走不了多远'+con
        },
        data:{
            collect(){return n(0)},
            collectFined(){return false},
            harvest(){return n(0)},
            harvestFined(){return false},
        },
        cooldown(){return n(7.5)},
        unlocked(){return player.data.stage.gte(1)},
    },
}