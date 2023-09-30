var MainAction = {
    collectionDirt:{
        name(){return '采集泥土'},
        gain(){
            let a = []
            let res = [
                'dirt','stone','tin','gem'
            ]
            let pro = [
                n(70),n(8),n(0.8),n(0.008)
            ]
            let bas = [
                n(0.75),n(0.05),n(0.005),n(0)
            ]
            let ran = [
                n(0.75),n(0.15),n(0.005),n(0.001)
            ]
            let unl = [
                true,true,true,true
            ]
            for(let i in res){
                a.push([res[i],n(pro[i]).mul(this.luck()),bas[i],ran[i],unl[i]])
            }
            return a
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
            for(let i in main['action']['collectionDirt']['gain']()){
                let res = main['action']['collectionDirt']['gain']()[i]
                let p = n(Math.random() * 99)
                if(res[1].gte(p) && res[4]){
                    player['resource'][res[0]] = player['resource'][res[0]].add(n(res[2]).add(n(Math.random()).mul(res[3])).mul(n(main['action']['collectionDirt']['mul']()))).min(main['resource'][res[0]]['max']())
                    if(!player.game.actionDirt.includes(res[0])){
                        player.game.actionDirt.push(res[0])
                    }
                }
            }
        },
        tooltip(){
            let base = ''
            let gain = ''
            let mul = ''
            let luck = ''
            let hr = ''
            for(let i in main['action']['collectionDirt']['gain']()){
                let res = main['action']['collectionDirt']['gain']()[i]
                if(res[4] && player.game.actionDirt.includes(res[0])){
                    base = '<hr><left>获取:'
                    gain += '<br><li-hid>'+colorText(res[0])[1]
                    //formatScientific(res[1],1)+'%'
                    //format(n((res[2]).add(n(0).mul(res[3]))))+'~'+format(n((res[2]).add(n(1).mul(res[3]))))
                }
            }
            if(n(main['action']['collectionDirt']['luck']()).gt(1)){
                luck = '<div>幸运倍率:<br><li-hid>×'+format(main['action']['collectionDirt']['luck']())+'</div>'
                hr = '<hr>'
            }
            if(n(main['action']['collectionDirt']['mul']()).gt(1)){
                mul = '<div>产出倍率:<br><li-hid>×'+format(main['action']['collectionDirt']['mul']())+'</div>'
                hr = '<hr>'
            }
            return "泥土从你的手中漏出"+base+gain+hr+luck+mul+"</left>"
        },
        unlocked(){return true},
    },
    mow:{
        name(){return '割草'},
        tooltip(){
            let mul = ''
            if(n(main.action.mow.mul()).gt(1)){
                mul = '<left><hr><div>产出倍率:<br><li-hid>×'+format(main.action.mow.mul())+'</div></left>'
            }
            return '割草'+mul
        },
        mul(){
            let base = n(1)
            let m33 = player.research.m33.mul(0.5)
            let m = n(base).add(m33)
            return m
        },
        onClick(){player.resource.grass = player.resource.grass.add(n(Math.random() * 1.5).mul(main.action.mow.mul()))}
    },
    grind:{
        name(){return '研磨'},
        tooltip(){
            let mul = ''
            if(n(main.action.grind.mul()).gt(1)){
                mul = '<left><hr><div>产出倍率:<br><li-hid>×'+format(main.action.grind.mul())+'</div></left>'
            }
            return '然后制取纤维'+mul
        },
        mul(){return player.research.m12.mul(0.5).add(1)},
        onClick(){
            let num = n(Math.random() * 3).min(player.resource.grass)
            player.resource.grass = player.resource.grass.sub(num)
            player.resource.fiber = player.resource.fiber.add(n(Math.random() * 0.25).mul(num).mul(main.action.grind.mul()))
        },
        unlocked(){return getResourceUnlocked('grass')},
    }
}