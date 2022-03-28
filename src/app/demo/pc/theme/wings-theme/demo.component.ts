import { Component, ViewEncapsulation, AfterViewInit, TemplateRef } from "@angular/core";
import { ArrayCollection, GraphData, GroupOptionValue, JigsawListLite, SimpleTreeData, TableData, JigsawInfoAlert, JigsawWarningAlert, JigsawConfirmAlert, TabBarData, LocalPageableTableData, PopupService, PopupInfo, TransferListSourceRenderer, TransferListDestRenderer, TransferTreeSourceRenderer, TransferTableSourceRenderer, JigsawToast, JigsawNotification } from 'jigsaw/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['demo.component.css'],
    encapsulation: ViewEncapsulation.None,
    host: { '[attr.data-theme]': 'theme' }
})
export class ThemeBuildInThemeDemoComponent implements AfterViewInit {
    lightTheme = "light";
    darkTheme = "dark";

    _$cityList = new ArrayCollection([
        { label: "北京", id: 0 }, { label: "上海", id: 2 }, { label: "南京", id: 3 },
        { label: "深圳", id: 4 }, { label: "长沙", id: 5 }, { label: "西安", id: 6 }
    ]);

    _$cityList2 = new ArrayCollection([
        { label: "北京" }, { label: "上海", disabled: true }, { label: "南京" },
        { label: "深圳" }, { label: "长沙", disabled: true }, { label: "西安" }
    ]);

    _$dropdownData = [
        { category: '事件与数据', items: ['发送事件到事件总线', '更新变量'] },
        { category: '动画', items: ['隐藏/显示元素', '滚动页面'] },
        { category: '弹出', items: ['对话框', '提醒', '警示', '等待弹出关闭'] },
        { category: '高级', items: ['自定义代码块'] }
    ];

    _$breadcrumbItems = [
        { id: 0, label: "Home", icon: "iconfont iconfont-e647" },
        { id: 1, label: "Digital", icon: "iconfont iconfont-e12e" },
        { id: 2, label: "List", icon: "iconfont iconfont-e526" },
        { id: 3, label: "Detail", icon: "iconfont iconfont-e385" }
    ];

    _$titles = [
        { title: 'Settings', subTitle: 'Ctrl+Alt+A', subMenu: false },
        { title: 'Print', subTitle: '', subMenu: true },
        { title: 'Save All', subTitle: 'Ctrl+S', subMenu: false },
        { title: 'Exit', subTitle: '', subMenu: true }
    ];

