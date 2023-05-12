import {Component, ViewEncapsulation} from "@angular/core";
import {
    JigsawMenu, MenuTheme, SimpleNode, SimpleTreeData,
    PopupService,
    BreadcrumbNode,
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls:['demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ThemeBuildInDemoComponent {

    public data: SimpleTreeData;
    public fishBoneData: SimpleTreeData;
    public breadData: (string | BreadcrumbNode)[];
    public navigationData: SimpleTreeData = new SimpleTreeData();
    public theme: string[] = ['dark'];
    public breadcrumbTheme: string[] = ['dark'];
    public fishBoneTheme: string[] = ['dark'];
    public navigationTheme: string[] = ['dark'];
    public width: number = 150;
    public height: number = 0;

    constructor( private ps: PopupService) {
        /* menu */
        this.data = new SimpleTreeData();
        this.data.fromXML(`
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

        /* breadcrumb */
        this.resetBreadcrumbItems();

        /* fish-bone */
        this.fishBoneData = new SimpleTreeData();
        this.fishBoneData.label = '<span class="orange">目标标题</span>';
        this.fishBoneData.fromObject([
            {
                label: '<span class="orange"><span class="iconfont iconfont-e221"></span>父节点1</span>',
                nodes: [
                    {
                        label: '<span class="iconfont iconfont-e67a"></span>父节点11',
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
                label: '<span class="orange"><span class="iconfont iconfont-e1ee"></span>父节点2</span>',
                nodes: [
                    {
                        label: '<span class="iconfont iconfont-e67a"></span>父节点21',
                        nodes: [
                            {
                                label: '子节点211',
                                nodes: [
                                    {
                                        label: '<span class="iconfont iconfont-e547"></span>end'
                                    },
                                    {
                                        label: '<span class="line">5,3,9,6,5,9,7,3,5,2</span>'
                                    },
                                    {
                                        label: `
                                                <div class="jigsaw-table-host" style="width: 300px;">
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
                label: '<span class="orange"><span class="iconfont iconfont-e67a"></span>父节点3</span>',
                nodes: [
                    {
                        label: '父节点31',
                        nodes: [
                            {
                                label: '<span class="iconfont iconfont-e547"></span>end'
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

        /* navigation */
        this.navigationData.fromXML(`
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
    }

    menuSelect(node: SimpleNode) {
        console.log("Dropdown menu selected, node =", node);
    }

    contextMenu(event: MouseEvent) {
        JigsawMenu.show(event, {
            data: this.data,
            width: this.width,
            height: this.height,
            theme: this.theme[0] as MenuTheme,
        }, node => {
            console.log("Context menu selected, node =", node);
        });
    }

    public itemSelect(item: BreadcrumbNode) {
        console.log("当前点击的节点是：", item);
        const idx = this.breadData.findIndex(i => item === i);
        this.breadData = this.breadData.slice(0, idx + 1);
    }

    public resetBreadcrumbItems() {
        this.breadData = [
            { label: "主页", icon: "iconfont iconfont-e647" },
            // 当节点只有文本时，也可以直接给字符串，这样更便捷
            "业务管理",
            "业务清单-1",
            "业务清单-2",
            "业务清单-3",
            // 也支持label属性
            { label: "业务样本" }
        ];
    }
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-cascading-menu指令实现多级菜单，展示了各个可用配置项及其效果，事件回调效果请查看控制台';
    description: string = '';
}
