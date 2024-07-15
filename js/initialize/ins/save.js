var player = {};
var saveObj = {}
const THISKEY = 'OriginBeta'
var DONOTSAVE = false

function n(number){
    return new Decimal(number);
};

function inObj(json,things){
    var a = json;
    for(i in things){
        if(!(a[things[i]] === undefined)){
            a = a[things[i]];
        }else{
            return false;
        };
    }
    return true;
};

function autoCreateObject(json,place){
    let a = json;
    for(i in place){
        if(a[place[i]] === undefined){
            a[place[i]] = {}
        };
        a = a[place[i]];
    };
};


function loader(place,item){
    if(typeof place == "string") place = place.split(",")
    autoCreateObject(player,place)
    var partOfPlayer = player
    var partOfSave = saveObj
    var lastPartingData = player
    var hasSaved = inObj(saveObj,place)
    for(i in place){
        partOfPlayer = partOfPlayer[place[i]]
        if(hasSaved) partOfSave = partOfSave[place[i]]
        if(i == place.length-1){partOfPlayer = lastPartingData}
        lastPartingData = partOfPlayer
    }
    if(hasSaved){
        if(typeof item == 'object' && item !== null){
            if(!(item.sign===undefined)){
                partOfSave = n(partOfSave)
            }
        }
        partOfPlayer[place[place.length-1]] = partOfSave
    }
    else{
        partOfPlayer[place[place.length-1]] = item
    }
}

function save(force = false){
    if(DONOTSAVE && !force) return
    let saveStr = LZString.compressToBase64(JSON.stringify(player));
    localStorage.setItem(THISKEY,saveStr)
}

function load(){
    if(LZString.decompressFromBase64(localStorage.getItem(THISKEY))[0] != "{"){return}
    try{
        saveObj = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(THISKEY)))
    }catch(err){
        console.log(err)
    }
}

function exportSave(){
    let saveStr = LZString.compressToBase64(JSON.stringify(player));
    const el = document.createElement("textarea");
    el.value = saveStr;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(el)
}

function importSave(saveStr=prompt("输入存档")){
    if(!saveStr) return
    try{
        saveObj = JSON.parse(LZString.decompressFromBase64(saveStr))
        if(!saveObj) throw("null error")
    }catch(err){
        window.alert(`输入的存档有误!\n请检查你的存档是否完整.`)
        return
    }
    DONOTSAVE = true
    localStorage.setItem(THISKEY,saveStr)
    window.location.reload()
}

function hardReset(){
    DONOTSAVE = true
    player = null;
    save(true);
    window.location.reload();
}