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
                <node label="功能1">
                    <node label="功能11">
                        <node label="功能11"></node>
                        <node label="功能12"></node>
                        <node label="功能13"></node>
                        <node label="功能14"></node>
                        <node label="功能15"></node>
                        <node label="功能16"></node>
                    </node>
                    <node label="功能12">
                        <node label="功能21"></node>
                        <node label="功能22"></node>
                        <node label="功能23"></node>
                        <node label="功能24"></node>
                        <node label="功能25"></node>
                        <node label="功能26"></node>
                    </node>
                    <node label="功能13">
                        <node label="功能31"></node>
                        <node label="功能32"></node>
                        <node label="功能33"></node>
                        <node label="功能34"></node>
                        <node label="功能35"></node>
                        <node label="功能36"></node>
                    </node>
                </node>
                <node label="功能2">
                    <node label="功能21"></node>
                    <node label="功能22"></node>
                    <node label="功能23"></node>
                </node>
                <node label="功能3"></node>
                <node label="功能4"></node>
            </node>
        `);
    }

    menuSelect(node: SimpleTreeData) {
        console.log(`${node.label} 被点击了!!!`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '可以在文档里里嵌入一个菜单组件，再配合其他组件（如Collapse）就可以形成一个一级导航栏的功能了';
    description: string = '';
}
