import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { SimpleTreeData, JigsawTreeExt, ZTreeIconSuit } from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class ZTreeIconDemoComponent implements AfterViewInit {
    @ViewChild(JigsawTreeExt) treeExt: JigsawTreeExt;

    public data: SimpleTreeData = new SimpleTreeData();
    public xml: SimpleTreeData = new SimpleTreeData();

    public iconSuit: ZTreeIconSuit = {
        edit: "e166",
        remove: "e17b",
        // open: "e9de",
        // close: "e9db",
        document: "e9dc",
        checkboxChecked: "e142",
        checkboxNotCheck: "e333",
        checkboxHalf: "e195",
        nodeOpen: "ea24",
        nodeClose: "ea57"
    };

    constructor() {
        this.xml.fromXML(`
            <node>
                <node label="Web代码" open="true" iconUnicode="e25c">
                    <node label="页面1" open="false" iconUnicode="e440">
                        <node label="src" open="true">
                            <node label="index.html" iconUnicode="e5a2"></node>
                            <node label="styles.css" iconUnicode="e5a1"></node>
                            <node label="component1.ts" iconUnicode="e5a0"></node>
                            <node label="component2.ts" iconUnicode="e5a0"></node>
                        </node>
                        <node label="build" open="true">
                            <node label="check.sh" iconUnicode="e494"></node>
                            <node label="build.sh" iconUnicode="e494"></node>
                        </node>
                    </node>
                    <node label="页面1" open="true" iconUnicode="e440">
                        <node label="src" open="true">
                            <node label="index.html" iconUnicode="e5a2"></node>
                            <node label="styles.css" iconUnicode="e5a1"></node>
                            <node label="component1.ts" iconUnicode="e5a0"></node>
                            <node label="component2.ts" iconUnicode="e5a0"></node>
                        </node>
                        <node label="build" open="true">
                            <node label="check.sh" iconUnicode="e494"></node>
                            <node label="build.sh" iconUnicode="e494"></node>
                        </node>
                    </node>
                </node>
                <node label="服务端" open="true" iconUnicode="e3a0">
                    <node label="src" open="true">
                        <node label="查询服务1" iconUnicode="e3c5"></node>
                        <node label="查询服务2" iconUnicode="e3c5"></node>
                        <node label="查询服务3" iconUnicode="e3c5"></node>
                        <node label="查询服务4" iconUnicode="e3c5"></node>
                    </node>
                </node>
            </node>
        `);
        this.data.fromObject([
            {
                label: "Web代码", iconUnicode: "e25c", open: true,
                nodes: [
                    {
                        label: "页面1", iconUnicode: "e440", open: true,
                        nodes: [
                            {
                                label: "src", open: true, nodes: [
                                    {label: 'index.html', iconUnicode: 'e5a2'},
                                    {label: 'styles.css', iconUnicode: 'e5a1'},
                                    {label: 'component1.ts', iconUnicode: 'e5a0'},
                                    {label: 'component2.ts', iconUnicode: 'e5a0'},
                                ]
                            },
                            {
                                label: "build", open: true,
                                nodes: [
                                    {label: 'check.sh', iconUnicode: 'e494'},
                                    {label: 'build.sh', iconUnicode: 'e494'},
                                ]
                            },
                        ]
                    },
                    {
                        label: "页面2", iconUnicode: "e440",
                        nodes: [
                            {
                                label: "src", open: true, nodes: [
                                    {label: 'index.html', iconUnicode: 'e5a2'},
                                    {label: 'styles.css', iconUnicode: 'e5a1'},
                                    {label: 'component1.ts', iconUnicode: 'e5a0'},
                                    {label: 'component2.ts', iconUnicode: 'e5a0'},
                                ]
                            },
                            {
                                label: "build", open: true,
                                nodes: [
                                    {label: 'check.sh', iconUnicode: 'e494'},
                                    {label: 'build.sh', iconUnicode: 'e494'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: "服务端", iconUnicode: "e3a0", open: true,
                nodes: [
                    {
                        label: "src", open: true,
                        nodes: [
                            { label: "查询服务1", iconUnicode: 'e3c5' },
                            { label: "查询服务2", iconUnicode: 'e3c5' },
                            { label: "查询服务3", iconUnicode: 'e3c5' },
                            { label: "查询服务4", iconUnicode: 'e3c5' },
                        ]
                    }
                ]
            }
        ]);
    }

    public onClick(msg: any) {
        console.log("click");
        console.log(msg);
    }

    ngAfterViewInit() {
        if (this.treeExt && this.treeExt.ztree) {
            let nodes = this.treeExt.ztree.getNodes();
            if (nodes.length > 0) {
                this.treeExt.ztree.selectNode(nodes[0]);
            }
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
