function i18nLoad(){
	if(player.setting.language==undefined){
		var lag = navigator.language.toLowerCase();
		if(lag.indexOf('zh')!=-1){
			player.setting.language = 'zh'
		}else if(lag.indexOf('en')!=-1){
			player.setting.language = 'en'
		}else{
			player.setting.language = 'en'
		}
	}
}

function countingMethod(){
	let coun = ['scientific','standard','engineering','letter']
	for(let i in coun){
		if(coun[i]==player.setting.countingMethod){
			if(Number(i)===3){i = -1}
			player.setting.countingMethod = coun[Number(i)+1]
			getByID("countingMethodID", player.setting.countingMethod)
			break
		}
	}
}

function booleanSetting(id){
	player['setting'][id] = !player['setting'][id]
	getByID(id+'ID',player['setting'][id] ? '开启' : '关闭')

	if(id=='autoSave'){
		player.setting.saveTick = false
	}

	if(id=='mouseSetting'){	
		if(player['setting']['mouseSetting']){
			document.oncontextmenu = function(event){
				event.preventDefault()
			}
		
			if(document.all){
				document.onselectstart = function(){
					return false
				}
			}else{
				document.onmousedown = function(){
					return false
				}
				document.onmouseup = function(){
					return true
				}
			}
		}else{
			document.oncontextmenu = function(event){
			}
		
			if(document.all){
				document.onselectstart = function(){
					return true
				}
			}else{
				document.onmousedown = function(){
					return true
				}
				document.onmouseup = function(){
					return false
				}
			}
		}
	}
}