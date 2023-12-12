let log = ''
let logTime = n(0)
let logRealTime = n(0)
let logTick = n(0)
let logID = n(0)

function addLog(id,color="#000"){
    log = '<div class="logTimes" style="color: '+color+'; transition-duration: 1s; opacity: 1;" id="logTimes'+logID+'"><span style="padding: 0px 0px 2px 0px; font-size: 14px;">'+id+'<br></span></div>'+log
    logTime = logTime.add(1)
    logID = logID.add(1)
    
    logTick = logTick.add(20)
    insLog()
}

function insLog(){
    logRealTime = logRealTime.add(n(1).mul(diff)).min(logTime)
    logTick = logTick.add(n(20).mul(diff))
    if(logTick.gte(20)){
        logTick = n(0)

        getByID('logLoadID',log)
        for(let i = logRealTime.floor();n(i).lt(logTime);i++){
            document.getElementById('logTimes'+i).style.opacity = 0
            document.getElementById('logTimes'+i).style.display = 'none'
        }
        const times = logRealTime.floor()
        if(document.getElementById('logTimes'+times)!==null){
            document.getElementById('logTimes'+times).style.display = ''
            setTimeout(function(){
                    document.getElementById('logTimes'+times).style.opacity = 1
            },100)
        }
    }
}

setInterval(insLog, 50)