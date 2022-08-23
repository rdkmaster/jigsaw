import { Component } from "@angular/core";
import { SimpleTreeData } from "jigsaw/public_api";
import { MenuTextService } from "../doc.service";

@Component({
    selector: 'menu-drop-down',
    templateUrl: './demo.component.html'
})
export class MenuDropDownDemoComponent {
    public dropdownData: SimpleTreeData = this.initDropdownData();

    private initDropdownData(): SimpleTreeData {
        const data = new SimpleTreeData();
        data.fromXML(`
            <node>
                <node label="新建" icon="iconfont iconfont-e9dd">
                    <node label="工程..." subTitle="Ctrl+Shift+P"></node>
                    <node></node>
                    <node label="HTML文件" icon="iconfont iconfont-e5a2" subTitle="Ctrl+Shift+H"></node>
                    <node label="CSS文件" icon="iconfont iconfont-e5a1" subTitle="Ctrl+Shift+C"></node>
                    <node label="JS文件" icon="iconfont iconfont-e6a6" subTitle="Ctrl+Shift+J"></node>
                    <node></node>
                    <node label="退出"></node>
                </node>
                <node label="打开..." icon="iconfont iconfont-e4e4"></node>
                <node label="打开" subTitle="最近文件">
                    <node label="project1" icon="iconfont iconfont-e40d"></node>
                    <node label="project2" icon="iconfont iconfont-e40d"></node>
                    <node label="project3" icon="iconfont iconfont-e40d"></node>
                    <node></node>
                    <node label="file1.js" icon="iconfont iconfont-e6a6"></node>
                    <node label="file2.html" icon="iconfont iconfont-e5a2"></node>
                    <node label="file3.css" icon="iconfont iconfont-e5a1"></node>
                </node>
                <node label="保存" icon="iconfont iconfont-ea2a" subTitle="Ctrl+S"></node>
                <node label="另存为..." subTitle="Ctrl+Shift+S"></node>
                <node></node>
                <node label="退出"></node>
            </node>
        `);
        return data;
    }

    public menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    constructor(public doc: MenuTextService) { }
}
