function NumberFix(){
	for(i in resource['main']){
		if(resource['main'][i]['capped']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceCappedBase(i))
			getResourceID(i)
		}
	}
}

function nc(Decimal){
    return n(Decimal).mul(getEfficient('happiness'))
}

function gainResource(res,gain){
    if(gain.gte(0)){
        if(!n(getResourceCapped(res)).eq(-1)){
            gain = gain.min(n(getResourceCapped(res)).sub(player['resource'][res]))
        }
        player['resource'][res] = player['resource'][res].add(gain)
        player['resource'][res+'Total'] = player['resource'][res+'Total'].add(gain)
        player['resource'][res+'Best'] = player['resource'][res+'Best'].max(player['resource'][res])
    }else{
        player['resource'][res] = player['resource'][res].add(gain).max(0)
    }
}

function getResourceUnlocked(res){
    return player['resource'][res].gt(0) || player['resource'][res+'Unlocked']
}


function getCitizensEffect(citizens,effect){
    return player['citizens'][citizens].mul(civics['citizens'][citizens]['effect']['other'][effect]['effect']())
}

function nameCorrection(type,old,name){
    if(type=='building'){
        getByID(old+'BuildingButtonID', name+'('+formatWhole(player['building'][old])+')')
    }
    if(type=='citiznes'){
        getByID(old+'CitizensNameID', name)
    }
}

function effectText(name,begin,res,end,mul,Class=null,display=true){
    let unique = ``
    let beginClass = ``
    let endClass = ``
    if(display){
        unique = `<grey><li-hid>(`+begin+format(res)+end+`)</grey>`
    }else{
        mul = n(1)
    }
    if(Class!==null){
        beginClass = `<`+Class+`>`
        endClass = `</`+Class+`>`
    }
    return `<left><span>
                <div style="width: 80px; display: table-cell">`+name+`</div>
                <div style="width: 124px; display: table-cell">`+beginClass+begin+format(n(res).mul(mul))+end+endClass+`</div>
                `+unique+`
            </span></left>`
}

function costText(name,res,cost,type){
    let time = ''
    if(player['resource'][res].lt(cost)){
        if(n(getResourceGain(res)).gt(0)){
            if(n(getResourceCapped(res)).gte(cost) || n(getResourceCapped(res)).eq(-1)){
                time = '( '+formatTime(n(cost).sub(player['resource'][res]).div(getResourceGain(res)))+' )'
            }else{
                time = '<grey>( '+format(n(getResourceCapped(res)).sub(cost))+' )</grey>'
            }
        }
    }
    if(resource['main'][res]['unlocked']!==undefined){
        if(!resource['main'][res]['unlocked']()){
            name = '<gery>???</gery>'
            time = ''
        }
    }
    if(type=="workshop" && WORKSHOPBOUGHT){
        return `<span>
                    <div style="width: 80px; display: table-cell">`+name+`</div>
                    <div style="width: 55px; display: table-cell; color: rgb(31, 70, 71)">`+format(cost)+`</div>
                </span><br>`
    }
    return `<span>
				<span>
					<div style="width: 80px; display: table-cell">`+name+`</div>
					<div style="width: 55px; display: table-cell; color: `+(player['resource'][res].gte(cost) ? `rgb(31, 70, 71)` : `red` )+`">`+format(player['resource'][res])+`</div>
				</span>
				<span style="width: 30px; display: table-cell; color: rgb(31, 70, 71);"> / 
				</span>
				<span style="width: 55px; display: table-cell; color: rgb(31, 70, 71);">
					<div style="color: `+((n(getResourceCapped(res)).gte(cost) || resource['main'][res]['capped']==undefined) ? `` : `red` )+`">`+format(cost)+`</div>
				</span>
			</span>`+time+`<br>`
}

function colorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in resource['main']){
		if(id==resourceColor){
			if(resource['main'][resourceColor]['color']!==undefined){
				color = resource['main'][resourceColor]['color']()
			}
			if(resource['main'][resourceColor]['name']!==undefined){
				Text = resource['main'][resourceColor]['name']()
			}
			if(resource['main'][resourceColor]['Class']!==undefined){
				Class = resource['main'][resourceColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888',"<a style='color: #888'>未知</a>",'rgba(136, 136, 136, 0.5)']
	}
	let color2 = tinycolor(color).setAlpha(.5);
	return [color,"<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>",color2]
}