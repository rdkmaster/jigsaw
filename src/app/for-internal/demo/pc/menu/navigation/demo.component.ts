import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {JigsawNavigationMenu, SimpleNode, SimpleTreeData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .block {
            display: inline-block;
            width: 200px;
            vertical-align: top;
        }

        .block a {
            margin: 4px 0;
            display: block;
        }
    `]
})
export class NavigationMenuNavDemo {
    public data1: SimpleTreeData = new SimpleTreeData();
    public data2: SimpleTreeData = new SimpleTreeData();
    public data3: SimpleTreeData = new SimpleTreeData();
    public data4: SimpleTreeData = new SimpleTreeData();
    public collapsed: boolean = true;

    constructor() {
        this.data1.fromXML(`
            <node>
                <node label="当前告警" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                    <node label="告警监控" selected="true" icon="iconfont iconfont-e2d8"></node>
                    <node label="告警统计" disabled="true"></node>
                    <node label="定时导出" icon="iconfont iconfont-e601"></node>
                    <node label="告警同步"></node>
                    <node label="告警提示" icon="iconfont iconfont-e52a"></node>
                </node>
                <node label="历史告警" icon="iconfont iconfont-e5f7">
                    <node label="告警查询"></node>
                </node>
                <node label="通知" icon="iconfont iconfont-e605" disabled="true">
                    <node label="通知监控"></node>
                </node>
                <node label="告警设置" icon="iconfont iconfont-e36f"></node>
                <node label="其他设置" icon="iconfont iconfont-e810" disabled="true"></node>
            </node>
        `);
        const xmlData = `
            <node>
                <node label="标准图标1" icon="iconfont iconfont-e231" selected="true"></node>
                <node label="标准图标2" icon="iconfont iconfont-e261"></node>
                <node label="标准图标3" icon="iconfont iconfont-e2f6"></node>
                <node label="标准图标4" icon="iconfont iconfont-e2d4"></node>
                <node label="标准图标5" icon="iconfont iconfont-e17c"></node>
                <node label="标准图标6" icon="iconfont iconfont-e0d1"></node>
                <node label="标准图标7" icon="iconfont iconfont-e191"></node>
                <node label="标准图标8" icon="iconfont iconfont-e54a"></node>
                <node label="标准图标9" icon="iconfont iconfont-e212"></node>
                <node label="标准图标10" icon="iconfont iconfont-e367"></node>
            </node>
        `;
        this.data2.fromXML(xmlData);
        this.data3.fromXML(xmlData);

        this.data4.fromObject([
            {
                label: '当前告警',
                icon: 'iconfont iconfont-e9ad',
                selected: true,
                isActive: true,
                nodes: [
                    {label: '告警监控', selected: true},
                    {label: '告警统计'},
                    {label: '定时导出'},
                    {label: '告警同步'},
                    {label: 'Test Looooooooooong English Text'}
                ]
            },
            {
                label: '历史告警',
                icon: 'iconfont iconfont-e2d4',
                nodes: [{label: '告警查询'}]
            },
            {
                label: '测试超长长长长长长长长长中文文本',
                icon: 'iconfont iconfont-e605',
                nodes: [{label: '通知监控'}]
            },
            {label: '告警设置', icon: 'iconfont iconfont-e36f'}
        ])
    }

    updateMenu() {
        this.data1.fromXML(`
            <node>
                <node label="一级菜单1" icon="iconfont iconfont-e5fd" isActive="true" selected="true">
                    <node label="二级菜单1" selected="true"></node>
                    <node label="二级菜单2"></node>
                    <node label="二级菜单3"></node>
                    <node label="二级菜单4"></node>
                    <node label="二级菜单5"></node>
                </node>
                <node label="一级菜单2" icon="iconfont iconfont-e5f7">
                    <node label="二级菜单"></node>
                </node>
                <node label="一级菜单3" icon="iconfont iconfont-e605">
                    <node label="二级菜单"></node>
                </node>
                <node label="一级菜单4" disabled="true" icon="iconfont iconfont-e36f"></node>
            </node>
        `);
    }

    @ViewChildren(JigsawNavigationMenu)
    menus: QueryList<JigsawNavigationMenu>;
    selectedMenuLabel = '';

    selectMenu(): void {
        this.menus.forEach(menu => {
            menu.selectMenu('label', this.selectedMenuLabel);
        });
    }

    toggleMenuDisabled(): void {
        this.menus.forEach(menu => {
            menu.toggleMenuDisabled('label', this.selectedMenuLabel);
        });
    }

    @ViewChild('menu')
    navigationMenu: JigsawNavigationMenu;

    updateMenu1() {
        const root = this.navigationMenu.data.nodes;
        root[0].nodes.forEach(node => {
            const r = parseInt(String(Math.random() * 20));
            node.badgeValue = r < 5 ? '' : r;
        });
        root[0].badgeValue = root[0].nodes.reduce(
            (sum, node) => sum + (node.badgeValue ? parseInt(node.badgeValue) : 0), 0);

        // 去掉徽标状态
        root[1].badgeValue = root[1].badgeValue ? '' : 'dot';
        root[2].badgeValue = root[2].badgeValue ? '' : 'dot';
        this.navigationMenu.update();
    }

    onMenuSelect(node: SimpleNode) {
        console.log(`${node.label} 被点击了!!!`);
    }

    updateCollapsed() {
        this.collapsed = !this.collapsed;
    }

    onCollapsedChanged(event: boolean) {
        console.log(event, this.collapsed);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '制作一个可以折叠的导航菜单';
    description: string = '';
}
