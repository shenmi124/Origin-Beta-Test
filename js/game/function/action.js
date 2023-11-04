function getActionClick(id){
	if(main['action'][id]['cooldown']!==undefined){
		if(player['action'][id+'Cooldown'].lte(0)){
			$(main['action'][id]['onClick'])
			player['action'][id+'Cooldown'] = n(main['action'][id]['cooldown']())
			let border = n(100).sub(player['action'][id+'Cooldown'].div(n(main['action'][id]['cooldown']()).max(0.01)).mul(100))
			document.getElementById("action"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}else{
		$(main['action'][id]['onClick'])
	}
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceBaseMax(i))
			getResourceID(i)
		}
	}
	componentAction(id)
}