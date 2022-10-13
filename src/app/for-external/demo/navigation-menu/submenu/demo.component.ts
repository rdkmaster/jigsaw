import {Component, ElementRef,} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { SimpleNode, SimpleTreeData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";
@Component({
    selector: "nav-submenu",
    templateUrl: "demo.component.html",
})
export class NavigationSubMenuDemoComponent extends AsyncDescription {
    public demoPath = "demo/navigation-menu/submenu";

    public data: SimpleTreeData = new SimpleTreeData();
    public onMenuSelect(node: SimpleNode) {
        console.log(`${node.label} 被点击了!!!`);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data.fromXML(`
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
}
