import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ZTreeSettings, SimpleTreeData, JigsawTreeExt, ArrayCollection} from "jigsaw/public_api";
import {TreeTextService} from "../text.service";

@Component({
    selector: 'editable-tree',
    templateUrl: './demo.component.html'
})
export class ZtreeDemoEditableComponent {
    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    public selectedLabel = {label: "中", size: "medium"};
    public labelData: object[] = new ArrayCollection([
        {label: "小", size: "small"},
        {label: "中", size: "medium"},
        {label: "大", size: "large"}
    ]);

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

    constructor(http: HttpClient, public text: TreeTextService) {
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
        this.data.refresh();
    }
}
