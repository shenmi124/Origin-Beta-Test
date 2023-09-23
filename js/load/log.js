let log = ''

function addLog(id,color){
    log = '<div><li><span style="padding: 0px 0px 2px 3px; font-size: 14px; color:'+color+'">'+id+'<br></span></div>'+log
	refreshLog()
}

function refreshLog(){
    getByID('logLoadID',log)
}