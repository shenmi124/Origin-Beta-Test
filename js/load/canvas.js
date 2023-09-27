var canvas = document.querySelector(".canvas");
var width = (canvas.width = window.innerWidth-6);
var height = (canvas.height = window.innerHeight-6);
var ctx = canvas.getContext("2d");

function drawTree(id,id2,color){
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	let start = document.getElementById(id+"MainResearchButtonID").getBoundingClientRect();
	let end = document.getElementById(id2+"MainResearchButtonID").getBoundingClientRect();
	let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
	let y1 = start.top + (start.height / 2) + document.body.scrollTop;
	let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
	let y2 = end.top + (end.height / 2) + document.body.scrollTop;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

setInterval(function(){
	canvas.width = window.innerWidth-6
	canvas.height = window.innerHeight-6
	if(canDraw){
		for(i in mainResearch['main']){
			if((mainResearch['main'][i]['unlocked']===undefined || mainResearch['main'][i]['unlocked']()) && mainResearch['main'][i]['canvas']!==undefined){
				for(ic in mainResearch['main'][i]['canvas']()){
					let color = 'rgba(0, 0, 0, 0.3)'
					if(player['research'][mainResearch['main'][i]['canvas']()[ic]].gte(n(mainResearch['main'][mainResearch['main'][i]['canvas']()[ic]]['max']()).min(1))){
						if(player['research'][i].gte(1)){color = 'rgb(246, 170, 255, 0.6)'}
						if(player['research'][i].gte(mainResearch['main'][i]['max']())){color = 'rgba(174, 35, 252, 0.4)'}
					}
					drawTree(mainResearch['main'][i]['canvas']()[ic],i,color)
				}
			}
		}
	}
})