import { Component } from "@angular/core";
import { SimpleTreeData } from "jigsaw/public_api";
import { MenuTextService } from "../doc.service";

@Component({
    selector: 'menu-nav-inline',
    templateUrl: './demo.component.html',
})
export class NavigationMenuInlineDemoComponent {
    public data: SimpleTreeData = new SimpleTreeData();

    constructor(public doc: MenuTextService) {
        const xmlData = `
            <node>
                <node label="通用" icon="iconfont iconfont-e4b8" isActive="true" selected="true">
                    <node label="通用" selected="true"></node>
                </node>
                <node label="转换" icon="iconfont iconfont-e4fb"></node>
                <node label="数据库" icon="iconfont iconfont-e4b1">
                    <node label="数据库"></node>
                </node>
                <node label="计算" icon="iconfont iconfont-e1b3"></node>
                <node label="预测" icon="iconfont iconfont-e269">
                    <node label="性能预测"></node>
                    <node label="自定义预测"></node>
                </node>
                <node label="监控" icon="iconfont iconfont-e67a"></node>
            </node>
        `;

        this.data.fromXML(xmlData);
    }

    public menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }
}
