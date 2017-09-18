import {AfterViewInit, Component, ViewEncapsulation} from "@angular/core";
import {ChartIcon, ChartType} from "../../../../jigsaw/component/chart-icon/chart-icon";
import {TreeData} from "../../../../jigsaw/core/data/tree-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FishBoneFullComponent implements AfterViewInit {

    constructor(){
        this.data = new TreeData();
        this.data.label = '<span class="orange">目标标题</span>';
        this.data.fromObject([
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
                                                },
                                                {
                                                    label: 'end'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: '子节点112',
                                    nodes: [
                                        {
                                            label: '<span class="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: '父节点12'
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
                                            label: '<span class="line">5,3,9,6,5,9,7,3,5,2</span>'
                                        },
                                        {
                                            label: `
                                            <div class="jigsaw-table-host">
                                            <table>
                                                <thead><tr><td>ID</td><td>name</td><td>gender</td><td>city</td></tr></thead>
                                                <tbody>
                                                    <tr><td>1</td><td>tom</td><td>1</td><td>nj</td></tr>
                                                    <tr><td>2</td><td>jerry</td><td>0</td><td>shz</td></tr>
                                                    <tr><td>3</td><td>json</td><td>1</td><td>sh</td></tr>
                                                </tbody>
                                            </table>
                                            </div>`
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
                            label: '<span class="bar-colours-1">5,3,9,6,5,9,7,3,5,2</span>'
                        },
                        {
                            label: 'end'
                        }
                    ]
                },
                {
                    label: '<span class="orange">父节点5</span>',
                    nodes: [
                        {
                            label: '<span class="pie-colours-2">5,3,9,6,5</span>'
                        }
                    ]
                }
            ]);
        this.data2 = new TreeData();
        this.data2.label = '<span class="orange">申论万能思维体系</span>';
        this.data2.fromObject([
            {
                label: '<span class="orange">实务维度</span>',
                nodes: [
                    {
                        label: '主体',
                        nodes: [
                            {
                                label: '构成',
                                nodes: [
                                    {
                                        label: '政府',
                                    },
                                    {
                                        label: '企业',
                                    },
                                    {
                                        label: '民众',
                                    }
                                ]
                            },
                            {
                                label: '方面',
                                nodes: [
                                    {
                                        label: '利益',
                                        nodes: [
                                            {
                                                label: '经济利益-钱'
                                            },
                                            {
                                                label: '政治利益-权利和权力'
                                            },
                                            {
                                                label: '文化利益-精神需求'
                                            },
                                            {
                                                label: '民生利益-生活需求'
                                            },
                                            {
                                                label: '生态利益'
                                            }
                                        ]
                                    },
                                    {
                                        label: '思想',
                                        nodes: [
                                            {
                                                label: '理念'
                                            },
                                            {
                                                label: '意识'
                                            },
                                            {
                                                label: '常识、知识'
                                            }
                                        ]
                                    },
                                    {
                                        label: '素质',
                                        nodes: [
                                            {
                                                label: '业务素质'
                                            },
                                            {
                                                label: '思想道德素质'
                                            },
                                            {
                                                label: '心理素质'
                                            },
                                            {
                                                label: '身体素质'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    /*{
                        label: '技术',
                        nodes: [
                            {
                                label: '1、技术手段、技术路径'
                            },
                            {
                                label: '2、人：干部、队伍、人才、编制'
                            },
                            {
                                label: '3、财：财政、贷款、民间成本'
                            },
                            {
                                label: '4、物：设备、设施（基础设施和配套设施）'
                            }
                        ]
                    },
                    {
                        label: '制度',
                        nodes: [
                            {
                                label: '非正式制度：风俗、习惯'
                            },
                            {
                                label: '正式制度',
                                nodes: [
                                    {
                                        label: '规则：静态制度'
                                    },
                                    {
                                        label: '机制：系统制度的应用'
                                    },
                                    {
                                        label: '体制（政策）：规则与机制的统称'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '环境',
                        nodes: [
                            {
                                label: '自然地理环境'
                            },
                            {
                                label: '社会人文环境'
                            }
                        ]
                    }*/
                ]
            },
            {
                label: '<span class="orange">时间维度</span>',
                nodes: [
                    {
                        label: '微观：事前、事中、事后'
                    },
                    {
                        label: '宏观',
                        nodes: [
                            {
                                label: '过去、历史、传统'
                            },
                            {
                                label: '现在、现状、现代'
                            },
                            {
                                label: '未来、将来'
                            },
                        ]
                    }
                ]
            },
            {
                label: '<span class="orange">空间维度</span>',
                nodes: [
                    {
                        label: '物理空间',
                        nodes: [
                            {
                                label: '本地、本国、民族'
                            },
                            {
                                label: '外地、外国、世界'
                            }
                        ]
                    },
                    {
                        label: '思维空间',
                        nodes: [
                            {
                                label: '内因'
                            },
                            {
                                label: '外因'
                            }
                        ]
                    },
                ]
            },
            {
                label: '<span class="orange">价值维度</span>',
                nodes: [
                    {
                        label: '利、积极、成绩、意义、经验'
                    },
                    {
                        label: '弊、消极、问题、危害、教训'
                    }
                ]
            }
        ]);
    }

    data: TreeData;

    data2: TreeData;

    ngAfterViewInit() {
        new ChartIcon(".bar-colours-1", ChartType.bar, {
            fill: ["red", "green", "blue"],
            height: 50,
            width: 100
        });

        new ChartIcon(".pie-colours-2", ChartType.pie, {
            fill: function (_, i, all) {
                var g = (i / all.length) * 255;
                return "rgb(255, " + g + ", 0)"
            },
            radius: 48,
        });

        new ChartIcon(".line", ChartType.line, {
            height: 80,
            width: 100
        });

    }
}
