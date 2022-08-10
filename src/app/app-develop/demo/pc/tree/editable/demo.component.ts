import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ZTreeSettings, SimpleTreeData, JigsawTreeExt} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class ZtreeDemoEditableComponent {
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    data: SimpleTreeData;

    setting: ZTreeSettings = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        edit: {
            enable: true
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "ps" }
        }
    };

    editNode() {
        this.treeExt.editName(this.treeExt.ztree.getSelectedNodes()[0]);
    }

    constructor(http: HttpClient) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
        this.data.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
