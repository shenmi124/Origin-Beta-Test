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
            "mainButton.craft": "制作",
            "mainButton.setting": "设置",
            
            "resource.explore": "探索",
            "resource.dirt": "泥土",
            "resource.wood": "木材",
            "resource.food": "食物",
            "resource.fiber": "纤维",
            "resource.stone": "石材",
            "resource.coal": "煤炭",
            "resource.copper": "铜",
            "resource.tin": "锡",
            "resource.gem": "宝石",
            "resource.water": "水",
            "resource.plant": "植被",

            "resource.researchPoints": "科学",

            "resource.craft": "巧物",

            "resource.devSpeed": "时速",

            "resource.copperOre": "铜矿石",
        }
    }
}

i18nLoad()

i18n.translator.add(language[player.setting.language])