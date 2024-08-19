let MainCraft = {
    bloodStone: {
        name(){return '血石碎片'},
        capped(){return n(1)},
        tooltip(){
            let times = formatWhole(player.action.explore.citizens,0)+' <grey>/ '+formatWhole(this.capped(),0)+'</grey>'
            return times
        },
        cooldown(){return n(0)},
        canClick(){return false},
        unlocked(){return player.action.explore.bloodStoneFound},
    },
    citizens: {
        name(){return '原住民'},
        capped(){return n(2).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        tooltip(){
            let times = '<hr>已标记: '+formatWhole(player.action.explore.citizens,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return '他们为你工作,而你给与他们住所与食物<br>公平的交易<hr><grey>你需要提供食物与住所,否则他们不会跟随你</grey>'+times
        },
        onClick(){
            gainResource('citizens', n(1))
            player.action.explore.citizens = player.action.explore.citizens.sub(1)
            CitizensFix()
            
            getStage(4)
        },
        cooldown(){return n(20)},
        canClick(){return player.action.explore.citizens.gte(1) && player.resource.food.gt(0) && player.resource.citizens.lt(getResourceCapped('citizens'))},
        unlocked(){return player.action.explore.citizensFound==true},
    },
    collect: {
        name(){return '土堆'},
        capped(){return n(5).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain: {
            dirt: {
                probability(){return n(100)},
                base(){return n(1)},
                float(){return n(1.5)},
                unlocked(){return true},
            },
            stone: {
                probability(){return n(10)},
                base(){return n(0.25)},
                float(){return n(0.5)},
                unlocked(){return true},
            },
            copper: {
                probability(){return n(2.5)},
                base(){return n(0.05)},
                float(){return n(0.1)},
                unlocked(){return true},
            },

            stardust: {
                probability(){return n(0.01)},
                base(){return n(1)},
                float(){return n(0)},
                unlocked(){return true},
            },
        },
        luck(){
            let base = n(1)
            return base
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            getStage(2)

            for(i in main['craft']['collect']['gain']){
                let exp = n(Math.random() * 100)
                let unlocked = true
                if(main['craft']['collect']['gain'][i]['unlocked']!==undefined){
                    unlocked = main['craft']['collect']['gain'][i]['unlocked']
                }
                if(unlocked){
                    if(n(main['craft']['collect']['gain'][i]['probability']()).gte(exp)){
                        let random = n(Math.random()).mul(main['craft']['collect']['gain'][i]['float']())
                        gainResource(i, n(main['craft']['collect']['gain'][i]['base']()).add(random))
                        if(main['craft']['collect']['gain'][i]['tooltip']!==undefined){
                            addLog(main['craft']['collect']['gain'][i]['tooltip']())
                        }
                    }
                }
            }
            
            player.action.explore.collect = player.action.explore.collect.sub(1)
        },
        tooltip(){
            let base = ''
            let gain = ''
            let mul = ''
            let luck = ''
            let hr = ''
            if(n(main['craft']['collect']['luck']()).gt(1)){
                luck = '<div>幸运倍率:<br><li-hid>×'+format(main['craft']['collect']['luck']())+'</div>'
                hr = '<hr>'
            }
            if(n(main['craft']['collect']['mul']()).gt(1)){
                mul = '<div>产出倍率:<br><li-hid>×'+format(main['craft']['collect']['mul']())+'</div>'
                hr = '<hr>'
            }
            if(n(main.craft.harvest.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.craft.harvest.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.collect,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return "泥土从你的手中漏出"+base+gain+hr+'<small>'+luck+mul+"</small></left>"+times
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.collect.gte(1)},
        data:{
            actionDirt(){return []},
        },
        unlocked(){return player.action.explore.collectFound && !player.workshop.mine},
    },
    stone: {
        name(){return '石料'},
        capped(){return n(10).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        speed(){
            let base = n(1)
            if(player.workshop.binding){
                base = base.add(0.25)
            }
            return base
        },
        lucky(){
            let base = n(1)
            if(player.workshop.binding){
                base = base.add(0.5)
            }
            return base
        },
        gain: {
            dirt: {
                probability(){return n(100)},
                base(){return n(0.5)},
                float(){return n(0.5)},
                unlocked(){return true},
            },
            stone: {
                probability(){return n(100)},
                base(){return n(3)},
                float(){return n(7)},
                unlocked(){return true},
            },
            copper: {
                probability(){return n(7.5)},
                base(){return n(2)},
                float(){return n(2)},
                unlocked(){return true},
            },
        },
        tooltip(){
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
            let times = '<hr>已标记: '+formatWhole(player.action.explore.stone,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            let unl = '<hr><grey>你需要工具才能去开采这些矿石</grey>'
            if(player.workshop.pickaxe){
                unl = ''
            }
            return '蕴含矿石?也许'+unl+hr+speed+lucky+times
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            for(i in main['craft']['stone']['gain']){
                let exp = n(Math.random() * 100)
                let unlocked = true
                if(main['craft']['stone']['gain'][i]['unlocked']!==undefined){
                    unlocked = main['craft']['stone']['gain'][i]['unlocked']
                }
                if(unlocked){
                    if(n(main['craft']['stone']['gain'][i]['probability']()).gte(exp)){
                        let random = n(Math.random()).mul(main['craft']['stone']['gain'][i]['float']())
                        gainResource(i, n(main['craft']['stone']['gain'][i]['base']()).add(random))
                    }
                }
            }

            player.action.explore.stone = player.action.explore.stone.sub(1)
        },
        cooldown(){return n(30)},
        canClick(){return player.action.explore.stone.gte(1) && player.workshop.pickaxe},
        unlocked(){return player.action.explore.stoneFound && !player.workshop.mine},
    },
    drop: {
        name(){return '树枝'},
        capped(){return n(4).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain:{
            wood:{
                probability(){return n(100)},
                base(){return n(1)},
                float(){return n(1)},
                unlocked(){return true},
            },
        },
        tooltip(){
            let mul = ''
            let hr = ''
            if(n(main.craft.drop.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.craft.drop.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.drop,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return '看起来目前这是你唯一的木头来源'+hr+mul+times
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            getStage(2)

            for(i in main['craft']['drop']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['drop']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['drop']['gain'][i]['float']())
                    gainResource(i, n(main['craft']['drop']['gain'][i]['base']()).add(random))
                }
            }

            player.action.explore.drop = player.action.explore.drop.sub(1)
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.drop.gte(1)},
        unlocked(){return player.action.explore.dropFound==true},
    },
    harvest: {
        name(){return '收割'},
        capped(){return n(5).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain:{
            food:{
                probability(){return n(100)},
                base(){return n(1.5)},
                float(){return n(1.5)},
                unlocked(){return true},
            },
        },
        tooltip(){
            let mul = ''
            let hr = ''
            if(n(main.craft.harvest.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.craft.harvest.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.harvest,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return '收集食物'+hr+mul+times
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            getStage(2)

            for(i in main['craft']['harvest']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['harvest']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['harvest']['gain'][i]['float']())
                    gainResource(i, n(main['craft']['harvest']['gain'][i]['base']()).add(random))
                }
            }

            player.action.explore.harvest = player.action.explore.harvest.sub(1)
        },
        cooldown(){return n(5)},
        auto(){return n(0)},
        canClick(){return player.action.explore.harvest.gte(1)},
        unlocked(){return player.action.explore.harvestFound==true},
    },
    beast: {
        name(){return '野兽'},
        capped(){return n(20).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain:{
            food:{
                probability(){return n(100)},
                base(){return n(25)},
                float(){return n(25)},
                unlocked(){return true},
            },
            leather:{
                probability(){return n(50)},
                base(){return n(2.5)},
                float(){return n(2.5)},
                unlocked(){return true},
            },
        },
        power(){
            let base = n(5)
            return base
        },
        tooltip(){
            let mul = ''
            let unl = '<hr><grey>你暂时拿它们无能为力</grey>'
            if(n(gameGetPower()).gte(1)){
                mul = '<hr><left>力量倍率: ~'+formatWhole(gameGetPower())+'<grey> | '+format(gameGetPower())+'><'+format(1)+'</grey></left>'
                unl = ''
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.beast,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return '你从未见过这种动物<br>它们真的很强壮<br>不过你可以剥夺它们的血和肉'+unl+mul+times
        },
        onClick(){
            let mul = formatWhole(n(gameGetPower()).min(player.action.explore.beast))
            mul = n(Math.random()).mul(mul).ceil()

            let food = n(0)
            let leather = n(0)

            for(let times = 0; times<Number(mul); times++){
                for(let i in main['craft']['beast']['gain']){
                    let exp = n(Math.random() * 100)
                    if(n(main['craft']['beast']['gain'][i]['probability']()).gte(exp)){
                        let random = n(Math.random()).mul(main['craft']['beast']['gain'][i]['float']())
                        let gain = n(main['craft']['beast']['gain'][i]['base']()).add(random)
                        gainResource(i, n(gain))
                        if(i=='food'){
                            food = food.add(gain)
                        }
                        if(i=='leather'){
                            leather = leather.add(gain)
                        }
                    }
                }
            }    

            player.action.explore.beast = player.action.explore.beast.sub(mul)

            let get = ''
            if(!n(food).eq(0)){
                get += '<br><li-hid>'+format(food)+colorText('food')[1]
            }
            if(!n(leather).eq(0)){
                get += '<br><li-hid>'+format(leather)+colorText('leather')[1]
            }
            if(player.citizens.hunt.lte(0)){
                addLog('你捕猎到'+formatWhole(mul)+'只野兽,为你带来了'+get)
            }
        },
        cooldown(){return n(45)},
        canClick(){return player.action.explore.beast.gte(1) && n(gameGetPower()).gte(1)},
        unlocked(){return player.action.explore.beastFound},
    },
    tree: {
        name(){return '树'},
        capped(){return n(5).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain:{
            wood:{
                probability(){return n(100)},
                base(){return n(6)},
                float(){return n(2)},
                unlocked(){return true},
            },
        },
        tooltip(){
            let unl = '<hr><grey>没有斧子是砍不了树的</grey>'
            if(player.workshop.axe){
                unl = ''
            }
            let times = '已标记: '+formatWhole(player.action.explore.tree,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return unl+times
        },
        onClick(){
            for(i in main['craft']['tree']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['tree']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['tree']['gain'][i]['float']())
                    gainResource(i, n(main['craft']['tree']['gain'][i]['base']()).add(random))
                }
            }

            player.action.explore.tree = player.action.explore.tree.sub(1)
        },
        cooldown(){return n(15)},
        canClick(){return player.action.explore.tree.gte(1) && player.workshop.axe},
        unlocked(){return player.action.explore.treeFound==true},
    },
    meteorite: {
        name(){return '陨铁'},
        capped(){return n(5).mul(n(getCitizensEffect('explorer', 'memory')).add(1)).floor()},
        gain:{
            iron:{
                probability(){return n(100)},
                base(){return n(2)},
                float(){return n(1)},
                unlocked(){return true},
            },
        },
        tooltip(){
            let times = '已标记: '+formatWhole(player.action.explore.meteorite,0)+' <grey>/ '+formatWhole(this.capped(),0)+' (遗忘)</grey>'
            return times
        },
        onClick(){
            for(i in main['craft']['meteorite']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['meteorite']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['meteorite']['gain'][i]['float']())
                    gainResource(i, n(main['craft']['meteorite']['gain'][i]['base']()).add(random))
                }
            }

            player.action.explore.meteorite = player.action.explore.meteorite.sub(1)
        },
        cooldown(){return n(40)},
        canClick(){return player.action.explore.meteorite.gte(1)},
        unlocked(){return player.action.explore.meteoriteFound},
    },
}