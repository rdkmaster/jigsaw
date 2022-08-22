import {Component} from "@angular/core";
import {SimpleTreeData, ArrayCollection} from "jigsaw/public_api";
import {TreeTextService} from "../doc.service";

@Component({
    selector: 'tree-xml-data',
    templateUrl: './demo.component.html'
})
export class ZtreeXMLDataDemoComponent {
    public selectedSize = {label: "中", size: "medium"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);

    public data: SimpleTreeData;
    constructor(public doc: TreeTextService) {
        this.data = new SimpleTreeData();
        this.data.fromXML(`
            <node>
                <node label="父节点1 - 展开" open="true">
                    <node label="父节点11 - 折叠">
                        <node label="叶子节点111"></node>
                        <node label="叶子节点112"></node>
                        <node label="叶子节点113"></node>
                        <node label="叶子节点114"></node>
                    </node>
                    <node label="父节点12 - 折叠">
                        <node label="叶子节点121"></node>
                        <node label="叶子节点122"></node>
                        <node label="叶子节点123"></node>
                        <node label="叶子节点124"></node>
                    </node>
                </node>
                <node label="父节点2 - 展开" open="true">
                    <node label="父节点21 - 展开" open="true">
                        <node label="叶子节点111"></node>
                        <node label="叶子节点112"></node>
                        <node label="叶子节点113"></node>
                        <node label="叶子节点114"></node>
                    </node>
                    <node label="父节点22 - 折叠">
                        <node label="叶子节点121"></node>
                        <node label="叶子节点122"></node>
                        <node label="叶子节点123"></node>
                        <node label="叶子节点124"></node>
                    </node>
                </node>
                <node label="父节点3 - 没有子节点" isParent="true"></node>
            </node>
        `)
    }

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }
}
