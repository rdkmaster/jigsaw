import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class NavigationMenuInlineDemo {

    public data1: SimpleTreeData = new SimpleTreeData();
    public data2: SimpleTreeData = new SimpleTreeData();
    public data3: SimpleTreeData = new SimpleTreeData();
    public data4: SimpleTreeData = new SimpleTreeData();

    constructor() {
        const xmlData1 = `
            <node>
                <node label="通用" icon="fa fa-cube" selected="true"></node>
                <node label="转换" icon="fa fa-exchange"></node>
                <node label="数据库" icon="fa fa-database"></node>
                <node label="计算" icon="fa fa-calculator"></node>
                <node label="预测" icon="fa fa-lightbulb-o"></node>
                <node label="监控" icon="fa fa-line-chart"></node>
            </node>
        `;
        const xmlData2 = `
            <node>
                <node label="通用" icon="fa fa-cube" isActive="true" selected="true">
                    <node label="通用" selected="true"></node>
                </node>
                <node label="转换" icon="fa fa-exchange"></node>
                <node label="数据库" icon="fa fa-database">
                    <node label="数据库"></node>
                </node>
                <node label="计算" icon="fa fa-calculator"></node>
                <node label="预测" icon="fa fa-lightbulb-o">
                    <node label="性能预测"></node>
                    <node label="自定义预测"></node>
                </node>
                <node label="监控" icon="fa fa-line-chart"></node>
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '制作一个内嵌的导航菜单';
    description: string = '';
}
