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
        const xmlData = `
            <node>
                <node label="图标1" icon="iconfont iconfont-e231" selected="true"></node>
                <node label="图标2" icon="iconfont iconfont-e261"></node>
                <node label="图标3" icon="iconfont iconfont-e2f6"></node>
                <node label="图标4" icon="iconfont iconfont-e2d4"></node>
                <node label="图标5" icon="iconfont iconfont-e17c"></node>
                <node label="图标6" icon="iconfont iconfont-e0d1"></node>
                <node label="图标7" icon="iconfont iconfont-e54a"></node>
                <node label="图标8" icon="iconfont iconfont-e212"></node>
                <node label="图标9" icon="iconfont iconfont-e367"></node>
            </node>
        `;
        this.data2.fromXML(xmlData);
        this.data3.fromXML(xmlData);
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
                <node label="一级菜单4" icon="iconfont iconfont-e36f"></node>
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