    _$goodsList: GroupOptionValue[] = [
        {
            icon: 'iconfont iconfont-e187',
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.'
        },
        JigsawListLite.SEPARATOR, // 配置分隔线
        {
            icon: 'iconfont iconfont-e2e7',
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            icon: 'iconfont iconfont-e18a',
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
            disabled: true // 配置不可点击
        },
        {
            icon: 'iconfont iconfont-e534',
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        JigsawListLite.SEPARATOR,
        {
            icon: 'iconfont iconfont-e565',
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            icon: 'iconfont iconfont-e6ca',
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    _$goodsList2 = [
        {
            name: 'bicycle',
            desc: 'A bicycle, also called a cycle or bike, is a human-powered, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other.',
            active: true
        },
        {
            name: 'camera',
            desc: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both.'
        },
        {
            name: 'car',
            desc: 'A car (or automobile) is a wheeled motor vehicle used for transportation.',
        },
        {
            name: 'football',
            desc: 'Football is a family of team sports that involve, to varying degrees, kicking a ball with the foot to score a goal. '
        },
        {
            name: 'book',
            desc: 'A book is a set of sheets of paper, parchment, or similar materials that are fastened together to hinge at one side.'
        },
        {
            name: 'puzzle-piece',
            desc: 'A puzzle is a game, problem, or toy that tests a person\'s ingenuity or knowledge.'
        },
    ];

    _$groupData = new ArrayCollection([
        { groupName: "分组标题1", data: [{ label: "文本选项1文本选项1文本选项1文本选项1文本选项1" }, { label: "文本选项2" }, { label: "文本选项3" }] },
        { groupName: "分组标题2", data: [{ label: "文本选项4" }, { label: "文本选项5" }, { label: "文本选项6" }] },
        { groupName: "分组标题3", data: [{ label: "文本选项7" }, { label: "文本选项8" }, { label: "文本选项9" }] }
    ]);

    _$navigationData = new SimpleTreeData();

    _$tableData;

    _$graphData;

    _$cascadeData: SimpleTreeData;

    _$tabbarData: TabBarData[];

    _$pageableData: LocalPageableTableData;

    _$fishboneData: SimpleTreeData;

    _$treeData: SimpleTreeData;

    _$longData = [5, 3, 9, 9, 6, 7, 9, 6, 7, 3, 3, 6, 5, 9, 6, 9, 6, 7, 3, 5, 2];
    _$shortData = [5, 3, 9, 6];

    dialogInfo: PopupInfo;

    _$processStatusData = [
        {
            title: 'done',
            status: "done"
        },
        {
            title: 'error',
            status: "error"
        },
        {
            title: 'processing',
            status: "processing"
        },
        {
            title: 'warning',
            status: "warning"
        },
        {
            title: 'skipped',
            status: "skipped"
        },
        {
            title: 'waiting',
            status: "waiting"
        },
    ];

    _$stepData = [
        {
            "title": "这是normal",
            "status": "normal",
            "subTitle": "描述信息"
        },
        {
            "title": "这是normal",
            "status": "normal",
            "subTitle": "描述信息"
        },
        {
            "title": "这是normal",
            "status": "normal",
            "subTitle": "描述信息"
        },
        {
            "title": "这是warning",
            "status": "warning",
            "subTitle": "描述信息"
        },
        {
            "title": "这是error",
            "status": "error",
            "subTitle": "描述信息"
        },
        {
            "title": "这是error",
            "status": "error",
            "subTitle": "描述信息"
        }
    ]

    _$menuData: SimpleTreeData;

    transferListSourceRenderer = TransferListSourceRenderer;
    transferListDestRenderer = TransferListDestRenderer;
    transferTreeSourceRenderer = TransferTreeSourceRenderer;
    transferTableSourceRenderer = TransferTableSourceRenderer;

    constructor(http: HttpClient, public popupService: PopupService) {
        this._$navigationData.fromXML(`
        <node>
            <node label="当前告警" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                <node label="告警监控" selected="true" icon="iconfont iconfont-e2d8"></node>
                <node label="告警统计"></node>
                <node label="定时导出" icon="iconfont iconfont-e601"></node>
                <node label="告警同步"></node>
                <node label="告警提示" icon="iconfont iconfont-e52a"></node>
            </node>
            <node label="历史告警" icon="iconfont iconfont-e5f7">
                <node label="告警查询"></node>
            </node>
            <node label="通知" icon="iconfont iconfont-e605">
                <node label="通知监控"></node>
            </node>
            <node label="告警设置" icon="iconfont iconfont-e36f"></node>
        </node>
    `);

        this._$tableData = new TableData(
            [
                ["Tiger Nixon", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon2", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters2", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon3", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters3", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon4", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters4", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon5", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
                ["Garrett Winters5", "Accountant", "$170,7", "2011/07/25", "Tokyo", "8422"],
                ["Tiger Nixon6", "System Architect", "$320,00", "2011/04/25", "Edinburgh", "542"],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);

        this._$graphData = new GraphData({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, extraCssText: 'z-index: 999' },
            grid: { top: 10, bottom: 20, right: 0, left: 48, show: false },
            xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            yAxis: { type: 'value' },
            series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line' }]
        });

        http.get('/mock-data/tree-data').subscribe((data: SimpleTreeData) => this._$cascadeData = data);

        this._$tabbarData = [
            {
                label: "Tab 1",
                icon: "iconfont iconfont-e105"
            },
            {
                label: "Tab 2",
                disabled: true
            },
            {
                html: `<div><span class="iconfont iconfont-e187"></span>Tab 3</div>`
            },
            {
                html: `<span>更多</span>`
            },
            {
                label: "Tab 5",
                hidden: true
            }
        ];

        this._$pageableData = new LocalPageableTableData();
        this._$pageableData.http = http;
        this._$pageableData.pagingInfo.pageSize = 10;
        this._$pageableData.fromAjax('mock-data/hr-list-full');

        this._$fishboneData = new SimpleTreeData();
        this._$fishboneData.label = '<span class="orange">申论万能思维体系</span>';
        this._$fishboneData.fromObject([
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

        this._$treeData = new SimpleTreeData();
        this._$treeData.fromObject([
            {
                label: "父节点1 - 展开",
                open: true,
                nodes: [
                    {
                        label: "父节点11 - 折叠",
                        nodes: [
                            { label: "叶子节点111" },
                            { label: "叶子节点112" },
                            { label: "叶子节点113" },
                            { label: "叶子节点114" }
                        ]
                    },
                    {
                        label: "父节点12 - 折叠",
                        nodes: [
                            { label: "叶子节点121" },
                            { label: "叶子节点122" },
                            { label: "叶子节点123" },
                            { label: "叶子节点124" }
                        ]
                    },
                    { label: "父节点13 - 没有子节点", isParent: true }
                ]
            },
            {
                label: "父节点2 - 折叠",
                nodes: [
                    {
                        label: "父节点21 - 展开", open: true,
                        nodes: [
                            { label: "叶子节点211" },
                            { label: "叶子节点212" },
                            { label: "叶子节点213" },
                            { label: "叶子节点214" }
                        ]
                    },
                    {
                        label: "父节点22 - 折叠",
                        nodes: [
                            { label: "叶子节点221" },
                            { label: "叶子节点222" },
                            { label: "叶子节点223" },
                            { label: "叶子节点224" }
                        ]
                    },
                    {
                        label: "父节点23 - 折叠",
                        nodes: [
                            { label: "叶子节点231" },
                            { label: "叶子节点232" },
                            { label: "叶子节点233" },
                            { label: "叶子节点234" }
                        ]
                    }
                ]
            },
            { label: "父节点3 - 没有子节点", isParent: true }

        ])

        this._$menuData = new SimpleTreeData();
        this._$menuData.fromXML(`
        <node>
            <node label="File">
                <node label="New">
                    <node label="Project"></node>
                    <node label="File"></node>
                    <node label="Directory"></node>
                </node>
                <node label="Open"></node>
                <node label="Save As"></node>
            </node>
            <node label="Edit">
                <node label="Cut"></node>
                <node label="Copy">
                    <node label="Copy Reference"></node>
                    <node label="Copy Path"></node>
                </node>
                <node label="Paste" disabled="true"></node>
                <!-- 无label属性的node节点表示这是一个分隔符 -->
                <node></node>
                <node label="Delete"></node>
            </node>
            <node label="Run" >
                <node label="Run" icon="iconfont iconfont-e314" subTitle="Shift+F10"></node>
                <node label="Debug" icon="iconfont iconfont-e5e0" subTitle="Shift+F9"></node>
            </node>
            <!-- 无label属性的node节点表示这是一个分隔符 -->
            <node></node>
            <node label="Exit"></node>
        </node>
    `);
    }

    commonInfoAlert() {
        JigsawInfoAlert.show({ header: '标题', message: '描述信息' });
    }

    commonWarningAlert() {
        JigsawWarningAlert.show({ header: '标题', message: '描述信息' });
    }

    commonErrorAlert() {
        JigsawWarningAlert.show({ header: '标题', message: '描述信息' });
    }

    commonConfirmAlert() {
        JigsawConfirmAlert.show({ header: '标题', message: '描述信息' }, null, [{ label: 'alert.button.yes' }, { label: 'alert.button.no' }, { label: "不知道" }]);
    }

    popupDialog(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    showInfo() {
        this.dialogInfo.dispose();
    }

    showToast() {
        JigsawToast.show('这是Toast默认提示框')
    }

    showNotification() {
        JigsawNotification.show('这是消息框的默认样子！', { icon: undefined });
    }

    navMenu: any;
    navMenuVis: boolean = false;

    navClick(item) {
        item.ele.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    visClick(item) {
        item.vis = !item.vis;
        console.log(item.ele.closest('.list-li'))
        item.ele.closest('.list-li').style.display = item.vis ? 'flex' : 'none';
    }

    closeNav() {
        this.navMenuVis = false;
    }

    openNav() {
        this.navMenuVis = true;
    }

    scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    ngAfterViewInit() {
        const allHeaders = document.querySelectorAll(".jigsaw-header-level-2");
        const validHeaders = Array.from(allHeaders).filter((item, i) => {
            return i % 2 === 0;
        })
        setTimeout(() => {
            this.navMenu = validHeaders.map(item => {
                return { name: item['innerText'], ele: item, vis: true };
            }).sort((a, b) => {
                return a.name.localeCompare(b.name);
            })
        }, 1);
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
