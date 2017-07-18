import {Component} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ZTreeSettingSetting} from "jigsaw/component/tree/ztree-types"
import {TreeData} from "jigsaw/core/data/tree-data";

@Component({
    templateUrl: 'editable.html'
})
export class ZtreeDemoEditableComponent {
     data : TreeData;
    public setting: ZTreeSettingSetting = {
        data: {
            key: {
                children: 'nodes',
                name: 'label'
            }
        },
        edit : {
            enable : true
        }
    };

    constructor(public http: Http) {
        this.data = new TreeData();
        this.data.http = http;
        this.data.fromAjax("mock-data/tree/data.json");
        this.data.refresh();
    }

    // public getTreeData() {
    //     this.http.get("mock-data/tree/data.json")
    //         .toPromise()
    //         .then(response => {
    //             this.data = response.json() as TreeData[];
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             return Promise.reject(error);
    //         });
    // }
    //
    // ngOnInit() {
    //     this.getTreeData();
    // }
}
