function getActionID(id){
	getByID(id+"LoadActionID",`
	<tooltip `+tooltipLoad(id,'TooltipLoadAction')+`>
		<button onclick="getActionClick('`+id+`')">`+main['action'][id]['name']()+`</button>
	</tooltip>`)
}

function getActionClick(id){
	$(main['action'][id]['onClick'])
	for(i in main['resource']){
		if(main['resource'][i]['max']!==undefined){
			player['resource'][i] = player['resource'][i].min(getResourceBaseMax(i))
			getResourceID(i)
		}
	}
	getActionID(id)
}