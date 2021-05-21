import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .block {
            display: inline-block;
            width: 300px;
            vertical-align: top;
        }
    `]
})
export class NavigationMenuNavDemo {
    public data1: SimpleTreeData = new SimpleTreeData();
    public data2: SimpleTreeData = new SimpleTreeData();
    public data3: SimpleTreeData = new SimpleTreeData();
    public collapsed: boolean = true;

    constructor() {
        this.data1.fromXML(`
            <node>
                <node label="当前告警" icon="fa fa-bell-o" isActive="true" selected="true">
                    <node label="告警监控" selected="true"></node>
                    <node label="告警统计"></node>
                    <node label="定时导出"></node>
                    <node label="告警同步"></node>
                    <node label="告警提示"></node>
                </node>
                <node label="历史告警" icon="fa fa-bell">
                    <node label="告警查询"></node>
                </node>
                <node label="通知" icon="fa fa-bullhorn">
                    <node label="通知监控"></node>
                </node>
                <node label="告警设置" icon="fa fa-cog"></node>
            </node>
        `);
        const xmlData = `
            <node>
                <node label="当前告警" icon="fa fa-bell-o" selected="true"></node>
                <node label="历史告警" icon="fa fa-bell"></node>
                <node label="通知" icon="fa fa-bullhorn"></node>
                <node label="告警设置" icon="fa fa-cog"></node>
            </node>
        `;
        this.data2.fromXML(xmlData);
        this.data3.fromXML(xmlData);
    }

    updateMenu() {
        this.data1.fromXML(`
            <node>
                <node label="一级菜单1" icon="fa fa-bell-o" isActive="true" selected="true">
                    <node label="二级菜单1" selected="true"></node>
                    <node label="二级菜单2"></node>
                    <node label="二级菜单3"></node>
                    <node label="二级菜单4"></node>
                    <node label="二级菜单5"></node>
                </node>
                <node label="一级菜单2" icon="fa fa-bell">
                    <node label="二级菜单"></node>
                </node>
                <node label="一级菜单3" icon="fa fa-bullhorn">
                    <node label="二级菜单"></node>
                </node>
                <node label="一级菜单4" icon="fa fa-cog"></node>
            </node>
        `);
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    updateCollapsed() {
        this.collapsed = !this.collapsed;
    }

    collapsedChanged(event: boolean) {
        console.log(event, this.collapsed);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '制作一个可以折叠的导航菜单';
    description: string = '';
}
