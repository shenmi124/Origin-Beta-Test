let MainCraft = {
    citizens:{
        name(){return '原住民'},
        max(){return n(2).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
        tooltip(){
            let times = '<hr>已标记: '+formatWhole(player.action.explore.citizens,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
            return '他们为你工作,而你给与他们住所与食物<br>公平的交易<hr><grey>你需要提供食物与住所,否则他们不会跟随你</grey>'+times
        },
        onClick(){
            player.resource.citizens = player.resource.citizens.add(1)
            player.action.explore.citizens = player.action.explore.citizens.sub(1)
            CitizensFix()
            
            getStage(4)
        },
        cooldown(){return n(20)},
        canClick(){return player.action.explore.citizens.gte(1) && player.resource.food.gt(0) && player.resource.citizens.lt(getResourceMax('citizens'))},
        unlocked(){return player.action.explore.citizensFined==true},
    },
    collect:{
        name(){return '收集'},
        max(){return n(5).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
        gain:{
            dirt:{
                probability(){return n(100)},
                base(){return n(1)},
                float(){return n(1.5)},
                unlocked(){return true},
            },
            stone:{
                probability(){return n(10)},
                base(){return n(0.25)},
                float(){return n(0.5)},
                unlocked(){return true},
            },
            
            star:{
                probability(){return n(0.02)},
                base(){return n(0.2)},
                float(){return n(0.3)},
                unlocked(){return true},
                tooltip(){return '你在泥土中发现了一些<span class="star">陨石碎片</span>'}
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
                if(n(main['craft']['collect']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['collect']['gain'][i]['float']())
                    player['resource'][i] = player['resource'][i].add(main['craft']['collect']['gain'][i]['base']()).add(random)
                    if(main['craft']['collect']['gain'][i]['tooltip']!==undefined){
                        addLog(main['craft']['collect']['gain'][i]['tooltip']())
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
            let times = '<hr>已标记: '+formatWhole(player.action.explore.collect,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
            return "泥土从你的手中漏出"+base+gain+hr+'<small>'+luck+mul+"</small></left>"+times
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.collect.gte(1)},
        data:{
            actionDirt(){return []},
        },
        unlocked(){return player.action.explore.collectFined==true},
    },
    stone:{
        name(){return '露天石料'},
        max(){return n(10).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
        gain:{
        },
        tooltip(){
            let mul = ''
            let hr = ''
            if(n(main.craft.stone.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.craft.stone.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.stone,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
            return '蕴含矿石?也许<hr><grey>你需要工具才能去开采这些矿石</grey>'+hr+mul+times
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            getStage(2)

            for(i in main['craft']['stone']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['stone']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['stone']['gain'][i]['float']())
                    player['resource'][i] = player['resource'][i].add(main['craft']['stone']['gain'][i]['base']()).add(random)
                }
            }

            player.action.explore.stone = player.action.explore.stone.sub(1)
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.stone.gte(1) && false},
        unlocked(){return player.action.explore.stoneFined==true},
    },
    drop:{
        name(){return '树枝'},
        max(){return n(4).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
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
            let times = '<hr>已标记: '+formatWhole(player.action.explore.drop,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
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
                    player['resource'][i] = player['resource'][i].add(main['craft']['drop']['gain'][i]['base']()).add(random)
                }
            }

            player.action.explore.drop = player.action.explore.drop.sub(1)
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.drop.gte(1)},
        unlocked(){return player.action.explore.dropFined==true},
    },
    harvest:{
        name(){return '收割'},
        max(){return n(5).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
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
            let times = '<hr>已标记: '+formatWhole(player.action.explore.harvest,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
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
                    player['resource'][i] = player['resource'][i].add(main['craft']['harvest']['gain'][i]['base']()).add(random)
                }
            }

            player.action.explore.harvest = player.action.explore.harvest.sub(1)
        },
        cooldown(){return n(5)},
        auto(){return n(0)},
        canClick(){return player.action.explore.harvest.gte(1)},
        unlocked(){return player.action.explore.harvestFined==true},
    },
    beast:{
        name(){return '野兽'},
        max(){return n(20).mul(civics['citizens']['explorer']['effect']['other']['memory']()).floor()},
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
            if(n(main.craft.beast.mul()).gt(1)){
                mul = '<left><small><div>产出倍率:<br><li-hid>×'+format(main.craft.beast.mul())+'</div></small></left>'
                hr = '<hr>'
            }
            let times = '<hr>已标记: '+formatWhole(player.action.explore.beast,0)+' <a style="color: #888">/ '+formatWhole(this.max(),0)+' (遗忘)</a>'
            return '兽群,收集它们身上的皮毛和血肉<br>但它们真的很强壮<hr><grey>你暂时拿它们无能为力</grey>'+hr+mul+times
        },
        mul(){
            let base = n(1)
            return base
        },
        onClick(){
            getStage(2)

            for(i in main['craft']['beast']['gain']){
                let exp = n(Math.random() * 100)
                if(n(main['craft']['beast']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['beast']['gain'][i]['float']())
                    player['resource'][i] = player['resource'][i].add(main['craft']['beast']['gain'][i]['base']()).add(random)
                }
            }

            player.action.explore.beast = player.action.explore.beast.sub(1)
        },
        cooldown(){return n(5)},
        canClick(){return player.action.explore.beast.gte(1) && false},
        unlocked(){return player.action.explore.beastFined==true},
    },
}