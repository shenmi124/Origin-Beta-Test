let language = {
    en: {
        values:{
            "mainButton.main": "Main",
            "mainButton.research": "Research",
            "mainButton.setting": "Setting",

            "resource.dirt": "Dirt",
            "resource.researchPoints": "Research"
        }
    },
    zh: {
        values:{
            "mainButton.main": "主页",
            "mainButton.research": "研究",
            "mainButton.setting": "设置",

            "resource.dirt": "泥土",
            "resource.fiber": "纤维",
            "resource.stone": "石材",
            "resource.tin": "锡",
            "resource.gem": "宝石",
            "resource.water": "水",
            "resource.grass": "植被",

            "resource.researchPoints": "研究",

            "resource.devSpeed": "时速",
        }
    }
}

i18nLoad()

i18n.translator.add(language[player.setting.language])