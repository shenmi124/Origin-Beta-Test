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
        speed(){
            let base = n(1)
            if(player.workshop.mountaineeringPickaxe){
                base = base.add(0.1)
            }
            return base
        },
        lucky(){
            let base = n(1)
            if(player.workshop.mountaineeringPickaxe){
                base = base.add(0.1)
            }
            return base
        },
        tooltip(){
            let con = '<br>即使没有工具与食物走不了多远'
            if(player.resource.food.gt(0)){
                con += '<hr>食物帮助你深入探索'
            }
            if(player.workshop.mountaineeringPickaxe){
                con += '<hr>工具帮助你深入探索'
            }
            if(player.resource.food.gt(0) && player.workshop.mountaineeringPickaxe){
                con = ''
            }
            let speed = ''
            let lucky = ''
            let hr = ''
            if(n(main['craft']['stone']['speed']()).gt(1)){
                speed = '<left>速度倍率: <mul>×</mul>'+format(main['craft']['stone']['speed']())+'</left>'
                hr = '<hr>'
            }
            if(n(main['craft']['stone']['lucky']()).gt(1)){
                lucky = '<left>幸运倍率: <mul>×</mul>'+format(main['craft']['stone']['lucky']())+'</left>'
                hr = '<hr>'
            }
            return '寻找可用资源'+con+speed+lucky+hr
        },
        onClick(){
            let find = []
            let special = []
            for(let i in main['action']['explore']['gain']){
                let exp = n(Math.random() * 100).mul(main['action']['explore']['lucky']())
                if(n(main['action']['explore']['gain'][i]['probability']()).gte(exp)){
                    if(main['action']['explore']['gain'][i]['unlocked']()){
                        if(!main['action']['explore']['gain'][i]['instant']()){
                            let random = n(Math.random()).mul(main['action']['explore']['gain'][i]['float']())
                            let gain = n(main['action']['explore']['gain'][i]['base']()).add(random).ceil()
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
                    if(find[i]=='tree' && !player.action.explore.treeFined){
                        addLog('你找到了一片山丘,零零落落的有几棵树在山尖上')
                    }
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
                name(){return '土堆'},
                instant(){return false},
                unlocked(){return true},
                probability(){return n(33.3)},
                base(){return n(1)},
                float(){return n(2)},
            },
            stone: {
                name(){return '石头'},
                instant(){return false},
                unlocked(){return player.building.civics.gte(1)},
                probability(){return n(8)},
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
                probability(){return n(22.5)},
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
            tree: {
                name(){return '树'},
                instant(){return false},
                unlocked(){return player.workshop.mountaineeringPickaxe},
                probability(){return n(7.5)},
                base(){return n(1)},
                float(){return n(1)},
            },

            civics: {
                name(){return '定居地'},
                instant(){return true},
                unlocked(){return player.craft.harvestClicks.gte(1)},
                probability(){return n(20)},
            },
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
            tree(){return n(0)},
            treeFined(){return false},

            civicsFined(){return false},
        },
        cooldown(){return n(7.5).div(main['action']['explore']['speed']())},
        unlocked(){return player.game.stage.gte(1)},
    },
    woodenBeams: {
        name(){return '加工木梁'},
        onClick(){
            player.resource.wood = player.resource.wood.sub(main['action']['woodenBeams']['cost']())
            player.resource.woodenBeams = player.resource.woodenBeams.add(main['action']['woodenBeams']['gain']())
        },
        cost(){return n(20)},
        gain(){return n(1)},
        tooltip(){return '将木材加工<hr><left>'+format(main['action']['woodenBeams']['cost']())+colorText('wood')[1]+' -> '+format(main['action']['woodenBeams']['gain']())+colorText('woodenBeams')[1]+'</left>'},
        cooldown(){return n(20)},
        canClick(){return player.resource.wood.gte(main['action']['woodenBeams']['cost']())},
        unlocked(){return player.workshop.axe},
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