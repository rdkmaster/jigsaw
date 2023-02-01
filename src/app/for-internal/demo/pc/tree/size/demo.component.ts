import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .sized-tree {
            display: inline-block;
            vertical-align: top;
            width: 220px;
        }
    `]
})
export class ZtreeSizeComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    public data: SimpleTreeData;

    constructor() {
        this.data = new SimpleTreeData();
        this.data.fromXML(`
            <node>
                <node label="父节点1 - 展开" open="true">
                    <node label="父节点11 - 折叠">
                        <node label="父节点111">
                            <node label="父节点1111">
                                <node label="父节点11111">
                                    <node label="父节点111111">
                                        <node label="父节点1111111">
                                            <node label="父节点11111111">
                                                <node label="父节点111111111">
                                                    <node label="父1">
                                                        <node label="父2">
                                                        </node>
                                                    </node>
                                                </node>
                                            </node>
                                        </node>
                                    </node>
                                </node>
                            </node>
                        </node>
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

    ngAfterViewInit() {
        if (this.treeExt && this.treeExt.ztree) {
            console.log(this.treeExt.ztree);
            let nodes = this.treeExt.ztree.getNodes();
            if (nodes.length > 0) {
                this.treeExt.ztree.selectNode(nodes[0]);
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
