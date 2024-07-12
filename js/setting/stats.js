function statsDiff(){
    let game = ''
    game += `<div style="display: inline-grid; width: 100px">统计</div>
            <br>
            <div style="display: inline-grid; width: 100px">真实时间</div>
            <div style="display: inline-grid; width: 500px">`+formatTime(player.game.time)+`</div>
            <br>
            <div style="display: inline-grid; width: 100px">游戏时间</div>
            <div style="display: inline-grid; width: 500px">`+getGametime()+`</div>
            <br>
            <div style="display: inline-grid; width: 100px">点击次数</div>
            <div style="display: inline-grid; width: 500px">`+formatWhole(player.data.click)+`</div>
            <br>
            `

    let res = ''
    let resU = false
    res += `<div style="display: inline-grid; width: 100px">资源</div>
                <div style="display: inline-grid; width: 100px">拥有</div>
                <div style="display: inline-grid; width: 100px">最大</div>
                <div style="display: inline-grid; width: 100px">总计</div>
                <br>`
    for(let i in resource['main']){
        if(player['resource'][i+'Unlocked']){
            resU = true
            res += `<div style="display: inline-grid; width: 100px">`+colorText(i)[1]+`</div>
                        <div style="display: inline-grid; width: 100px">`+format(player['resource'][i])+`</div>
                        <div style="display: inline-grid; width: 100px">`+format(player['resource'][i+'Best'])+`</div>
                        <div style="display: inline-grid; width: 100px">`+format(player['resource'][i+'Total'])+`</div>
                        <br>`
        }
    }

    let action = ''
    let actionU = false
    action += `<div style="display: inline-grid; width: 100px">行动</div>
                <div style="display: inline-grid; width: 100px">完成次数</div>
                <div style="display: inline-grid; width: 100px">基础耗时</div>
                <div style="display: inline-grid; width: 100px">自动耗时</div>
                <div style="display: inline-grid; width: 100px">手动耗时</div>
                <br>`
    for(let i in main['action']){
        if(player['action'][i+'Total'].gte(1)){
            actionU = true
            let time = n(0)
			let activeSpeed = n(0)
			let autoSpeed = n(getActionAuto(i))
			let playerBase = n(1)
			if(main['action'][i]['player']!==undefined){
				playerBase = main['action'][i]['player']()
			}
			activeSpeed = activeSpeed.add(n(playerBase).mul(getEfficient('action')))
			let actionSpeed = activeSpeed.add(autoSpeed)
            let base = ''
            if(main['action'][i]['cooldown']!==undefined){
                if(!n(main['action'][i]['cooldown']()).eq(0)){
                    base = formatTime(main['action'][i]['cooldown']())
                    time = main['action'][i]['cooldown']()
                }
            }
            let auto = ''
            let act = ''
            if(!n(time).eq(0)){
                if(!n(autoSpeed).eq(0)){
                    auto = formatTime(n(time).div(autoSpeed))
                }
                if(!n(actionSpeed).eq(0) && !n(playerBase).eq(0)){
                    act = formatTime(n(time).div(actionSpeed))
                }
            }
            action += `<div style="display: inline-grid; width: 100px">`+main['action'][i]['name']()+`</div>
                        <div style="display: inline-grid; width: 100px">`+formatWhole(player['action'][i+'Total'])+`</div>
                        <div style="display: inline-grid; width: 100px">`+base+`</div>
                        <div style="display: inline-grid; width: 100px">`+auto+`</div>
                        <div style="display: inline-grid; width: 100px">`+act+`</div>
                        <br>`
        }
    }

    let craft = ''
    let craftU = false
    craft += `<div style="display: inline-grid; width: 100px">采集</div>
                <div style="display: inline-grid; width: 100px">完成次数</div>
                <div style="display: inline-grid; width: 100px">基础耗时</div>
                <div style="display: inline-grid; width: 100px">自动耗时</div>
                <div style="display: inline-grid; width: 100px">手动耗时</div>
                <br>`
    for(let i in main['craft']){
        if(player['craft'][i+'Total'].gte(1)){
            craftU = true
            let time = n(0)
			let activeSpeed = n(0)
			let autoSpeed = n(getCraftAuto(i))
			let playerBase = n(1)
			if(main['craft'][i]['player']!==undefined){
				playerBase = main['craft'][i]['player']()
			}
			activeSpeed = activeSpeed.add(n(playerBase).mul(getEfficient('action')))
			let actionSpeed = activeSpeed.add(autoSpeed)
            let base = ''
            if(main['craft'][i]['cooldown']!==undefined){
                if(!n(main['craft'][i]['cooldown']()).eq(0)){
                    base = formatTime(main['craft'][i]['cooldown']())
                    time = main['craft'][i]['cooldown']()
                }
            }
            let auto = ''
            let act = ''
            if(!n(time).eq(0)){
                if(!n(autoSpeed).eq(0)){
                    auto = formatTime(n(time).div(autoSpeed))
                }
                if(!n(actionSpeed).eq(0) && !n(playerBase).eq(0)){
                    act = formatTime(n(time).div(actionSpeed))
                }
            }
            craft += `<div style="display: inline-grid; width: 100px">`+main['craft'][i]['name']()+`</div>
                        <div style="display: inline-grid; width: 100px">`+formatWhole(player['craft'][i+'Total'])+`</div>
                        <div style="display: inline-grid; width: 100px">`+base+`</div>
                        <div style="display: inline-grid; width: 100px">`+auto+`</div>
                        <div style="display: inline-grid; width: 100px">`+act+`</div>
                        <br>`
        }
    }

    let building = ''
    let buildingU = false
    building += `<div style="display: inline-grid; width: 100px">建筑</div>
                <div style="display: inline-grid; width: 100px">拥有</div>
                <br>`
    for(let i in main['building']){
        if(player['building'][i].gte(1)){
            buildingU = true
            let number = formatWhole(player['building'][i])
            if(main['building'][i]['unique']!==undefined){
                if(main['building'][i]['unique']()){
                    number = ''
                }
            }
            building += `<div style="display: inline-grid; width: 100px">`+main['building'][i]['name']()+`</div>
                        <div style="display: inline-grid; width: 100px">`+number+`</div>
                        <br>`
        }
    }

    let workshop = ''
    let workshopU = false
    workshop += `<div style="display: inline-grid; width: 100px">工坊</div>
                <div style="display: inline-grid; width: 100px">拥有</div>
                <br>`
    let br = 0
    for(let i in civics['workshop']){
        if(player['workshop'][i]){
            workshopU = true
            br++
            let hbr = ''
            if(br%5==0){
                hbr = '<br>'
            }
            let color = ''
            if(civics['workshop'][i]['keep']!==undefined){
                if(civics['workshop'][i]['keep']()){
                    color = 'rgb(186, 0, 192)'
                }
            }
            workshop += `<div style="display: inline-grid; width: 100px; color: `+color+`">`+civics['workshop'][i]['name']()+`</div>
                        <div style="display: inline-grid; width: 0px"></div>`+hbr
        }
    }

    if(!resU){res = ''}
    if(!actionU){action = ''}
    if(!buildingU){building = ''}
    if(!craftU){craft = ''}
    if(!workshopU){workshop = ''}
	getByID('subtab_setting_stats', game+'<br>'+res+'<br>'+action+'<br>'+building+'<br>'+craft+'<br>'+workshop)
}