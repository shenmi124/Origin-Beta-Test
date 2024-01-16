let logQueue = []
let logTimes = 0
let logComplete = 0

function addLog(id,color="#000"){
    logQueue.push(
        '<div class="logTimes" style="color: '+color+'; transition-duration: 1s; opacity: 0;" id="logTimes'+logTimes+'"><span style="padding: 0px 0px 2px 0px; font-size: 14px;">'+id+'<br></span></div><br>'
    )
    logTimes += 1
    if(logQueue[0]==undefined){
        insLog()
    }
}

function insLog(){
    if(logQueue[0]!==undefined){
        misByID('logLoadID',logQueue[0])
        document.getElementById('logTimes'+logComplete).style.opacity = 0
        const times = logComplete
        setTimeout(function(){
            document.getElementById('logTimes'+times).style.opacity = 1
        },100)
        logComplete += 1
        logQueue.splice(0, 1)
    }
}

setInterval(insLog, 500)