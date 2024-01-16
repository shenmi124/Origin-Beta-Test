var MainAction = {
    wakeUp:{
        name(){return '醒来'},
        onClick(){
            getStage(1)
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
            let special = []
            for(let i in main['action']['explore']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['action']['explore']['gain'][i]['probability']()).gte(exp)){
                    if(main['action']['explore']['gain'][i]['unlocked']()){
                        if(!main['action']['explore']['gain'][i]['instant']()){
                            let gain = n(main['action']['explore']['gain'][i]['base']()).add(n(Math.random()).mul(main['action']['explore']['gain'][i]['float']())).ceil()
                            player['action']['explore'][i] = player['action']['explore'][i].add(gain).min(main['craft'][i]['max']())
                            player['action']['explore'][i+'Fined'] = true
                            find.push(i)
                        }else{
                            if(!player['action']['explore'][i+'Fined']){
                                player['action']['explore'][i+'Fined'] = true
                                special.push(i)
                            }
                        }
                    }
                }
            }
            if(find[0]!==undefined){
                let t = ''
                for(let i in find){
                    t += (i!=0 ? ' ' : '')+main['action']['explore']['gain'][find[i]]['name']()
                }
                addLog('*你找到了一些'+t+'*','#888')
            }
            if(special[0]!==undefined){
                for(let i in special){
                    if(special[i]=='colony'){
                        addLog('你找到了一片平坦的地方,这里貌似挺适合当做栖息地的')
                        addLog('你决定在此定居')
                    }
                    if(special[i]=='city'){
                        addLog('出于某些原因,你并没有在此定居,而是在继续进行探索')
                        addLog('不知走了多久,一座城邦映入你的眼帘...')
                        addLog('守卫:我们这不养闲人','#222')
                    }
                }
            }
            if(special[0]===undefined && find[0]===undefined){
                addLog('*什么都没找到*','#888')
            }

            player.resource.explore = player.resource.explore.add(n(Math.random() * 100).mul(actionEfficient()))
        },
        gain:{
            collect: {
                name(){return '泥土'},
                instant(){return false},
                unlocked(){return true},
                probability(){return n(30)},
                base(){return n(1)},
                float(){return n(2)},
            },
            harvest: {
                name(){return '植被'},
                instant(){return false},
                unlocked(){return true},
                probability(){return n(20)},
                base(){return n(1)},
                float(){return n(2)},
            },

            colony: {
                name(){return '定居地'},
                instant(){return true},
                unlocked(){return player.craft.harvestTimes.gte(1)},
                probability(){return n(20)},
            },
            city: {
                name(){return '进入城邦'},
                instant(){return true},
                unlocked(){return player.action.explore.colonyFined && player.resource.dirt.gte(10)},
                probability(){return n(5)},
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

            colonyFined(){return false},
            cityFined(){return false},
        },
        cooldown(){return n(7.5)},
        unlocked(){return player.data.stage.gte(1)},
    },
}