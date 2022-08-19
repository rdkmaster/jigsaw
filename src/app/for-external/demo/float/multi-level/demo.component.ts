import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/public_api";
import {FloatTextService} from "../doc.service";

@Component({
    selector: 'float-multi-level',
    templateUrl: './demo.component.html',
    styles: [`
        .menu {
            margin: 100px;
            border: 1px solid #999;
            padding: 2px 10px;
            border-radius: 3px;
        }
    `]
})
export class FloatMultiLevelDemoComponent {
    public data: SimpleTreeData;

    constructor(public doc: FloatTextService) {
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
                    <!-- 无labe属性的node节点表示这是一个分隔符 -->
                    <node></node>
                    <node label="Delete"></node>
                </node>
                <node label="Run" >
                    <node label="Run" icon="iconfont iconfont-e314" subTitle="Shift+F10"></node>
                    <node label="Debug" icon="iconfont iconfont-e5e0" subTitle="Shift+F9"></node>
                </node>
                <!-- 无labe属性的node节点表示这是一个分隔符 -->
                <node></node>
                <node label="Exit"></node>
            </node>
        `);
    }
}
