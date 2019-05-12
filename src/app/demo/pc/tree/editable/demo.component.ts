import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ZTreeSettingSetting} from "jigsaw/pc-components/tree/ztree-types"
import {TreeData} from "jigsaw/common/core/data/tree-data";

@Component({
    templateUrl: './demo.component.html'
})
export class ZtreeDemoEditableComponent {
    data: TreeData;

    setting: ZTreeSettingSetting = {
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

    constructor(http: HttpClient) {
        this.data = new TreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree-data");
        this.data.refresh();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTreeExt.data',
        'JigsawTreeExt.setting',
    ];
}
