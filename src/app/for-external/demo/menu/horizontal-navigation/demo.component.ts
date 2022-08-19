import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/public_api";
import {MenuTextService} from "../doc.service";

@Component({
    selector: 'menu-horizontal-navigation',
    templateUrl: './demo.component.html',
    styleUrls: [`./demo.component.css`]
})
export class MenuHorizontalNavigationDemoComponent {
    public topBarData: any[] = this.initTopBarData();

    private initTopBarData(): any[] {
        const data = [
            {
                "label": "首页", data: new SimpleTreeData()
            },
            {
                "label": "分类", data: new SimpleTreeData()
            },
            {
                "label": "百科", data: new SimpleTreeData()
            },
            {
                "label": "合作", data: new SimpleTreeData()
            }
        ];
        data[0].data.fromXML(`
            <node>
                <node label="返回首页"></node>
                <node label="关于"></node>
            </node>
        `);
        data[1].data.fromXML(`
            <node>
                <node label="人文与自然">
                    <node label="人文科学"></node>
                    <node label="社会科学"></node>
                    <node label="自然科学"></node>
                </node>
                <node label="体育与艺术">
                    <node label="竞技体育"></node>
                    <node label="大众健身"></node>
                    <node></node>
                    <node label="听觉艺术"></node>
                    <node label="视觉艺术"></node>
                    <node label="视听艺术"></node>
                </node>
                <node></node>
                <node label="社会与人物"></node>
                <node label="经济与文化"></node>
                <node label="历史与地理"></node>
            </node>
        `);
        data[2].data.fromXML(`
            <node>
                <node label="历史上的今天"></node>
                <node label="数字博物馆"></node>
                <node label="城市百科">
                    <node>北京</node>
                    <node>南京</node>
                    <node>上海</node>
                    <node>深圳</node>
                    <node>杭州</node>
                </node>
                <node label="科学百科">
                    <node label="物理百科"></node>
                    <node label="化学百科"></node>
                    <node label="数学百科"></node>
                    <node></node>
                    <node label="科普视频"></node>
                    <node label="科普文章"></node>
                    <node label="科普人物"></node>
                </node>
            </node>
        `);
        data[3].data.fromXML(`
            <node>
                <node>合作模式</node>
                <node>常见问题</node>
                <node>联系方式</node>
            </node>
        `);
        return data;
    }


    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    constructor(public doc: MenuTextService) {}
}
