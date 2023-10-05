var mainResearch = {
    main:{
        /*m52:{
            name(){return '储粮'},
            tooltip:{
                0(){return '鼠鼠我呀,最喜欢粮食了...<fun>等等,这里貌似没有老鼠</fun>'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 粮仓',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(30)},
                    stone(){return n(5)},
                },
            },
            max(){return n(1)},
            map(){return 5},
            canvas(){return ['m42']},
            unlocked(){return player.research.m42.gte(1)}
        },*/
        m51:{
            name(){return '储物'},
            tooltip:{
                0(){return '采集石头'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 仓库',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(30)},
                    stone(){return n(5)},
                },
            },
            max(){return n(1)},
            map(){return 5},
            canvas(){return ['m41']},
            unlocked(){return player.research.m41.gte(1)}
        },
        m41:{
            name(){return '采石场'},
            tooltip:{
                0(){return '采集石头'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 采石场',true]},
                    2(){return ['研究燧石稿 研究上限+1',true]},
                    3(){return ['研究燧石铲 研究上限+1',true]},
                    4(){return ['研究燧石刀 研究上限+1',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
            },
            max(){return n(1)},
            map(){return 4},
            canvas(){return ['m31','m32']},
            unlocked(){return player.research.m31.gte(1) && player.research.m32.gte(1)}
        },
        m42:{
            name(){return '农具'},
            tooltip:{
                0(){return '农耕时代'},
                1(){return '<fun>从水下第一个萌芽开始...</fun>'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 农场',true]},
                },
                1:{
                    1(){return ['建筑农场 效果+'+getTooltipLoot('m42',20,1)+'%',true]},
                },
                2:{
                    1(){return ['建筑农场 效果+20%',false]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(30)},
                    plant(){return n(5)},
                },
                1:{
                    water(){return n(3)},
                },
            },
            max(){return n(1).add(getResourceUnlocked('water') ? n(1) : n(0))},
            map(){return 4},
            canvas(){return ['m33']},
            unlocked(){return player.research.m33.gte(1)}
        },
        m31:{
            name(){return '燧石镐'},
            tooltip:{
                0(){return '并不能算的上是一把真正的镐子,不过是一块更加锋利的石头罢了<fun>“碎”石镐</fun>'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 产出倍率+'+getTooltipLoot('m31',50)+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 产出倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
                1:{
                    stone(){return n(20)},
                },
            },
            max(){return player.research.m41.gte(1) ? n(2) : n(1)},
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
                    1(){return ['行动采集泥土 幸运倍率+'+getTooltipLoot('m32',50)+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 幸运倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
                1:{
                    stone(){return n(20)},
                },
            },
            max(){return player.research.m41.gte(1) ? n(2) : n(1)},
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
                    1(){return ['行动割草 产出倍率+'+getTooltipLoot('m33',50)+'%',true]},
                },
                1:{
                    1(){return ['行动割草 产出倍率+50%',true]},
                },
            },
            cost: {
                0:{
                    stone(){return n(2)},
                },
                1:{
                    stone(){return n(20)},
                },
            },
            max(){return player.research.m41.gte(1) ? n(2) : n(1)},
            map(){return 3},
            canvas(){return ['m21']},
            unlocked(){return player.research.m21.gte(1)}
        },
        m34:{
            name(){return '脱水'},
            tooltip:{
                0(){return '泥土脱水,即使这样的水并不干净'},
            },
            effect:{
                0:{
                    1(){return ['解锁建筑 集水器',true]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(100)},
                    fiber(){return n(50)},
                },
            },
            max(){return n(1)},
            map(){return 3},
            canvas(){return ['m22']},
            unlocked(){return player.research.m22.gte(1)}
        },
        m21:{
            name(){return '燧石打磨'},
            tooltip:{
                0(){return '打磨石头'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 产出倍率+'+getTooltipLoot('m21',30)+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 产出倍率+30%',false]},
                },
                2:{
                    1(){return ['行动采集泥土 产出倍率+30%',false]},
                },
                3:{
                    1(){return ['行动采集泥土 产出倍率+30%',false]},
                },
            },
            cost: {
                0:{
                    stone(){return n(0.3)},
                },
                1:{
                    stone(){return n(15)},
                },
                2:{
                    stone(){return n(75)},
                },
                3:{
                    stone(){return n(375)},
                },
            },
            max(){return n(4)},
            map(){return 2},
            canvas(){return ['m11']},
            unlocked(){return player.research.m11.gte(1) && getResourceUnlocked('stone')}
        },
        m22:{
            name(){return '纤维网'},
            tooltip:{
                0(){return '加强过滤,也许你能从泥土中找到一些碎石.'},
                1(){return '改良过滤'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 幸运倍率+'+getTooltipLoot('m22',20)+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 幸运倍率+20%',true]},
                }
            },
            cost: {
                0:{
                    fiber(){return n(8)}
                },
                1:{
                    fiber(){return n(22)}
                },
            },
            max(){return n(2)},
            map(){return 2},
            canvas(){return ['m11','m12']},
            unlocked(){return player.research.m11.gte(1) && player.research.m12.gte(1)}
        },
        m11:{
            name(){return '泥筛工艺'},
            tooltip:{
                0(){return '尝试在泥土中寻找其他物质'},
                1(){return '你有没有想过,除了泥土和石子泥土中或许还有其他物质?'},
            },
            effect:{
                0:{
                    1(){return ['行动采集泥土 幸运倍率+'+getTooltipLoot('m31',20)+'%',true]},
                },
                1:{
                    1(){return ['行动采集泥土 幸运倍率+20%',false]},
                    2(){return ['行动采集泥土 揭示更多信息',true]},
                },
                2:{
                    1(){return ['行动采集泥土 幸运倍率+20%',false]},
                    2(){return ['行动采集泥土 揭示更多信息',false]},
                },
            },
            cost: {
                0:{
                    dirt(){return n(12)},
                    fiber(){return n(3)}
                },
                1:{
                    fiber(){return n(15)}
                },
                2:{
                    fiber(){return n(125)}
                },
            },
            max(){return n(3)},
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
                0(){return '我...是谁?<fun>无所不知,无所不能,无所不在,即为神性</fun>'},
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