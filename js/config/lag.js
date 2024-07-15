let language = {
    en: {
        values:{
            "居民": "Citizens",
            "泥土": "Dirt",
        }
    },
    zh: {
        values:{
        }
    }
}

let dis = 'en'
if(player.setting.language=='default'){
    let lag = navigator.language.toLowerCase();
    if(lag.indexOf('zh')!=-1){
        dis = 'zh'
    }else if(lag.indexOf('en')!=-1){
        dis = 'en'
    }else{
        dis = 'en'
    }
}else{
    dis = player.setting.language
}

i18n.translator.add(language[dis])