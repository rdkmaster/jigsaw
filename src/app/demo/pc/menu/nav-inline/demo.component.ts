import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/public_api";
import {MenuTextService} from "../text.service";

@Component({
    selector: 'nav-inline-menu',
    templateUrl: './demo.component.html',
})
export class NavigationMenuInlineDemo {

    public data1: SimpleTreeData = new SimpleTreeData();
    public data2: SimpleTreeData = new SimpleTreeData();
    public data3: SimpleTreeData = new SimpleTreeData();
    public data4: SimpleTreeData = new SimpleTreeData();

    constructor(public text: MenuTextService) {
        const xmlData1 = `
            <node>
                <node label="通用" icon="iconfont iconfont-e4b8" selected="true"></node>
                <node label="转换" icon="iconfont iconfont-e4fb"></node>
                <node label="数据库" icon="iconfont iconfont-e4b1"></node>
                <node label="计算" icon="iconfont iconfont-e1b3"></node>
                <node label="预测" icon="iconfont iconfont-e269"></node>
                <node label="监控" icon="iconfont iconfont-e67a"></node>
            </node>
        `;
        const xmlData2 = `
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
        this.data1.fromXML(xmlData1);
        this.data2.fromXML(xmlData1);
        this.data3.fromXML(xmlData2);
        this.data4.fromXML(xmlData2);
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }
}
