function getCraftClick(id){
	if(main['craft'][id]['cooldown']!==undefined){
		if(player['craft'][id+'Cooldown'].lte(0)){
			$(main['craft'][id]['onClick'])
			player['craft'][id+'Cooldown'] = n(main['craft'][id]['cooldown']())

			document.getElementById("craft"+id+"BorderID").style.transitionDuration = '0s'
			let border = n(100).sub(player['craft'][id+'Cooldown'].div(n(main['craft'][id]['cooldown']()).max(0.01)).mul(100))
			document.getElementById("craft"+id+"BorderID").style.clipPath = 'inset(0% '+border+'% 0% 0%)'
		}
	}else{
		$(main['craft'][id]['onClick'])
	}
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceBaseMax(i))
			getResourceID(i)
		}
	}
	componentCraft(id)
}