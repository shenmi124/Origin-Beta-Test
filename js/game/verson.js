var VERSION = '11w 07a'
var VERSIONTIMES = n(7)

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

			if(player.data.versiontimes.lte(6)){
				player.action.explore.bloodStone = false
				player.action.explore.bloodStoneFound = false
				player.resource.bloodStoneUnlock = false
				player.resource.bloodStoneUnlocked = false
				player.resource.bloodStone = n(0)
			}

			if(player.data.versiontimes.lte(5)){
				if(player.workshop.camp){
					getStage(5)
				}
			}

			if(player.data.versiontimes.lte(4)){
				for(let i in MAIN['action']['explore']['gain']){
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
				for(let i in RESOURCE['main']){
					player['resource'][i+'Best'] = player['resource'][i]
					player['resource'][i+'Total'] = player['resource'][i]
				}
			}

		}

		player.data.version = VERSION
		player.data.versiontimes = VERSIONTIMES
	}
}

let donateHistory = `
<li-hid>我的<a href="https://afdian.com/a/Shinwmyste" target="_blank" style="color: black;">爱发电</a>数据<grey>(以时间排序)</grey>:<br><br>
<li-hid>用户昵称: p_p<br>
<li-hid>最近日期: 2024年9月21日<br>
<li-hid>赞助金额: 50.00￥<hr><li-hid>用户昵称: ᅟᅠ<br>
<li-hid>最近日期: 2024年9月20日<br>
<li-hid>赞助金额: 180.00￥<hr><li-hid>用户昵称: yuyanMC<br>
<li-hid>最近日期: 2023年11月11日<br>
<li-hid>赞助金额: 60.00￥<hr><li-hid>用户昵称: 爱发电用户_811a5<br>
<li-hid>最近日期: 2022年6月22日<br>
<li-hid>赞助金额: 30.00￥<hr><li-hid>用户昵称: AJL2008<br>
<li-hid>最近日期: 2022年6月6日<br>
<li-hid>赞助金额: 10.00￥<hr><li-hid>用户昵称: 爱发电用户_ad8ed<br>
<li-hid>最近日期: 2022年3月27日<br>
<li-hid>赞助金额: 5.00￥<hr><li-hid>用户昵称: 爱发电用户_5XbC<br>
<li-hid>最近日期: 2022年6月29日<br>
<li-hid>赞助金额: 65.00￥<hr><li-hid>用户昵称: 奶他酱<br>
<li-hid>最近日期: 2022年8月15日<br>
<li-hid>赞助金额: 40.00￥<hr>`
function loadDonate(){
	let useParams = {"page":1}
	let useTs = Number(new Date()) / 1000

	$.ajax({
		url: 'https://cors-anywhere.herokuapp.com/https://afdian.com/api/open/query-sponsor',
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
			getByID('donateSubtab', `<br><li-hid>我的<a href="https://afdian.com/a/Shinwmyste" target="_blank" style="color: black;">爱发电</a>数据<grey>(以时间排序)</grey>:<br><br>`+data)
		},
		error: function(){
			getByID('donateSubtab', `<br><li-hid>未能正常获取实时数据,以下是截止为2024年9月22日的捐助名单<br><br>`+donateHistory)
		}
	})
}