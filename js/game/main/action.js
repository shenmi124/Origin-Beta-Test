var MainAction = {
    wakeUp: {
        name(){return '醒来'},
        onClick(){
            getStage(1)
            addLog('头痛欲裂')
            addLog('你醒在一片草原上')
            addLog('你貌似损失了一些记忆,尤其是关于你的“身世”')
        },
        tooltip(){return '苏醒...'},
        unlocked(){return player.game.stage.eq(0)},
        cooldown(){return n(2.5)},
    },
    explore: {
        name(){return '探索'},
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
            let lucky = ''
            let hr = ''
            if(n(MAIN['action']['explore']['lucky']()).gt(1)){
                lucky = '<left>幸运倍率: <mul>×</mul>'+format(MAIN['action']['explore']['lucky']())+'</left>'
                hr = '<hr>'
            }
            return '在茫茫无际的草原中寻找可用资源'+con+hr+lucky
        },
        onClick(){
            let find = []
            let special = []
            for(let i in MAIN['action']['explore']['gain']){
                if(MAIN['action']['explore']['gain'][i]['unlocked']()){
                    let exp = n(Math.random() * 100)
                    if(n(MAIN['action']['explore']['gain'][i]['probability']()).mul(MAIN['action']['explore']['lucky']()).mul(player['action']['explore'][i+'LuckyUp'].add(1)).gte(exp)){
                        if(!MAIN['action']['explore']['gain'][i]['instant']()){
                            let random = n(Math.random()).mul(MAIN['action']['explore']['gain'][i]['float']())
                            let gain = n(MAIN['action']['explore']['gain'][i]['base']()).add(random).ceil()
                            player['action']['explore'][i] = player['action']['explore'][i].add(gain).min(MAIN['craft'][i]['capped']())
                            if(!player['action']['explore'][i+'Found']){
                                player['action']['explore'][i+'Found'] = true
                            }
                            find.push(i)
                        }else{
                            if(!player['action']['explore'][i+'Found']){
                                player['action']['explore'][i+'Found'] = true
                                special.push(i)
                            }
                        }
                        player['action']['explore'][i+'LuckyUp'] = n(0)
                    }else{
                        player['action']['explore'][i+'LuckyUp'] = player['action']['explore'][i+'LuckyUp'].add(0.1)
                    }
                }
            }
            if(find[0]!==undefined){
                let t = ''
                for(let i in find){
                    t += (i!==0 ? ' ' : '')+MAIN['action']['explore']['gain'][find[i]]['name']()
                    if(find[i]=='stone' && !player.action.explore.stoneFound){
                        addLog('你找到了一处裸露的矿石,或许你可以从中开采到石料和矿石')
                    }
                    if(find[i]=='tree' && !player.action.explore.treeFound){
                        addLog('你找到了一片山丘,零零落落的有几棵树在山尖上')
                    }
                    if(find[i]=='meteorite' && !player.action.explore.meteoriteFound){
                        addLog('你找到了一块陨石')
                        addLog('陨石有较高的含铁量')
                        addLog('这给你带来了一些启发')
                    }
                    if(find[i]=='bloodStone' && !player.action.explore.bloodStoneFound){
                        addLog('奇怪,指南针突然猛的指向一个方向')
                        addLog('你们向那走去,发现了一块发光的<red>血石</red>')
                    }
                    if(find[i]=='bloodStone'){
                        addLog('你发现了一块<span style="color: #ff000088">血石</style>')
                    }
                }
                if(n(getActionAuto('explore')).lte(0)){
                    addLog('*你找到了一些'+t+'*','#888')
                }
            }
            if(special[0]!==undefined){
                for(let i in special){
                    if(special[i]=='civics'){
                        addLog('你找到了一片平坦的地方,这里貌似挺适合当做栖息地的')
                        addLog('你决定在此定居')
                    }
                    if(special[i]=='magnet'){
                        addLog('你偶然发现了一些磁铁')
                        addLog('它有着吸引铁磁性物质的特质')
                        addLog('这给你带来了一些启发')
                    }
                }
            }
            if(special[0]===undefined && find[0]===undefined && n(getActionAuto('explore')).lte(0)){
                addLog('*什么都没找到*','#888')
            }

            gainResource('explore', n(10).pow(n(Math.random() * 2)))
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
                probability(){return n(7.5)},
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
            meteorite: {
                name(){return '陨铁'},
                instant(){return false},
                unlocked(){return player.workshop.map},
                probability(){return n(5)},
                base(){return n(2)},
                float(){return n(2)},
            },
            bloodStone: {
                name(){return '血石'},
                instant(){return false},
                unlocked(){return player.workshop.compass && !player.action.explore.bloodStoneFound},
                probability(){return n(1e-9)},
                base(){return n(1)},
                float(){return n(0)},
            },

            civics: {
                name(){return '定居地'},
                instant(){return true},
                unlocked(){return player.craft.harvestTotal.gte(1)},
                probability(){return n(20)},
            },
            magnet: {
                name(){return '磁石'},
                instant(){return true},
                unlocked(){return player.workshop.map},
                probability(){return n(2)},
            },
        },
        data: {
            citizens(){return n(0)},
            citizensLuckyUp(){return n(0)},
            citizensFound(){return false},
            collect(){return n(0)},
            collectLuckyUp(){return n(0)},
            collectFound(){return false},
            stone(){return n(0)},
            stoneLuckyUp(){return n(0)},
            stoneFound(){return false},
            harvest(){return n(0)},
            harvestLuckyUp(){return n(0)},
            harvestFound(){return false},
            drop(){return n(0)},
            dropLuckyUp(){return n(0)},
            dropFound(){return false},
            beast(){return n(0)},
            beastLuckyUp(){return n(0)},
            beastFound(){return false},
            tree(){return n(0)},
            treeLuckyUp(){return n(0)},
            treeFound(){return false},
            bloodStone(){return n(0)},
            bloodStoneLuckyUp(){return n(0)},
            bloodStoneFound(){return false},
            meteorite(){return n(0)},
            meteoriteLuckyUp(){return n(0)},
            meteoriteFound(){return false},

            civicsFound(){return false},
            civicsLuckyUp(){return n(0)},
            magnetFound(){return false},
            magnetLuckyUp(){return n(0)},
        },
        cooldown(){return n(7.5)},
        unlocked(){return player.game.stage.gte(1)},
    },
    plank: {
        name(){return '加工木板'},
        tooltip(){
            let effect = ''
            if(player.action.plank.make){
                effect = '持续'
            }else{
                effect = '暂停'
            }
            let gain = `<br><grey>`+format(MAIN['action']['plank']['costSecond']())+colorText('wood')[1]+`/s -> `+format(MAIN['action']['plank']['gainSecond']())+colorText('plank')[1]+`/s</grey>`
            if(n(MAIN['action']['plank']['gainSecond']()).eq(0)){
                gain = ``
            }
            return `将木材加工<hr>点击切换制造状态<br>当前: `+effect+`<left><hr>`
            +format(MAIN['action']['plank']['cost']())+colorText('wood')[1]+` -> `+format(MAIN['action']['plank']['gain']())+colorText('plank')[1]
            +gain+`<br></left>`
        },
        cost(){
            let base = n(20)
            if(player.workshop.copperAxe){
                base = base.mul(0.5)
            }
            if(player.workshop.ironAxe){
                base = base.mul(0.5)
            }
            return base
        },
        costSecond(){
            let cost = MAIN['action']['plank']['cost']()
            return cost.div(getActionCooldown('plank')).mul(getActionAuto('plank'))
        },
        gain(){return n(1)},
        gainSecond(){
            if(!getActionCanClick('plank')){
                player.action.plank.make = false
                return n(0)
            }
            let gain = MAIN['action']['plank']['gain']()
            return gain.div(getActionCooldown('plank')).mul(getActionAuto('plank'))
        },
        onClick(){},
        data: {
            make(){return false},
        },
        auto(){
            if(player.action.plank.make){
                return getEfficient('action')
            }
            return n(0)
        },
        handoff(){
            gameOpenMaking('plank')
            if(player.resource.wood.lt(MAIN['action']['plank']['costSecond']())){
                player.action.plank.make = false
            }
        },
        cooldown(){return n(20)},
        coerciveClick(){return player.resource.wood.gte(MAIN['action']['plank']['costSecond']()) || hasActionClick('plank')},
        player(){return n(0)},
        canClick(){return player.resource.wood.gte(MAIN['action']['plank']['costSecond']())},
        unlocked(){return player.workshop.axe},
    },
    parchment: {
        name(){return '加工羊皮纸'},
        tooltip(){
            let effect = ''
            if(player.action.parchment.make){
                effect = '持续'
            }else{
                effect = '暂停'
            }
            let gain = `<br><grey>`+format(MAIN['action']['parchment']['costSecond']())+colorText('leather')[1]+`/s -> `+format(MAIN['action']['parchment']['gainSecond']())+colorText('parchment')[1]+`/s</grey>`
            if(n(MAIN['action']['parchment']['gainSecond']()).eq(0)){
                gain = ``
            }
            return `将皮革加工<hr>点击切换制造状态<br>当前: `+effect+`<left><hr>`
            +format(MAIN['action']['parchment']['cost']())+colorText('leather')[1]+` -> `+format(MAIN['action']['parchment']['gain']())+colorText('parchment')[1]
            +gain+`<br></left>`
        },
        cost(){
            let cost = n(50)
            if(player.workshop.papermaking){
                cost = cost.mul(0.8)
            }
            return cost
        },
        costSecond(){
            let cost = MAIN['action']['parchment']['cost']()
            return cost.div(getActionCooldown('parchment')).mul(getActionAuto('parchment'))
        },
        gain(){return n(1)},
        gainSecond(){
            if(!getActionCanClick('parchment')){
                player.action.parchment.make = false
                return n(0)
            }
            let gain = MAIN['action']['parchment']['gain']()
            return gain.div(getActionCooldown('parchment')).mul(getActionAuto('parchment'))
        },
        onClick(){},
        data: {
            make(){return false},
        },
        auto(){
            if(player.action.parchment.make){
                return getEfficient('action')
            }
            return n(0)
        },
        handoff(){
            gameOpenMaking('parchment')
            if(player.resource.leather.lt(MAIN['action']['parchment']['costSecond']())){
                player.action.parchment.make = false
            }
        },
        cooldown(){return n(60)},
        coerciveClick(){return player.resource.leather.gte(MAIN['action']['parchment']['costSecond']()) || hasActionClick('parchment')},
        player(){return n(0)},
        canClick(){return player.resource.leather.gte(MAIN['action']['parchment']['costSecond']())},
        unlocked(){return player.workshop.parchment},
    },
    blueprint: {
        name(){return '加工蓝图'},
        tooltip(){
            let effect = ''
            if(player.action.blueprint.make){
                effect = '持续'
            }else{
                effect = '暂停'
            }
            let gain = `<br><grey>`+format(MAIN['action']['blueprint']['costSecond']()[0])+colorText('parchment')[1]+`/s + `+format(MAIN['action']['blueprint']['costSecond']()[1])+colorText('knowledge')[1]+`/s -> `+format(MAIN['action']['blueprint']['gainSecond']())+colorText('blueprint')[1]+`/s</grey>`
            if(n(MAIN['action']['blueprint']['gainSecond']()).eq(0)){
                gain = ``
            }
            return `将羊皮纸刻画<hr>点击切换制造状态<br>当前: `+effect+`<left><hr>`
            +format(MAIN['action']['blueprint']['cost']()[0])+colorText('parchment')[1]+` + `+format(MAIN['action']['blueprint']['cost']()[1])+colorText('knowledge')[1]+` -> `+format(MAIN['action']['blueprint']['gain']())+colorText('blueprint')[1]
            +gain+`<br></left>`
        },
        cost(){
            let cost = n(1)
            let cost2 = n(100)
            return [cost,cost2]
        },
        costSecond(){
            let cost = MAIN['action']['blueprint']['cost']()[0]
            let cost2 = MAIN['action']['blueprint']['cost']()[1]
            return [cost.div(getActionCooldown('blueprint')).mul(getActionAuto('blueprint')),cost2.div(getActionCooldown('blueprint')).mul(getActionAuto('blueprint'))]
        },
        gain(){return n(1)},
        gainSecond(){
            if(!getActionCanClick('blueprint')){
                player.action.blueprint.make = false
                return n(0)
            }
            let gain = MAIN['action']['blueprint']['gain']()
            return gain.div(getActionCooldown('blueprint')).mul(getActionAuto('blueprint'))
        },
        onClick(){},
        data: {
            make(){return false},
        },
        auto(){
            if(player.action.blueprint.make){
                return getEfficient('action')
            }
            return n(0)
        },
        handoff(){
            gameOpenMaking('blueprint')
            if(player.resource.parchment.lt(MAIN['action']['blueprint']['costSecond']()[0]) && player.resource.knowledge.lt(MAIN['action']['blueprint']['costSecond']()[1])){
                player.action.blueprint.make = false
            }
        },
        cooldown(){return n(120)},
        coerciveClick(){return (player.resource.parchment.gte(MAIN['action']['blueprint']['costSecond']()[0]) && player.resource.knowledge.gte(MAIN['action']['blueprint']['costSecond']()[1])) || hasActionClick('blueprint')},
        player(){return n(0)},
        canClick(){return player.resource.parchment.gte(MAIN['action']['blueprint']['costSecond']()[0]) && player.resource.knowledge.gte(MAIN['action']['blueprint']['costSecond']()[1])},
        unlocked(){return player.workshop.blueprint},
    },
}