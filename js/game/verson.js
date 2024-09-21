var VERSION = '11w 05a'
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

function loadDonate(){
	let useParams = {"page":1}
	let useTs = Number(new Date()) / 1000

	$.ajax({
		url: 'https://afdian.com/api/open/query-sponsor',
		method: 'GET',
		data: {
			user_id: useUserID,
			params: JSON.stringify(useParams),
			ts: useTs,
			sign: md5(useApiToken+'params'+JSON.stringify(useParams)+'ts'+useTs+'user_id'+useUserID)
		},
		success: function(response){
			let data = ''
			let amount = n(0)
			for(let allUser in response.data.list){
				let date = new Date(response.data.list[allUser].last_pay_time*1000)
				data += `<li-hid>用户昵称: `+response.data.list[allUser].user.name+`<br>
				<li-hid>最近日期: `+date.getFullYear()+`年`+(date.getMonth()+1)+`月`+date.getDate()+`日<br>
				<li-hid>赞助金额: `+response.data.list[allUser].all_sum_amount+`￥<hr>`
				amount = amount.add(response.data.list[allUser].all_sum_amount)
			}
			getByID('subtab_setting_donate', `<br><li-hid>我的<a href="https://afdian.com/a/Shinwmyste" target="_blank" style="color: black;">爱发电</a>数据<grey>(以时间排序)</grey>:<br><br>`+data)
		},
		error: function(){
			getByID('subtab_setting_donate', '未能获取数据,正在尝试重新获取,请检查你的网络状态')
		}
	})

	setTimeout(function(){loadDonate()}, 300000);
}