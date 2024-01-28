let language = {
    en: {
        values:{
            "居民": "",
        }
    },
    zh: {
        values:{
        }
    }
}

i18nLoad()

i18n.translator.add(language[player.setting.language])