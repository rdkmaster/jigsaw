import {Component, ElementRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ZTreeSettings, SimpleTreeData, JigsawTreeExt, ArrayCollection} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tree-editable',
    templateUrl: './demo.component.html'
})
export class ZtreeDemoEditableComponent extends AsyncDescription {
    public demoPath = "demo/tree/editable";

    @ViewChild(JigsawTreeExt)
    public treeExt: JigsawTreeExt;

    public selectedSize = {label: "中", size: "medium"};
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

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
        this.data.refresh();
    }
}
