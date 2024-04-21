var settings = {
	save:{
		title(){return '储存'},
		name(){return '保存'},
		type(){return 'click'},
		onClick(){
			save()
			hardResetClick = 6
			getByID('hardResetClick', '')
		},
	},
	autoSave:{
		name(){return '自动保存'},
		display(){return player.setting.autoSave ? ' - <a id="autoSaveTime"></a>s' : ''},
		type(){return 'boolean'},
		boolean(){return true},
		effect(){
			if(player.setting.autoSave){
				autoSaveTime -= (1 * DIFF)
				if(autoSaveTime<=0){
					autoSaveTime = 60
					save()
					hardResetClick = 6
					getByID('hardResetClick', '')
				}
				getByID('autoSaveTime',formatScientific(autoSaveTime, 1))
			}else{
				autoSaveTime = 60
				if(autoSave){
					autoSave = false
					save()
				}
			}
		},
	},
	export:{
		name(){return '导出'},
		type(){return 'click'},
		onClick(){
			exportSave()
		},
	},
	import:{
		name(){return '导入'},
		type(){return 'click'},
		onClick(){
			importSave()
		},
	},
	hardReset:{
		name(){return '<red>硬重置<a id="hardResetClick"></a></red>'},
		type(){return 'click'},
		onClick(){
			hardResetClick -= 1
			loadSetting()
			getByID('hardResetClick', ' - !重复点击'+hardResetClick+'次!')
			if(hardResetClick==0){
				hardReset()
			}
		},
	},
	language:{
		title(){return '主题'},
		name(){return '语言'},
		type(){return 'choose'},
		choose:{
			default:{
				name(){return '浏览器语言'},
			},
			en:{
				name(){return '英文'}
			},
			zh:{
				name(){return '中文'}
			},
		},
	},
	notation:{
		name(){return '计数法'},
		type(){return 'choose'},
		choose:{
			default:{
				name(){return '标准'},
			},
			scientific:{
				name(){return '科学'}
			},
			engineering:{
				name(){return '工程'}
			},
			letter:{
				name(){return '字母'}
			},
		},
	},
	mouse:{
		title(){return '调试'},
		name(){return '鼠标优化'},
		type(){return 'boolean'},
		boolean(){return true},
		effect(){
			if(player.setting.mouse){
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
		},
	},
}

let autoSaveTime = 60
let autoSave = true
let hardResetClick = 6

function loadSetting(){
	let set = ''

	let f = false
	for(let i in settings){
		let display = ''

		if(settings[i]['title']!==undefined){
			set += (f ? '<br><br>' : '')+'<div class="settingText">'+settings[i]['title']()+'</div>'
			f = true
		}
		if(settings[i]['display']!==undefined){
			display = settings[i]['display']()
		}

		if(settings[i]['type']()=='click'){
			set += `<button class="settingBto" onclick="$(settings['`+i+`']['onClick']())">`+settings[i]['name']()+display+`</button>`
		}else if(settings[i]['type']()=='boolean'){
			set += `<button class="settingBto" onclick="player.setting['`+i+`'] = !player.setting['`+i+`'];loadSetting()">`+settings[i]['name']()+`: `+(player.setting[i] ? '开启' : '关闭')+display+`</button>`
		}else if(settings[i]['type']()=='choose'){
			let choose = '｜'
			let sc = null
			let next = false
			for(let ic in settings[i]['choose']){
				if(next && sc==null){
					sc = ic
				}
				choose += (player.setting[i]==ic ? '<black>' : '')+settings[i]['choose'][ic]['name']()+(player.setting[i] == ic ? '</black>' : '')+'｜'
				if(player.setting[i]==ic){
					next = true
				}
			}
			if(next && sc==null){
				sc = 'default'
			}
			set += `<button class="settingBto" onclick="player.setting['`+i+`']='`+sc+`';loadSetting()">`+settings[i]['name']()+`: <grey>`+choose+`</grey>`+display+`</button>`
		}
	}
	getByID('tab_setting', set)
	for(let i in settings){
		if(settings[i]['effect']!==undefined){
			$(settings[i]['effect']())
		}
	}
}

setInterval(function(){
	for(let i in settings){
		if(settings[i]['effect']!==undefined){
			$(settings[i]['effect']())
		}
	}
}, 50)

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