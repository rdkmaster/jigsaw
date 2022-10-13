import {Component, ElementRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JigsawTreeExt, SimpleTreeData, ZTreeSettings} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'tree-editable',
    templateUrl: './demo.component.html'
})
export class ZtreeDemoEditableComponent extends AsyncDescription {
    public demoPath = "demo/tree/editable";
    public selectedSize = {size: "medium"};

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

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.data = new SimpleTreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
        this.data.refresh();
    }
}
