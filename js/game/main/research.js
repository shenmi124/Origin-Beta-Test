var mainResearch = {
    main:{
        /*m31:{
            name(){return '磨石'},
            tooltip:{
                0(){return '撵磨开始'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 磨石',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(5)},
                },
            },
            max(){return n(1)},
            map(){return 3},
            canvas(){return ['m21']},
            unlocked(){return player.research.m21.gte(1)}
        },*/
        m31:{
            name(){return '燧石镐'},
            tooltip:{
                0(){return '并不能算的上是一把真正的镐子,不过是一块更加锋利的石头罢了<tip>“碎”石镐</tip>'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 产出倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
            },
            max(){return n(1)},
            map(){return 3},
            canvas(){return ['m21']},
            unlocked(){return player.research.m21.gte(1)}
        },
        m32:{
            name(){return '燧石铲'},
            tooltip:{
                0(){return '学会使用工具'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 幸运倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
            },
            max(){return n(1)},
            map(){return 3},
            canvas(){return ['m21']},
            unlocked(){return player.research.m21.gte(1)}
        },
        m33:{
            name(){return '燧石刀'},
            tooltip:{
                0(){return '学会使用武器,即使它的敌人是草'},
            },
            effect:{
                0:{
                    1(){return ['行动割草 产出倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
            },
            max(){return n(1)},
            map(){return 3},
            canvas(){return ['m21']},
            unlocked(){return player.research.m21.gte(1)}
        },
        m21:{
            name(){return '燧石打磨'},
            tooltip:{
                0(){return '打磨石头'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 产出倍率+'+(player.research.m21.gte(2) ? '60' : '30')+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 产出倍率+30%',false]},
                },
            },
            cost: {
                0:{
                    stone(){return n(0.3)},
                },
                1:{
                    stone(){return n(5)},
                },
            },
            max(){return n(2)},
            map(){return 2},
            canvas(){return ['m11']},
            unlocked(){return player.research.m11.gte(1) && getResourceUnlocked('stone')}
        },
        m22:{
            name(){return '纤维网'},
            tooltip:{
                0(){return '加强过滤,也许你能从泥土中找到一些碎石.'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 幸运倍率+20%',true]},
                },
            },
            cost: {
                0:{
                    fiber(){return n(8)}
                },
            },
            max(){return n(1)},
            map(){return 2},
            canvas(){return ['m11','m12']},
            unlocked(){return player.research.m11.gte(1) && player.research.m12.gte(1)}
        },
        m11:{
            name(){return '泥筛工艺'},
            tooltip:{
                0(){return '尝试在泥土中寻找其他物质'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 幸运倍率+20%',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(12)},
                    fiber(){return n(3)}
                },
            },
            max(){return n(1)},
            map(){return 1},
            canvas(){return ['sg']},
            unlocked(){return player.research.sg.gte(1)}
        },
        m12:{
            name(){return '纤维绳'},
            tooltip:{
                0(){return '用植物纤维来搓成纤维绳'},
            },
            effect:{
                0:{
                    1(){return ['行动研磨 产出倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    fiber(){return n(4)}
                },
            },
            max(){return n(1)},
            map(){return 1},
            canvas(){return ['sg']},
            unlocked(){return player.research.sg.gte(1)}
        },
        sg:{
            name(){return '降临'},
            tooltip:{
                0(){return '我...是谁?<tip>无所不知,无所不能,无所不在,即为神性</tip>'},
            },
            effect:{
                0:{
                    0(){return ['效果: 无',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(1)},
                    fiber(){return n(1)}
                },
            },
            max(){return n(1)},
            map(){return 0}
        },
    }
}