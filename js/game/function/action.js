function getActionID(id){
	getByID(id+"LoadActionID",`
	<tooltip `+tooltipLoad(id,'TooltipLoadAction')+`>
		<button onclick="getActionClick('`+id+`')">`+main['action'][id]['name']()+`</button>
	</tooltip>`)
}

function getActionClick(id){
	$(main['action'][id]['onClick'])
	getActionID(id)
}