var player = {};
var saveObj = {}//saveObj:存档字符串解密+JSON.parse(saveObj)后的结果.请将导入或从localStorage中读取的字符串在*解密和JSON.parse(saveObj)之后*放在这里.当然了,你也可以在这个后边加个等号设置默认值.
function n(number){//对于不同的数字库,请改变该函数!
    return new Decimal(number);
};
//例如 inObj({a:0},["a"])返回true inObj({a:{b:{c:0}}},["a","b"])返回true
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
//自动创建对象--inObj2.0ver
function autoCreateObject(json,place){
    let a = json;
    for(i in place){
        if(a[place[i]] === undefined){
            a[place[i]] = {}
        };
        a = a[place[i]];
    };
};
//全体加载!<建议直接加载对象和数组里边的元素,但对于数组什么的也是可以用的,可以用来存储数组>
//如果你不希望创建对象,而是创建数组,请手动在相应位置创建一个空数组.(或者修改autoCreateObject函数)
//游戏存储对象默认使用player表示.如果你并不希望使用player,请替换这里的player.
/*
place:元素所在位置,使用方法:
1.使用含字符串或数字的数组表示.例如["a","layer2"] 表示元素存储在player.a.layer2这个位置中.若无对应位置会自动创建对象.不能为空数组.
2.使用用逗号分隔的字符串,和上方等效："a,layer2".这种方法更为快速.不能为空字符串,不建议打空格.使用英文逗号.
item:元素默认值.若存档中并不存在这个元素,那么用这个值代替.
*/
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
        if(typeof item == 'object'){
            if(!(item.sign===undefined)/*若不适配,请使用任意一个大数字库对象中的元素名来检测!*/){
                partOfSave = n(partOfSave)
            }
        }
        partOfPlayer[place[place.length-1]] = partOfSave
    }
    else{
        partOfPlayer[place[place.length-1]] = item
    }
}

//本地存储player  key:存档id.以这个为索引读取/存储存档.请勿使用过于简单的key,防止混淆.多个key可以形成多存档机制.
function save(key){
    let saveStr = LZString.compressToBase64(JSON.stringify(player));
    localStorage.setItem(key,saveStr)
}
//读取+解密player   会自动存储于saveObj中,可以直接跟着loader.
function load(key){
    if(LZString.decompressFromBase64(localStorage.getItem(key))[0] != "{"){return}
    try{
        saveObj = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(key)))
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
function importSave(saveStr = prompt("输入存档")){
    saveObj = JSON.parse(LZString.decompressFromBase64(saveStr))
    window.location.reload()
}
function hardReset(key){
    player = null;
    save(key);
    window.location.reload();
}