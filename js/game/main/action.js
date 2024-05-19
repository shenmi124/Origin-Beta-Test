var MainAction = {
    wakeUp: {
        name(){return '醒来'},
        onClick(){
            getStage(1)
            addLog('头痛欲裂。')
            addLog('你醒在一片荒地。')
            addLog('除了无尽的草原什么都没有。')
        },
        tooltip(){return '苏醒...'},
        unlocked(){return player.game.stage.eq(0)},
        cooldown(){return n(2.5)},
    },
    explore: {
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
                            player['action']['explore'][i] = player['action']['explore'][i].add(gain).min(main['craft'][i]['capped']())
                            if(!player['action']['explore'][i+'Fined']){
                                player['action']['explore'][i+'Fined'] = true
                            }
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
                    t += (i!==0 ? ' ' : '')+main['action']['explore']['gain'][find[i]]['name']()
                }
                addLog('*你找到了一些'+t+'*','#888')
            }
            if(special[0]!==undefined){
                for(let i in special){
                    if(special[i]=='civics'){
                        addLog('你找到了一片平坦的地方,这里貌似挺适合当做栖息地的')
                        addLog('你决定在此定居')
                    }
                }
            }
            if(special[0]===undefined && find[0]===undefined && n(getActionAuto('explore')).lte(0)){
                addLog('*什么都没找到*','#888')
            }

            player.resource.explore = player.resource.explore.add(n(10).pow(n(Math.random() * 2)))
        },
        gain:{
            citizens: {
                name(){return '原住民'},
                instant(){return false},
                unlocked(){return player.building.civics.gte(1)},
                probability(){return n(10)},
                base(){return n(1)},
                float(){return n(0)},
            },
            collect: {
                name(){return '泥土'},
                instant(){return false},
                unlocked(){return true},
                probability(){return n(30)},
                base(){return n(1)},
                float(){return n(2)},
            },
            stone: {
                name(){return '露天石料'},
                instant(){return false},
                unlocked(){return player.building.civics.gte(1)},
                probability(){return n(5)},
                base(){return n(1)},
                float(){return n(2)},
            },
            drop: {
                name(){return '树枝'},
                instant(){return false},
                unlocked(){return true},
                probability(){return n(5)},
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
            beast: {
                name(){return '野兽'},
                instant(){return false},
                unlocked(){return player.building.civics.gte(1)},
                probability(){return n(5)},
                base(){return n(2)},
                float(){return n(6)},
            },

            civics: {
                name(){return '定居地'},
                instant(){return true},
                unlocked(){return player.craft.harvestClicks.gte(1)},
                probability(){return n(20)},
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
            citizens(){return n(0)},
            citizensFined(){return false},
            collect(){return n(0)},
            collectFined(){return false},
            stone(){return n(0)},
            stoneFined(){return false},
            harvest(){return n(0)},
            harvestFined(){return false},
            drop(){return n(0)},
            dropFined(){return false},
            beast(){return n(0)},
            beastFined(){return false},

            civicsFined(){return false},
        },
        cooldown(){return n(7.5)},
        unlocked(){return player.game.stage.gte(1)},
    },
    platingStar: {
        name(){return '研磨星尘'},
        onClick(){
            player.resource.star = n(0)
            player.resource.stardust = player.resource.stardust.add(1)
        },
        tooltip(){return '让世间接纳星尘<hr>将你的所有陨石碎片转化为星尘并获得加成<hr><grey>你必须保持陨石碎片在上限时才能进行这个行动</grey>'},
        cooldown(){return n(600)},
        canClick(){return player.resource.star.gte(getResourceCapped('star'))},
        unlocked(){return !player.resource.star.eq(0)},
    }
}