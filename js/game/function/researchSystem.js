function researchRequire(id){
    if(id==undefined){return n(0)}
    let res = n(0)
    let research = Number(player['research'][id])
    for(i in mainResearch['main'][id]['cost'][research]){
        res = res.add(n(main['resource'][i]['research']()).mul(mainResearch['main'][id]['cost'][research][i]()))
    }
    return res
}

function researchClick(id){
    let canresearch = true
    let logs = '你还差:'
    let research = Number(player['research'][id])
    let lastC = player.research.conducted
    for(i in mainResearch['main'][id]['cost'][research]){
        let res = mainResearch['main'][id]['cost'][research][i]()
        if(n(player['resource'][i]).lt(res)){
            canresearch = false
            logs += '<br><li-hid>'+format(n(res).sub(player['resource'][i]))+colorText(i)[1]+'</span>'
        }
    }
    if(player.research[id].gte(mainResearch['main'][id]['max']())){

    }else if(player.canMainResearch[id]==true && player.research.conducted==id){
        player.research.conducted = undefined
        player.resource.researchPoints = player.resource.researchPoints.min(main['resource']['researchPoints']['max']())
    }else if(player.canMainResearch[id]==true){
        player.research.conducted = id
    }else if(canresearch){
        player.canMainResearch[id] = true
        player.research.conducted = id
        for(i in mainResearch['main'][id]['cost'][research]){
            let res = mainResearch['main'][id]['cost'][research][i]()
            player['resource'][i] = player['resource'][i].sub(res)
        }
    }else{
        addLog(logs,'#888')
    }

    getByID(id+'MainResearchDivID',`
        <tooltip `+tooltipLoad(id,'TooltipLoadResearch')+` style="text-align: -webkit-center" class="MainResearch">
            <button id="`+id+`MainResearchButtonID" class="MainResearch Button" onclick="researchClick('`+id+`')"></button>
        </tooltip>
        <div style="text-align: -webkit-center; font-size: 10px">
            `+mainResearch['main'][id]['name']()+`
        </div>
    `)

    if(player.research[id].gte(1)){
        document.getElementById(id+"MainResearchButtonID").style.borderColor = 'rgb(246, 170, 255)'
    }
    if(player.research[id].gte(mainResearch['main'][id]['max']())){
        document.getElementById(id+"MainResearchButtonID").style.borderColor = 'rgb(174, 35, 252)'
    }
    if(player.canMainResearch[id]==true){
        document.getElementById(id+"MainResearchButtonID").style.borderColor = 'rgb(73, 219, 189)'
    }
    if(player.research.conducted==id){
        document.getElementById(player.research.conducted+"MainResearchButtonID").style.borderColor = 'rgb(74, 161, 254)'
        if(lastC!==undefined){
            document.getElementById(lastC+"MainResearchButtonID").style.borderColor = 'rgb(73, 219, 189)'
        }
    }
}