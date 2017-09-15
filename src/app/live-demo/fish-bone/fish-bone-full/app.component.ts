import {AfterViewInit, Component, ViewEncapsulation} from "@angular/core";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FishBoneFullComponent implements AfterViewInit{
    data = [
        {
            label: '<span class="orange"><span class="fa fa-group"></span>父节点1</span>',
            nodes: [
                {
                    label: '<span class="fa fa-line-chart"></span>父节点11',
                    nodes: [
                        {
                            label: '子节点111',
                            nodes: [
                                {
                                    label: '子节点1111',
                                    nodes: [
                                        {
                                            label: "子节点11111",
                                            nodes: [
                                                {
                                                    label: '<span class="line">5,3,9,6,5,9,7,3,5,2</span>'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: '<span class="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>'
                                },
                                {
                                    label: '<span class="pie-colours-2">5,3,9,6,5</span>'
                                }
                            ]
                        },
                        {
                            label: '子节点112'
                        }
                    ]
                },
                {
                    label: '父节点12',
                    nodes: [
                        {
                            label: '子节点121'
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange"><span class="fa fa-folder"></span>父节点2</span>',
            nodes: [
                {
                    label: '<span class="fa fa-line-chart"></span>父节点21',
                    nodes: [
                        {
                            label: '子节点211',
                            nodes: [
                                {
                                    label: '<span class="fa fa-bar-chart"></span>end'
                                },
                                {
                                    label: '<span class="fa fa-bar-chart"></span>end'
                                },
                                {
                                    label: 'end'
                                }
                            ]
                        },
                        {
                            label: '子节点212'
                        }
                    ]
                },
                {
                    label: '父节点22',
                    nodes: [
                        {
                            label: '子节点221'
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange"><span class="fa fa-line-chart"></span>父节点3</span>',
            nodes: [
                {
                    label: '父节点31',
                    nodes: [
                        {
                            label: '<span class="fa fa-bar-chart"></span>end'
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange">父节点4</span>',
            nodes: [
                {
                    label: '父节点41',
                    nodes: [
                        {
                            label: '<span class="green">end</span>'
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange">父节点5</span>',
            nodes: [
                {
                    label: '父节点51',
                    nodes: [
                        {
                            label: '<span class="green">end</span>'
                        }
                    ]
                }
            ]
        }
    ];

    data2= [
        {
            label: '<span class="orange">单进程性能</span>',
            nodes: [
                {
                    label: '并发能力与网口速率上限有关'
                },
                {
                    label: '模拟实际测试代码',
                    nodes: [
                        {
                            label: '单进程内存与并发的关系',
                            nodes: [
                                {
                                    label: '大约是16G/100并发基本呈线性增长'
                                }
                            ]
                        },
                        {
                            label: '单主机CPU极限',
                            nodes: [
                                {
                                    label: '并发'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '单进程空载极限',
                    nodes: [
                        {
                            label: '保守并发量约100万这是保守计算值'
                        }
                    ]

                }
            ]
        },
        {
            label: '<span class="orange">FDFDFDF</span>',
            nodes: [
                {
                    label: '飞飞狒狒飞飞狒狒',
                    nodes: [
                        {
                            label: 'dddddddd',
                            nodes: [
                                {
                                    label: '<span class="green"><span class="fa fa-bar-chart"></span>dddddd</span>'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange">FDFDFDF</span>',
            nodes: [
                {
                    label: '飞飞狒狒飞飞狒狒',
                    nodes: [
                        {
                            label: '<span class="fa fa-bar-chart"></span>ddddddddd',
                            nodes: [
                                {
                                    label: '<span class="green">ddddddd</span>'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: '<span class="orange">FDFDFDF</span>',
            nodes: [
                {
                    label: '飞飞狒狒飞飞狒狒',
                    nodes: [
                        {
                            label: 'dddddddd',
                            nodes: [
                                {
                                    label: '<span class="green"><span class="fa fa-bar-chart"></span>dddddd</span>'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    ngAfterViewInit(){
        $(".bar-colours-1").peity("bar", {
            fill: ["red", "green", "blue"],
            height: 50,
            width: 100
        });
        $(".pie-colours-2").peity("pie", {
            fill: function(_, i, all) {
                var g = (i / all.length) * 255;
                return "rgb(255, " + g + ", 0)"
            },
            radius: 48,
        });
        $(".line").peity("line", {
            height: 80,
            width: 100
        });
    }
}
