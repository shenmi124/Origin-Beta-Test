function colorText(id){
	let color = '#c3c3c3'
	let Text = '未命名'
	let Class = ''
	for(let resourceColor in main['resource']){
		if(id==resourceColor){
			if(main['resource'][resourceColor]['color']!=undefined){
				color = main['resource'][resourceColor]['color']()
			}
			if(main['resource'][resourceColor]['name']!=undefined){
				Text = main['resource'][resourceColor]['name']()
			}
			if(main['resource'][resourceColor]['Class']!=undefined){
				Class = main['resource'][resourceColor]['Class']()
			}
		}
	}
	if(id=='none'){
		return ['#888',"<a style='color: #888'>未知</a>",'rgba(136, 136, 136, 0.5)']
	}
	let color2 = tinycolor(color).setAlpha(.5);
	return [color,"<a style='color:"+color+"' class='"+Class+"'>"+Text+"</a>",color2]
}

function unlockedLoad(id,unlocked,type=''){
	if(unlocked){
		document.getElementById(id).style.display = type
	}else{
		document.getElementById(id).style.display = 'none'
	}
}

function showTab(id){
	for(let i in mainButton){
		Close('tab_'+i)
		document.getElementById(i+"MainTabID").style.color = '#000'
		document.getElementById(i+"MainTabID").style.opacity = ''
	}
	Open('tab_'+id)
	document.getElementById(id+"MainTabID").style.color = 'rgb(0, 123, 255)'
	document.getElementById(id+"MainTabID").style.opacity = '0.8'
}