let log = ''
let logTimes = 1

function addLog(id,color='#000'){
    log = '<div style="color: '+color+'; transition-duration: 1s; opacity: 1;" id="logTimes'+logTimes+'"><span style="padding: 0px 0px 2px 0px; font-size: 14px;">'+id+'<br></span></div>'+log
    getByID('logLoadID',log)
    document.getElementById('logTimes'+logTimes).style.opacity = 0
    const times = logTimes
    setTimeout(function(){
        document.getElementById('logTimes'+times).style.opacity = 1
    },100)
    logTimes += 1
}