import {AfterViewInit, Component, ViewEncapsulation} from "@angular/core";
import {ChartIconFactory, ChartType} from "jigsaw/component/chart-icon/chart-icon-factory";
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FishBoneFullComponent implements AfterViewInit {

    constructor() {
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
                                                <div class="jigsaw-table-host" style="width: 300px">
                                                <table>
                                                    <thead><tr><td>ID</td><td>name</td><td>gender</td><td>city</td></tr></thead>
                                                    <tbody>
                                                        <tr><td>1</td><td><a onclick="hello('tom')">tom</a></td><td>male</td><td>nj</td></tr>
                                                        <tr><td>2</td><td><a onclick="hello('jerry')">jerry</a></td><td>male</td><td>shz</td></tr>
                                                        <tr><td>3</td><td><a onclick="hello('marry')">marry</a></td><td>female</td><td>sh</td></tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            `,
                                        // 这里需要特别注意，由于我们给了一段html片段并且包含了回调函数`hello()`，
                                        // 因此这里必须设置 `innerHtmlContext` 属性作为`hello()`函数的上下文
                                        // 如果html片段中不包含回调函数，则无需设置 `innerHtmlContext` 属性
                                        innerHtmlContext: this
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

        this.data3 = new TreeData();
        this.data3.fromObject([
            {
                "id": 0,
                "name": "联合附着",
                "count": "2668",
                "ratio": "33.81(%)",
                "delay": "8.40ms",
                "drill": {
                    "kpi": "fail_combined_attach_ims",
                    "table": "aggr_volte_attach_ci_fail",
                    "serviceType": 22,
                    "condition": "Interface=5 and Procedure_Type=1 and Procedure_Status!=1 and Keyword_1=2 and Z_Reserve1=0"
                },
                "pie": {
                    "header": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "field": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "data": [["S1-MME InternalCause", "附着超时[11,0]", "11", "0", "830"], ["S1-MME InternalCause", "11,186[11,186]", "11", "186", "470"], ["S1-MME InternalCause", "11,32[11,32]", "11", "32", "21"], ["S1-MME InternalCause", "11,101[11,101]", "11", "101", "8"], ["ESM Cause", "13,0[13,0]", "13", "0", "8"]],
                    "other": {"name": "其它", "value": 576}
                }
            },
            {
                "id": 1,
                "name": "PDN连接建立",
                "count": "2451",
                "ratio": "64.26(%)",
                "delay": "5759.25ms",
                "drill": {
                    "kpi": "fail_uepdn",
                    "table": "aggr_volte_attach_ci_fail",
                    "serviceType": 22,
                    "condition": "Interface=5 and Procedure_Type=1 and Keyword_1=2 and Z_Reserve1=0 and (apn like '%ims%' or apn like '%IMS%')"
                },
                "pie": {
                    "header": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "field": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "data": [["S1-MME InternalCause", "Tau超时[11,3]", "11", "3", "952"]]
                }
            },
            {
                "id": 2,
                "name": "Gm注册",
                "count": "1841",
                "ratio": "14.61(%)",
                "delay": "5.84ms",
                "drill": {
                    "kpi": "(fail_register1_gm + fail_register2_gm)",
                    "table": "aggr_volte_register_ci_fail",
                    "serviceType": 23,
                    "condition": "Interface=13 and PROCEDURETYPE=1 and Z_KEYWORD1 in (1,2) and PROCEDURESTATUS!=1"
                },
                "pie": {
                    "header": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "field": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "data": [["SIP Cause", "Request Terminated[30,487]", "30", "487", "1572"]]
                }
            },
            {
                "id": 3,
                "name": "Mw注册",
                "count": "4741",
                "ratio": "0.53(%)",
                "delay": "188.64ms",
                "drill": {
                    "kpi": "(fail_register1_mw + fail_register2_mw)",
                    "table": "aggr_volte_register_ci_fail",
                    "serviceType": 23,
                    "condition": "Interface=14 and PROCEDURETYPE=1 and Z_KEYWORD1 in (1,2) and PROCEDURESTATUS!=1 and SOURCE_NE_TYPE=15"
                },
                "pie": {
                    "header": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "field": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "data": [],
                    "other": {"name": "其它", "value": 4716}
                }
            },
            {
                "id": 4,
                "name": "ISC注册",
                "count": "1800",
                "ratio": "12.67(%)",
                "delay": "1.00ms",
                "drill": {
                    "kpi": "fail_register3_isc",
                    "table": "aggr_volte_register_ci_fail",
                    "serviceType": 23,
                    "condition": "Interface=18 and PROCEDURETYPE=3 and PROCEDURESTATUS!=1"
                },
                "pie": {
                    "header": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "field": ["causetype", "cause", "causetype_val", "cause_val", "failNum"],
                    "data": [["SIP Cause", "Forbidden[30,403]", "30", "403", "1572"]]
                }
            }
        ]);
        this.data3.label = `<span class="orange">VoLTE呼损分析</span>`;
        this.data3.nodes.forEach((node, index) => {
            node.label = `<span class="orange">${node.name}</span>`;
            let pieData = node.pie.data.reduce((arr, item) => {
                arr.push(item[item.length - 1]);
                return arr;
            }, []);
            if (node.pie.other) {
                pieData.push(node.pie.other.value);
            }
            pieData.join(",");
            let nodesItem = new TreeData();
            nodesItem.label = `<span class="pie-call-loss-${index}">${pieData}</span>`;
            nodesItem.desc = `<p class="call-loss-data"> count: ${node.count} <br> ratio: ${node.ratio} <br> delay: ${node.delay}</p>`;
            node.nodes = [nodesItem];
        });
    }

    data: TreeData;

    data2: TreeData;

    data3: TreeData;

    hello(toWhom) {
        alert('hello ' + toWhom);
    }

    ngAfterViewInit() {
        ChartIconFactory.registerCustomPie();

        ChartIconFactory.create(".bar-colours-1", ChartType.bar, {
            fill: ["red", "green", "blue"],
            height: 50,
            width: 100
        });

        ChartIconFactory.create(".pie-colours-2", ChartType.pie, {
            fill: function (_, i, all) {
                let g = (i / all.length) * 255;
                return "rgb(255, " + g + ", 0)"
            },
            radius: 48,
        });

        ChartIconFactory.create(".line", ChartType.line, {
            height: 80,
            width: 100
        });

        this.data3.nodes.forEach((node, index) => {
            node.label = `<span class="orange">${node.name}</span>`;
            let labelArr = node.pie.data.reduce((arr, item) => {
                arr.push(item[0] + item[1]);
                return arr;
            }, []);
            if (node.pie.other) {
                labelArr.push(node.pie.other.name);
            }

            ChartIconFactory.create(".pie-call-loss-" + index, ChartType.customPie, {
                fill: function (_, i, all) {
                    let g = Math.round((i / all.length) * 255);
                    return "rgb(100, " + g + ", 222)"
                },
                radius: 60,
                legend: {
                    orient: 'right', // 如果是'top'，图例的高度是自动算出来的，所以height属性不需要配置
                    width: 100,
                    data: labelArr
                },
                series: node,
                link: this.handleLink,
                context: this,
                after: () => {
                    console.log('a pie has been draw')
                },
            });
        });
    }

    handleLink(data, index){
        console.log(this);
        console.log(index, data);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
