let MainCraft = {
    collect:{
        name(){return '收集'},
        max(){return n(5)},
        gain:{
            dirt:{
                probability(){return n(100)},
                base(){return n(0.75)},
                float(){return n(0.75)},
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
                if(n(main['craft']['collect']['gain'][i]['probability']()).gte(exp)){
                    let random = n(Math.random()).mul(main['craft']['collect']['gain'][i]['float']())
                    player['resource'][i] = player['resource'][i].add(main['craft']['collect']['gain'][i]['base']()).add(random)
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
        canCooldown(){return player.action.explore.collect.gte(1)},
        data:{
            actionDirt(){return []},
        },
        unlocked(){return player.action.explore.collectFined==true},
    },
    harvest:{
        name(){return '收割'},
        max(){return n(5)},
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
            return '起码还有食物可循'+hr+mul+times
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
        canCooldown(){return player.action.explore.harvest.gte(1)},
        unlocked(){return player.action.explore.harvestFined==true},
    },
}