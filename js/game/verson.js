var VERSION = '11w 04a'
var VERSIONTIMES = n(6)

function loadVersion(){
	getByID('version', VERSION)

	if(player.data.version==null){
		player.data.version = VERSION
		player.data.versiontimes = VERSIONTIMES
	}else if(player.data.version!==VERSION){
		addLog('已更新至<span style="font-family: cursive;">'+VERSION+'</span>','#888')
		addLog('此版本为测试版,请自行备份存档','#888')
		addLog('<br>')
		save()
		
		if(!player.data.versiontimes.eq(VERSIONTIMES)){
			addLog('版本迁移:<br>&nbsp;- 部分游戏已改变,已根据你的进度对存档进行了迁移')
			addLog('<br>')

			if(player.data.versiontimes.lte(5)){
				if(player.workshop.camp){
					getStage(5)
				}
			}

			if(player.data.versiontimes.lte(4)){
				for(let i in main['action']['explore']['gain']){
					if(player['action']['explore'][i]!==undefined){
						if(player['action']['explore'][i].gt(0)){
							player['action']['explore'][i+'Found'] = true
						}
					}else{
						player['action']['explore'][i+'Found'] = true
					}
				}
			}

			if(player.data.versiontimes.lte(3)){
				for(let i in resource['main']){
					player['resource'][i+'Best'] = player['resource'][i]
					player['resource'][i+'Total'] = player['resource'][i]
				}
			}

		}

		player.data.version = VERSION
		player.data.versiontimes = VERSIONTIMES
	}
}
