import {Component} from "@angular/core";
import {SimpleTreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html',
})
export class MenuInDomDemo {

    public data: SimpleTreeData;

    constructor() {
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
                    <node label="Delete"></node>
                </node>
                <node label="Run" >
                        <node label="Run" titleIcon="fa fa-play" subTitle="Shift+F10"></node>
                        <node label="Debug" titleIcon="fa fa-bug" subTitle="Shift+F9"></node>
                </node>
                <node label="Exit"></node>
            </node>
        `);
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了jigsaw-menu菜单组件，输入为一个simpleTree类型的菜单数据，实现菜单弹出和点击的功能';
    description: string = '';
}
