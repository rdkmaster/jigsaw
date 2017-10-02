import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ZTreeSettingSetting} from "jigsaw/component/tree/ztree-types"
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: './app.component.html'
})
export class ZtreeDemoDataFromAjaxComponent {
    data : TreeData;
    public setting: ZTreeSettingSetting = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        }
    };

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, public http: HttpClient) {
        this.data = new TreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree/data.json");
        this.data.refresh();
    }
}

